import { userSettingsStore } from '$lib/stores';
import { adminStore } from '$lib/stores';

//secret
import { USER_SETTINGS_SECRET } from '$env/static/private';

//jwt library
import * as jose from 'jose';

//handle is run every single time there is a request on the server
//event is a request object (like the thing that has a body, headers, user-agent, etc.)
//resolve renders the route and generates a response
export async function handle({ event, resolve }: { event: any; resolve: Function }) {
	//check for user settings cookie from the request (cookies are passed with every request)
	//this should be a jwt token
	const userSettingsCookie = event.cookies.get('us');

	const adminCookie = event.cookies.get('admin');

	if (userSettingsCookie) {
		//have to encode secret to unit8array
		const secret = new TextEncoder().encode(USER_SETTINGS_SECRET);

		//verify that the cookie is valid using the secret environment variable

		let payload;
		let hasAdultAgreed = false;

		try {
			({ payload } = await jose.jwtVerify(userSettingsCookie, secret, {
				issuer: 'com.scuzzyfox.svelte',
				audience: 'com.scuzzyfox.svelte'
			}));
			hasAdultAgreed = true;
		} catch (error) {
			//if there's any kind of error from jwtverify, then delete the cookie and make the user agree again.
			console.log('Error with loading user settings cookie');
			event.cookies.delete('us');
			payload = { nsfwAllowed: false, abdlAllowed: false };
			hasAdultAgreed = false;
		}
		//load functions and +server scripts can access the event.locals objects as { locals }

		event.locals.userSettings = {
			adultAgreed: hasAdultAgreed,
			nsfwAllowed: payload.nsfwAllowed,
			abdlAllowed: payload.abdlAllowed
		};
	} else {
		//if cookie doesn't exist, then user hasn't agreed.
		event.locals.userSettings = { adultAgreed: false, nsfwAllowed: false, abdlAllowed: false };
	}

	//admin setting
	try {
		if (adminCookie) {
			//check that the token is valid
			let response = await fetch('https://api.scuzzyfox.com/authentication/check-jwt-token/', {
				method: 'GET',
				headers: {
					Authorization: 'JWT ' + adminCookie,
					'Content-Type': 'application/json'
				}
			});

			//if the response is ok, then the token is valid
			if (response.ok) {
				let adminPayload: any = jose.decodeJwt(adminCookie);

				//set locals
				event.locals.admin = {
					username: adminPayload.username,
					email: adminPayload.email,
					loggedIn: true,
					token: adminCookie
				};
			} else {
				//if something goes wrong, delete the cookie
				event.cookies.delete('admin');
				throw new Error('invalid or expired JWT token, please sign in again.');
			}
		} else {
			throw new Error('Admin cookie does not exist');
		}
	} catch (e) {
		//if something goes wrong, unset locals

		//console.log(e);
		event.locals.admin = {
			username: undefined,
			email: undefined,
			token: undefined,
			loggedIn: false
		};
	}

	return resolve(event);
}

//other things that can be done here: https://kit.svelte.dev/docs/hooks#server-hooks-handlefetch
//handleFetch allows you to catch a fetch that svelte was about to make and re-route it somewhere else
//(like if it's going to ping the public url to your api, but you can reroute it to 127.0.1:2000 or something)

import { jwt_alg } from '$lib/constants';
import { userSettingsStore } from '$lib/stores';

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
			console.log('Error with loading cookie');
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

	return resolve(event);
}

//other things that can be done here: https://kit.svelte.dev/docs/hooks#server-hooks-handlefetch
//handleFetch allows you to catch a fetch that svelte was about to make and re-route it somewhere else
//(like if it's going to ping the public url to your api, but you can reroute it to 127.0.1:2000 or something)

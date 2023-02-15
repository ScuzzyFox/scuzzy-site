import { jwt_alg } from '$lib/constants';

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
	const userSettings = event.cookies.get('us');

	if (userSettings) {
		//have to encode secret to unit8array
		const secret = new TextEncoder().encode(USER_SETTINGS_SECRET);

		//verify that the cookie is valid using the secret environment variable
		const { payload, protectedHeader } = await jose.jwtVerify(userSettings, secret, {
			issuer: 'com.scuzzyfox.svelte',
			audience: 'com.scuzzyfox.svelte'
		});

		//load functions and +server scripts can access the event.locals objects as { locals }
		//todo: Need to double check that payload matches the shape of userSettings.
		event.locals.userSettings = payload;
	} else {
		event.locals.userSettings = null; //{ abdlAllowed: true, nsfwAllowed: false };
	}
	return resolve(event);
}

//other things that can be done here: https://kit.svelte.dev/docs/hooks#server-hooks-handlefetch
//handleFetch allows you to catch a fetch that svelte was about to make and re-route it somewhere else
//(like if it's going to ping the public url to your api, but you can reroute it to 127.0.1:2000 or something)

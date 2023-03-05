import type { RequestEvent } from './$types';
import type { UserSettings } from '$lib/UserSettings';
import { USER_SETTINGS_SECRET } from '$env/static/private';
import * as jose from 'jose';
import { jwt_alg } from '$lib/constants';
import { json, type Cookies } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

//posting to this endpoint with a user settings shape saves a cookie set to expire in 30 days
export async function POST(event: RequestEvent) {
	//unused.
	let success: boolean = true;

	//get the user settings from the POST request. parse the json into an object.
	let us: UserSettings = await event.request.json();

	//encode the server secret, because JWT library needs it encoded to an unsigned int 8 bit array
	const secret: Uint8Array = new TextEncoder().encode(USER_SETTINGS_SECRET);

	//set expire date to 30 days
	let date = new Date();
	date.setDate(date.getDate() + 30);

	//sign jwt
	const jwt = await new jose.SignJWT({ nsfwAllowed: us.nsfwAllowed, abdlAllowed: us.abdlAllowed })
		.setProtectedHeader({ alg: jwt_alg })
		.setIssuedAt()
		.setIssuer('com.scuzzyfox.svelte')
		.setAudience('com.scuzzyfox.svelte')
		.setExpirationTime('30d')
		.sign(secret);
	if (us) {
		event.cookies.set('us', jwt, { path: '/', httpOnly: true, expires: date });
	} else {
		//no cookie set
		success = false;
	}

	return json(success);
}

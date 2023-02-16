import type { RequestEvent } from './$types';
import type { UserSettings } from '$lib/UserSettings';
import { USER_SETTINGS_SECRET } from '$env/static/private';
import * as jose from 'jose';
import { jwt_alg } from '$lib/constants';
import { json } from '@sveltejs/kit';

export async function POST(event: RequestEvent) {
	let success: boolean = true;
	let us: UserSettings = await event.request.json();

	//encode the server secret
	const secret = new TextEncoder().encode(USER_SETTINGS_SECRET);

	//set expire date to 30 days
	let date = new Date();
	date.setDate(date.getDate() + 30);

	//sign jwt
	const jwt = await new jose.SignJWT({ nsfwAllowed: us.nsfwAllowed, abdlAllowed: us.abdlAllowed })
		.setProtectedHeader({ alg: jwt_alg })
		.setIssuedAt()
		.setIssuer('com.scuzzyfox.svelte')
		.setAudience('com.scuzzyfox.svelte')
		.setExpirationTime('2h')
		.sign(secret);
	if (us) {
		event.cookies.set('us', jwt, { path: '/', httpOnly: true, expires: date });
	}

	return json(success);
}

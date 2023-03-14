import * as jose from 'jose';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

interface UserData {
	username: string;
	email: string;
	jwt_auth_token: string;
}

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const token = data.get('token');
		data.delete('token');
		data.delete('confirm-password');

		const response = await fetch('https://api.scuzzyfox.com/authentication/register/', {
			method: 'POST',
			body: data,
			headers: {
				Authorization: 'Token ' + token,
				Accept: 'application/json'
			}
		});

		if (response.ok) {
			let userData: UserData;
			try {
				userData = await response.json();
				let decodedJWT = jose.decodeJwt(userData.jwt_auth_token);

				event.cookies.set('admin', userData.jwt_auth_token, {
					path: '/',
					httpOnly: true,
					expires: new Date(Number(decodedJWT.exp) * 1000)
				});

				event.locals.admin = {
					username: userData.username,
					token: userData.jwt_auth_token,
					email: userData.email,
					loggedIn: true
				};
			} catch (e) {
				event.cookies.delete('admin');
				return { failed: true, message: 'API Server response was not in the right format.' };
			}

			return { failed: false, userData: userData };
		} else {
			event.cookies.delete('admin');
			data.delete('password');

			return {
				failed: true,
				message: await response.text()
			};
		}
	}
} satisfies Actions;

export async function load({ locals }: { locals: any }) {
	//if logged in
	if (locals.admin.loggedIn) {
		//then redirect to login
		throw redirect(307, 'admin/');
	}
}

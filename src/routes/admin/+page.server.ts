import { redirect } from '@sveltejs/kit';
import { getSiteStatus, updateSiteStatus } from '$lib/apis/site-status-api';
import { notifyDiscordUsers, notifyTelegramUsers } from './notifyApi.js';

export async function load({ locals, url }: any) {
	//if NOT logged in
	if (!locals.admin.loggedIn) {
		//then redirect to login
		throw redirect(307, 'login/');
	}

	let siteStatus = await getSiteStatus(url.hostname);

	return {
		siteStatus
	};
}

export const actions = {
	logout: async (event) => {
		let fd = await event.request.formData();
		event.cookies.delete('admin');
		event.locals.admin = {
			username: undefined!,
			email: undefined!,
			token: undefined!,
			loggedIn: false
		};

		//using 303 here prevents a 405 error when redirecting (looks like svelte is trying to forward the form data to the new resource when 307 is used).
		throw redirect(303, String(fd.get('currentUrl')));
	},
	updateStatus: async (event) => {
		let fd = await event.request.formData();

		let redirectTo;
		try {
			redirectTo = fd.get('redirectTo');
		} catch {
			redirectTo = null;
		}

		let notifyUsers: boolean | undefined | null;

		try {
			notifyUsers = !!fd.get('notify_commissions');
			fd.delete('notify_commissions');
		} catch {
			notifyUsers = null;
		}

		let token = fd.get('token')?.toString();
		let origin = fd.get('origin')?.toString();
		fd.delete('redirectTo');
		fd.delete('token');
		fd.delete('origin');
		await updateSiteStatus(origin, fd, token);

		//confirm that the site updated
		let siteStatus = await getSiteStatus(event.url.hostname);

		if (notifyUsers && !!siteStatus.commissions_open) {
			try {
				await notifyTelegramUsers(token);
			} catch (e) {
				console.log("Couldn't notify telegram users");
				console.log(e);
			}
			try {
				await notifyDiscordUsers();
			} catch (e) {
				console.log("Couldn't notify discord users");
				console.log(e);
			}
		}

		if (redirectTo) {
			throw redirect(303, redirectTo.toString());
		} else {
			throw redirect(303, '/admin');
		}
	}
};

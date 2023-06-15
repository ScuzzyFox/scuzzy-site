import { error, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	let val: string | number;
	let isSlug: boolean;

	try {
		val = Number(event.params.slug);
		if (isNaN(val)) {
			throw new Error('val is NaN');
		}
		isSlug = false;
	} catch {
		val = event.params.slug;
		isSlug = true;
	}

	let response;

	if (isSlug) {
		response = await fetch(`https://api.scuzzyfox.com/commissions/slug/${event.params.slug}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} else {
		response = await fetch(`https://api.scuzzyfox.com/commissions/${event.params.slug}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	if (response.ok) {
		let commission = await response.json();

		if (event.locals.admin.loggedIn || commission.visible) {
			//display page and data if user is logged in or if commission is visible.
			//if commission is not visible, then only admin can view this page.
			return {
				commission: commission
			};
		} else {
			throw redirect(307, 'commissions/');
		}
	} else {
		throw error(404, 'Not found.');
	}
};

export const actions = {
	addVisual: async (event) => {
		const fd = await event.request.formData();
		let cookie: string | undefined = event.locals.admin.token;
		if (!cookie) {
			cookie = event.cookies.get('admin');
		}

		const response = await fetch('https://api.scuzzyfox.com/commissions/visuals/', {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + cookie
			},
			body: fd
		});

		if (response.ok) {
			return {
				status: 'good'
			};
		} else if (response.status >= 400 && response.status < 500) {
			return {
				status: 'access denied',
				message: await response.text()
			};
		} else if (response.status >= 500 && response.status < 600) {
			return {
				status: 'server error',
				message: await response.text()
			};
		}
	}
};

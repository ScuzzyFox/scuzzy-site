import { redirect } from '@sveltejs/kit';
import type { CommissionCategory, CommissionStatus, Option } from '$lib/CommissionTypes.js';

export const load = async (event) => {
	if (!event.locals.admin.loggedIn) {
		throw redirect(303, '/');
	}
	const optionsResponse = await fetch('https://api.scuzzyfox.com/commissions/options/');
	let options: Option[] = [];
	const statusesResponse = await fetch('https://api.scuzzyfox.com/commissions/statuses/');
	let statuses: CommissionStatus[] = [];
	const categoriesResponse = await fetch('https://api.scuzzyfox.com/commissions/categories/');
	let categories: CommissionCategory[] = [];

	if (optionsResponse.ok) {
		options = await optionsResponse.json();
	}

	if (statusesResponse.ok) {
		statuses = await statusesResponse.json();
	}

	if (categoriesResponse.ok) {
		categories = await categoriesResponse.json();
	}

	return {
		options: options,
		statuses: statuses,
		categories: categories
	};
};

export const actions = {
	newCommission: async (event) => {
		const fd = await event.request.formData();
		let token: string | undefined = event.cookies.get('admin');

		const response = await fetch('https://api.scuzzyfox.com/commissions/', {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + token
			},
			body: fd
		});

		if (response.ok) {
			//redirect to original page
		} else {
			//redirect to original page with errors.
		}
	},
	newOption: async (event) => {
		const fd = await event.request.formData();
		let token: string | undefined = event.cookies.get('admin');

		const response = await fetch('https://api.scuzzyfox.com/commissions/options/', {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + token
			},
			body: fd
		});

		if (response.ok) {
			//redirect to original page
			console.log('success');
		} else {
			//redirect to original page with errors.
			console.log('faled');
			console.log(await response.text());
		}
	},
	newCategory: async (event) => {
		const fd = await event.request.formData();
		let token: string | undefined = event.cookies.get('admin');

		const response = await fetch('https://api.scuzzyfox.com/commissions/categories/', {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + token
			},
			body: fd
		});

		if (response.ok) {
			//redirect to original page
			console.log('success');
		} else {
			//redirect to original page with errors.
			console.log('faled');
			console.log(await response.text());
		}
	},
	newStatus: async (event) => {
		const fd = await event.request.formData();
		let token: string | undefined = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}

		if (token) {
			const response = await fetch('https://api.scuzzyfox.com/commissions/statuses/', {
				method: 'POST',
				headers: {
					Authorization: 'JWT ' + token
				},
				body: fd
			});

			if (response.ok) {
				const status = await response.json();
				return {
					notifications: [
						{ type: 'success', message: 'Successfully created status "' + status.status + '."' }
					]
				};
			}
		} else {
			return { notifications: [{ type: 'error', message: 'Not authenticated.' }] };
		}
	}
};

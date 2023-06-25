import { error, redirect } from '@sveltejs/kit';
import type { CommissionStatus } from '$lib/CommissionTypes.js';

export const load = async (event) => {
	if (!event.locals.admin.loggedIn) {
		throw redirect(303, '/');
	}
	let slug = event.params.slug;
	const statusResponse = await fetch(
		'https://api.scuzzyfox.com/commissions/statuses/' + slug + '/'
	);
	let status: CommissionStatus;

	if (statusResponse.ok) {
		status = await statusResponse.json();
	} else if (statusResponse.status == 404) {
		throw error(404, 'Status not found');
	} else {
		throw error(500, 'Could not retreive status: ' + statusResponse.status);
	}

	return {
		orderStatus: status
	};
};

export const actions = {
	editStatus: async (event) => {
		const fd = await event.request.formData();
		let status_id = fd.get('status');
		fd.delete('status');

		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}
		const statusResponse = await fetch(
			'https://api.scuzzyfox.com/commissions/statuses/' + status_id + '/',
			{
				method: 'PUT',
				headers: {
					Authorization: 'JWT ' + token
				},
				body: fd
			}
		);

		if (statusResponse.ok) {
			let s: CommissionStatus = await statusResponse.json();
			return { notifications: [{ type: 'success', message: `Modified status ${s.id}` }] };
		} else {
			return {
				notifications: [{ type: 'error', message: `Could not modify status ${status_id}` }]
			};
		}
	},
	deleteStatus: async (event) => {
		const fd = await event.request.formData();
		let status_id = fd.get('status');

		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}

		const statusResponse = await fetch(
			'https://api.scuzzyfox.com/commissions/statuses/' + status_id + '/',
			{
				method: 'DELETE',
				headers: {
					Authorization: 'JWT ' + token
				}
			}
		);

		if (statusResponse.ok) {
			throw redirect(303, '/admin/commissions');
		} else {
			return {
				notifications: [{ type: 'error', message: `Could not delete status ${status_id}` }]
			};
		}
	}
};

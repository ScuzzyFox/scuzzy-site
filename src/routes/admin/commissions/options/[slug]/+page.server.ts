import { error, redirect } from '@sveltejs/kit';
import type { Option } from '$lib/CommissionTypes.js';

export const load = async (event) => {
	if (!event.locals.admin.loggedIn) {
		throw redirect(303, '/');
	}
	let slug = event.params.slug;
	const optionResponse = await fetch('https://api.scuzzyfox.com/commissions/options/' + slug + '/');
	let option: Option;

	if (optionResponse.ok) {
		option = await optionResponse.json();
	} else if (optionResponse.status == 404) {
		throw error(404, 'Option not found');
	} else {
		throw error(500, 'Could not retreive option: ' + optionResponse.status);
	}

	return {
		option: option
	};
};

export const actions = {
	editOption: async (event) => {
		const fd = await event.request.formData();
		let option_id = fd.get('option');
		fd.delete('option');

		let example_image = fd.get('example_image');

		if (
			!example_image ||
			example_image.length < 1 ||
			(example_image instanceof File && (example_image.size < 1 || example_image.name == undefined))
		) {
			fd.delete('example_image');
		}

		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}
		const optionResponse = await fetch(
			'https://api.scuzzyfox.com/commissions/options/' + option_id + '/',
			{
				method: 'PUT',
				headers: {
					Authorization: 'JWT ' + token
				},
				body: fd
			}
		);

		if (optionResponse.ok) {
			let o: Option = await optionResponse.json();
			return { notifications: [{ type: 'success', message: `Modified option ${o.id}` }] };
		} else {
			return {
				notifications: [{ type: 'error', message: `Could not modify option ${option_id}` }]
			};
		}
	},
	deleteOption: async (event) => {
		const fd = await event.request.formData();
		let option_id = fd.get('option');

		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}

		const optionResponse = await fetch(
			'https://api.scuzzyfox.com/commissions/options/' + option_id + '/',
			{
				method: 'DELETE',
				headers: {
					Authorization: 'JWT ' + token
				}
			}
		);

		if (optionResponse.ok) {
			throw redirect(303, '/admin/commissions');
		} else {
			return {
				notifications: [{ type: 'error', message: `Could not delete option ${option_id}` }]
			};
		}
	}
};

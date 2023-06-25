import { error, redirect } from '@sveltejs/kit';
import type { CommissionCategory } from '$lib/CommissionTypes.js';

export const load = async (event) => {
	if (!event.locals.admin.loggedIn) {
		throw redirect(303, '/');
	}
	let slug = event.params.slug;
	const categoryResponse = await fetch(
		'https://api.scuzzyfox.com/commissions/categories/' + slug + '/'
	);
	let category: CommissionCategory;

	if (categoryResponse.ok) {
		category = await categoryResponse.json();
	} else if (categoryResponse.status == 404) {
		throw error(404, 'Category not found');
	} else {
		throw error(500, 'Could not retreive category: ' + categoryResponse.status);
	}

	return {
		category: category
	};
};

export const actions = {
	editCategory: async (event) => {
		const fd = await event.request.formData();
		let category_id = fd.get('category');
		fd.delete('category');

		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}
		const categoryResponse = await fetch(
			'https://api.scuzzyfox.com/commissions/categories/' + category_id + '/',
			{
				method: 'PUT',
				headers: {
					Authorization: 'JWT ' + token
				},
				body: fd
			}
		);

		if (categoryResponse.ok) {
			let c: CommissionCategory = await categoryResponse.json();
			return { notifications: [{ type: 'success', message: `Modified category ${c.id}` }] };
		} else {
			return {
				notifications: [{ type: 'error', message: `Could not modify category ${category_id}` }]
			};
		}
	},
	deleteCategory: async (event) => {
		const fd = await event.request.formData();
		let status_id = fd.get('category');

		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}

		const statusResponse = await fetch(
			'https://api.scuzzyfox.com/commissions/categories/' + status_id + '/',
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
				notifications: [{ type: 'error', message: `Could not delete category ${status_id}` }]
			};
		}
	}
};

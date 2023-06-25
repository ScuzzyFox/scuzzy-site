import type { CommissionVisual } from '$lib/CommissionTypes.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const slug = event.params.slug;
	const glug = event.params.glug;
	if (!event.locals.admin.loggedIn) {
		throw redirect(303, '/commissions/' + slug + '/visuals');
	}

	const visualsResponse = await fetch(
		`https://api.scuzzyfox.com/commissions/visuals/?group_id=${glug}`
	);

	if (visualsResponse.ok) {
		let visuals: CommissionVisual[] = await visualsResponse.json();
		return { visuals: visuals, commissionSlug: slug };
	} else {
		throw error(500, 'Could not retrieve visuals');
	}
};

export const actions = {
	modifyVisualGroup: async (event) => {
		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}
		const fd = await event.request.formData();
		let ids: string | FormDataEntryValue | undefined | any[] | null = fd.get('ids');
		fd.delete('ids');
		if (typeof ids == 'string') {
			ids = JSON.parse(ids);
		}
		let responses: Response[] = [];
		if (ids instanceof Array) {
			for (let id of ids) {
				const response = await fetch('https://api.scuzzyfox.com/commissions/visuals/' + id + '/', {
					method: 'PUT',
					body: fd,
					headers: {
						Authorization: 'JWT ' + token
					}
				});

				if (!response.ok) {
					return {
						notifications: [
							{ type: 'error', message: 'One of the visuals failed to modify: ' + response.status }
						]
					};
				}
			}

			if (
				responses.every((res) => {
					return res.ok;
				})
			) {
				return { notifications: [{ type: 'success', message: 'Updated visuals group!' }] };
			} else {
				return {
					notifications: [{ type: 'error', message: 'One of the visuals failed to modify.' }]
				};
			}
		}
	},
	deleteVisualsGroup: async (event) => {
		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}
		const fd = await event.request.formData();
		let group_id = fd.get('group_id');

		const visualResponse = await fetch(
			'https://api.scuzzyfox.com/commissions/visuals/?group_id=' + group_id,
			{
				method: 'DELETE',
				headers: {
					Authorization: 'JWT ' + token
				}
			}
		);

		if (visualResponse.ok) {
			let slug = event.params.slug;
			throw redirect(303, `/commissions/${slug}/visuals`);
		} else {
			return {
				notifications: [
					{ type: 'error', message: 'Could not delete visuals group: ' + visualResponse.status }
				]
			};
		}
	}
};

import { error, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const slug = event.params.slug;
	let response: Response;
	let optionsResponse: Response;
	let statusResponse: Response | undefined;
	let token: string | undefined;
	let options: any = 'null';
	if (event.locals.admin.loggedIn) {
		token = event.locals.admin.token;
	} else if (event.cookies.get('admin')) {
		token = event.cookies.get('admin');
	} else {
		token = undefined;
	}

	if (token) {
		response = await fetch(`https://api.scuzzyfox.com/commissions/orders/${slug}/`, {
			headers: {
				Authorization: 'JWT ' + token
			}
		});

		statusResponse = await fetch('https://api.scuzzyfox.com/commissions/statuses/', {
			headers: {
				Authorization: 'JWT ' + token
			}
		});

		optionsResponse = await fetch('https://api.scuzzyfox.com/commissions/options/');
		if (optionsResponse.ok) {
			options = await optionsResponse.json();
		}
	} else {
		response = await fetch(`https://api.scuzzyfox.com/commissions/orders/${slug}/`);
	}

	if (response.ok) {
		const order = await response.json();
		if (order.nsfw && !event.locals.userSettings.nsfwAllowed) {
			throw error(
				403,
				'Thisi is an NSFW request and you have NSFW turned off. Please enable it in the top-right to view.'
			);
		}

		if (order.abdl && !event.locals.userSettings.abdlAllowed) {
			throw error(
				403,
				'Thisi is an ABDL request and you have ABDL turned off. Please enable it in site settings to view.'
			);
		}
		if (order.commission) {
			const commissionResponse = await fetch(
				`https://api.scuzzyfox.com/commissions/${order.commission}/`
			);
			if (commissionResponse.ok) {
				const commissionData = await commissionResponse.json();
				order.commissionData = commissionData;
			} else if (commissionResponse.status == 404) {
				throw error(404, 'Commission for order somehow does not exist.');
			} else {
				throw error(
					500,
					'An unexpected error occurred while retreiving the commission data for the order.'
				);
			}
		}

		if (statusResponse && statusResponse.ok) {
			let statuses = await statusResponse.json();
			return { order: order, statuses: statuses, options: options };
		} else {
			return { order: order, statuses: 'nothing', options: options };
		}
	} else if (response.status == 404) {
		throw error(404, slug + ' does not exist, or no longer exists.');
	} else {
		throw error(500, 'Could not laod order ' + slug);
	}
};

export const actions = {
	assignStatus: async (event) => {
		const fd = await event.request.formData();
		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}
		let order = fd.get('order');
		let status = fd.get('status_id');
		let assign = fd.get('assign');
		let unassign = fd.get('unassign');
		let method: string = 'GET';

		if (assign) {
			method = 'POST';
		} else if (unassign) {
			method = 'DELETE';
		}

		const response = await fetch(
			`https://api.scuzzyfox.com/commissions/order/status/${order}/${status}/`,
			{
				method: method,
				headers: {
					Authorization: 'JWT ' + token
				}
			}
		);

		if (response.ok) {
			return {
				notifications: [
					{
						type: 'success',
						message: assign
							? 'Successfully assigned status ' + status + ' to order ' + order + '.'
							: 'Successfully unassigned status ' + status + ' from order ' + order + '.'
					}
				]
			};
		} else if (response.status == 403) {
			return { notifications: [{ type: 'error', message: 'Unauthorized.' }] };
		} else {
			return { notifications: [{ type: 'error', message: 'Unexpected error occurred.' }] };
		}
	},
	editArtistNote: async (event) => {
		const fd = await event.request.formData();
		const order = fd.get('order');
		fd.delete('order');
		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}

		const response = await fetch(`https://api.scuzzyfox.com/commissions/orders/${order}/`, {
			method: 'PUT',
			headers: {
				Authorization: 'JWT ' + token
			},
			body: fd
		});

		if (response.ok) {
			const o = await response.json();
			return {
				notifications: [{ type: 'success', message: 'Artist note edited for order ' + o.id }]
			};
		} else if (response.status == 500) {
			return {
				notifications: [{ type: 'error', message: 'Internal server error occurred.' }]
			};
		} else if (response.status == 403) {
			return {
				notifications: [{ type: 'error', message: 'Permission denied.' }]
			};
		} else if (response.status == 404) {
			return {
				notifications: [
					{ type: 'error', message: 'Somehow, order does not exist or it was deleted.' }
				]
			};
		} else {
			return { notifications: [{ type: 'error', message: 'An unknown error occurred.' }] };
		}
	},
	deleteOrder: async (event) => {
		const fd = await event.request.formData();
		const order = fd.get('order');
		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}
		const response = await fetch(`https://api.scuzzyfox.com/commissions/orders/${order}/`, {
			headers: {
				Authorization: 'JWT ' + token
			},
			method: 'DELETE'
		});

		if (response.ok) {
			//const o = await response.json();
			throw redirect(303, '/commission-orders');
		} else if (response.status == 500) {
			return {
				notifications: [{ type: 'error', message: 'Internal server error occurred.' }]
			};
		} else if (response.status == 403) {
			return {
				notifications: [{ type: 'error', message: 'Permission denied.' }]
			};
		} else if (response.status == 404) {
			return {
				notifications: [
					{ type: 'error', message: 'Somehow, order does not exist or it was deleted.' }
				]
			};
		} else {
			return { notifications: [{ type: 'error', message: 'An unknown error occurred.' }] };
		}
	},
	modifyOrder: async (event) => {
		const fd = await event.request.formData();
		const order = fd.get('order');
		fd.delete('order');
		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}
		const response = await fetch(`https://api.scuzzyfox.com/commissions/orders/${order}/`, {
			headers: {
				Authorization: 'JWT ' + token
			},
			method: 'PUT',
			body: fd
		});

		if (response.ok) {
			const o = await response.json();
			return {
				notifications: [{ type: 'success', message: 'Successfully modified order ' + o.id + '!' }]
			};
		} else if (response.status == 500) {
			return {
				notifications: [{ type: 'error', message: 'Internal server error occurred.' }]
			};
		} else if (response.status == 403) {
			return {
				notifications: [{ type: 'error', message: 'Permission denied.' }]
			};
		} else if (response.status == 404) {
			return {
				notifications: [
					{ type: 'error', message: 'Somehow, order does not exist or it was deleted.' }
				]
			};
		} else {
			return { notifications: [{ type: 'error', message: 'An unknown error occurred.' }] };
		}
	},
	addRemoveOption: async (event) => {
		const fd = await event.request.formData();
		let token = event.cookies.get('admin');
		if (!token) {
			token = event.locals.admin.token;
		}

		let order_id = fd.get('order');
		let option_id = fd.get('option');
		let assign = fd.get('assign');
		let unassign = fd.get('unassign');
		let method: string = 'GET';

		if (assign) {
			method = 'POST';
		} else if (unassign) {
			method = 'DELETE';
		}

		const response = await fetch(
			`https://api.scuzzyfox.com/commissions/orders/option/${order_id}/${option_id}/`,
			{
				method: method,
				headers: {
					Authorization: 'JWT ' + token
				}
			}
		);

		console.log('status', response.status);

		if (response.ok) {
			return {
				notifications: [
					{
						type: 'success',
						message:
							'Successfully ' +
							(assign ? 'assigned' : 'unassigned') +
							' option ' +
							option_id +
							' involving order ' +
							order_id +
							'.'
					}
				]
			};
		} else if (response.status >= 400 && response.status < 500) {
			return {
				notifications: [
					{
						type: 'error',
						message:
							'Failed to modify option assignment between order ' +
							order_id +
							' and option ' +
							option_id +
							'.'
					}
				]
			};
		} else {
			return {
				notifications: [{ type: 'error', message: 'A server error occurred: ' }]
			};
		}
	}
};

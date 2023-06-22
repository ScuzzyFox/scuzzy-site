import { error } from '@sveltejs/kit';

export const load = async (event) => {
	let token: string | undefined = undefined;
	if (event.locals.admin.token) {
		token = event.locals.admin.token;
	} else if (event.cookies.get('admin')) {
		token = event.cookies.get('admin');
	}

	let response: Response;

	//if admin is logged in, authenticate with the sever to get the full order data.
	//otherwise don't authenticate and give us basic data.
	if (token) {
		response = await fetch('https://api.scuzzyfox.com/commissions/orders/', {
			method: 'GET',
			headers: {
				Authorization: 'JWT ' + token
			}
		});
	} else {
		response = await fetch('https://api.scuzzyfox.com/commissions/orders/');
	}

	if (response.ok) {
		const orders = await response.json();
		return {
			orders: orders
		};
	} else {
		throw error(500, 'Failed to fetch commission orders.');
	}
};

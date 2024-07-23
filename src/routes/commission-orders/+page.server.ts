import { error } from '@sveltejs/kit';
import type { CommissionOrder, CommissionStatus } from '$lib/CommissionTypes.js';

async function getStatuses() {
	const response = await fetch('https://api.scuzzyfox.com/commissions/statuses/');
	if (response.ok) {
		return response.json();
	}
	throw error(500, 'Failed to fetch statuses');
}

async function getOrders(token?: string) {
	const url = 'https://api.scuzzyfox.com/commissions/orders/';
	const headers = token ? { Authorization: 'JWT ' + token } : {};
	const response = await fetch(url, { headers });

	if (response.ok) {
		return response.json();
	}
	throw error(500, 'Failed to fetch commission orders.');
}



export const load = async (event) => {
	let token: string | undefined = undefined;
	if (event.locals.admin.token) {
		token = event.locals.admin.token;
	} else if (event.cookies.get('admin')) {
		token = event.cookies.get('admin');
	}

	const [statuses, orders] = await Promise.all([
		getStatuses(),
		getOrders(token)
	]);

	

	return {
			orders: orders,
			statuses: statuses
		};
};

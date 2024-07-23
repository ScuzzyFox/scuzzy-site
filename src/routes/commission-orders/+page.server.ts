import { error } from '@sveltejs/kit';
import type { CommissionOrder, CommissionStatus } from '$lib/CommissionTypes.js';

async function getStatuses() {
	const response = await fetch('https://api.scuzzyfox.com/commissions/statuses/');
	if (response.ok) {
		return await response.json();
	}
	throw error(500, 'Failed to fetch statuses');
}

async function getOrders(token?: string) {
	const url = 'https://api.scuzzyfox.com/commissions/orders/';
	const headers = token ? { Authorization: 'JWT ' + token } : {};
	const response = await fetch(url, { headers });

	if (response.ok) {
		return await response.json();
	}
	throw error(500, 'Failed to fetch commission orders.');
}

async function getCommissionData(commissionId: string) {
	const response = await fetch(`https://api.scuzzyfox.com/commissions/${commissionId}`);
	if (response.ok) {
		return await response.json();
	}
	throw error(500, 'Failed to fetch commission data for order.');
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

	if (token) {
		const commissionDataPromises = orders.map(async (order: CommissionOrder) => {
			order.commissionData = await getCommissionData(order.commission);
			return order;
		});
		const ordersWithCommissionData = await Promise.all(commissionDataPromises);
		return {
			orders: ordersWithCommissionData,
			statuses: statuses
		};
	} else {
		return {
			orders: orders,
			statuses: statuses
		};
	}
};

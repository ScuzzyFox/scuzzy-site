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

async function getAllCommissions() {
	const response = await fetch('https://api.scuzzyfox.com/commissions/');
	if (response.ok) {
		return await response.json();
	}
	throw error(500, 'Failed to fetch all commissions');
}

export const load = async (event) => {
	let token: string | undefined = undefined;
	if (event.locals.admin.token) {
		token = event.locals.admin.token;
	} else if (event.cookies.get('admin')) {
		token = event.cookies.get('admin');
	}

	const [statuses, orders, commissions] = await Promise.all([
		getStatuses(),
		getOrders(token),
		getAllCommissions()
	]);

	if (token) {
		const ordersWithCommissionData = orders.map((order: CommissionOrder) => {
			const commissionData = commissions.find((commission: any) => commission.id === order.commission);
			return { ...order, commissionData };
		});
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

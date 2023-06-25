import { error } from '@sveltejs/kit';
import type { CommissionOrder, CommissionStatus } from '$lib/CommissionTypes.js';

async function getStatuses() {
	const response = await fetch('https://api.scuzzyfox.com/commissions/statuses/');
	if (response.ok) {
		return await response.json();
	}
}

export const load = async (event) => {
	let token: string | undefined = undefined;
	if (event.locals.admin.token) {
		token = event.locals.admin.token;
	} else if (event.cookies.get('admin')) {
		token = event.cookies.get('admin');
	}

	const statuses = await getStatuses();

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
		const orders: CommissionOrder[] = await response.json();
		if (token) {
			for (let order of orders) {
				const commissionResponse = await fetch(
					`https://api.scuzzyfox.com/commissions/${order.commission}`
				);
				if (commissionResponse.ok) {
					order.commissionData = await commissionResponse.json();
				} else {
					throw error(500, 'Failed to fetch commission data for orders.');
				}
			}
		}
		return {
			orders: orders,
			statuses: statuses
		};
	} else {
		throw error(500, 'Failed to fetch commission orders.');
	}
};

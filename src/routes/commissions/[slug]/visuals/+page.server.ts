import type { CommissionVisual } from '$lib/CommissionTypes.js';
import { error, redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const slug = event.params.slug;
	if (!event.locals.admin.loggedIn) {
		throw redirect(303, '/commissions/' + slug);
	}

	const commissionResponse = await fetch(`https://api.scuzzyfox.com/commissions/slug/${slug}/`);

	if (commissionResponse.ok) {
		let commission = await commissionResponse.json();
		let visuals: CommissionVisual[] = commission.commission_visuals;
		return {
			visuals: visuals,
			commission: commission
		};
	} else if (commissionResponse.status == 404) {
		throw error(404, 'Could not retrieve commission');
	} else {
		throw error(500, 'An unknown error occurred.');
	}
};

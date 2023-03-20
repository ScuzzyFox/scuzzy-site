import type { PageServerLoad } from '../$types';
import { snakeToCamel } from '$lib/Goal';
import { error } from '@sveltejs/kit';
import type { Goal } from '$lib/Goal';

export const load = (async (event) => {
	let val: string | number;
	let isSlug: boolean;
	try {
		val = Number(event.params.slug);
		if (isNaN(val)) {
			throw new Error('val is NaN');
		}
		isSlug = false;
	} catch {
		val = event.params.slug;
		isSlug = true;
	}

	let response;

	if (isSlug) {
		response = await fetch(`https://api.scuzzyfox.com/goals/slug/${event.params.slug}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} else {
		response = await fetch(`https://api.scuzzyfox.com/goals/${event.params.slug}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	if (response.ok) {
		return {
			goal: snakeToCamel(await response.json())
		};
	} else {
		throw error(404, 'Not found.');
	}
}) satisfies PageServerLoad;

import { error } from '@sveltejs/kit';

export const load = async (event) => {
	const commissionsResponse = await fetch('https://api.scuzzyfox.com/commissions/');

	if (commissionsResponse.ok) {
		let commissions = await commissionsResponse.json();
		//todo: split commissions into featured and not featured, then order by order count
		let featuredCommissions = commissions.filter((com: any) => {
			return com.featured;
		});

		let nonFeaturedCommissions = commissions.filter((com: any) => {
			return !com.featured;
		});

		featuredCommissions.sort((a: any, b: any) => {
			return b.order_count - a.order_count;
		});

		nonFeaturedCommissions.sort((a: any, b: any) => {
			return b.order_count - a.order_count;
		});

		commissions = [...featuredCommissions, ...nonFeaturedCommissions];

		return {
			commissions: commissions
		};
	} else {
		throw error(500, 'Could not load commissions: ' + commissionsResponse.status);
	}
};

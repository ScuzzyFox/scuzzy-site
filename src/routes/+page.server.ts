function randomIntFromInterval(min: number, max: number) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export const load = async (event) => {
	const commissionsResponse = await fetch('https://api.scuzzyfox.com/commissions/');

	if (commissionsResponse.ok) {
		let commissions = await commissionsResponse.json();

		let abdlAllowed = event.locals.userSettings.abdlAllowed;
		let nsfwAllowed = event.locals.userSettings.nsfwAllowed;

		if (!nsfwAllowed) {
			commissions = commissions.filter((com: any) => {
				return !com.adult;
			});
		}

		if (!abdlAllowed) {
			commissions = commissions.filter((com: any) => {
				return !com.abdl;
			});
		}

		let featuredCommissions = commissions.filter((com: any) => {
			return com.featured && com.visible && com.available;
		});

		if (featuredCommissions.length == 0) {
			featuredCommissions = commissions.filter((com: any) => {
				return com.featured && com.visible;
			});
		}

		if (featuredCommissions.length == 0) {
			featuredCommissions = commissions.filter((com: any) => {
				return com.featured;
			});
		}

		if (featuredCommissions.length == 0) {
			featuredCommissions = commissions;
		}

		if (featuredCommissions.length == 0) {
			return {
				commission: undefined
			};
		}

		let upperBound: number = featuredCommissions.length - 1;

		let randIndex = randomIntFromInterval(0, upperBound);

		return {
			commission: featuredCommissions[randIndex]
		};
	} else {
		return {
			commission: undefined
		};
	}
};

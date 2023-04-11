const baseUrl: string = 'https://api.scuzzyfox.com/';

export async function getSiteStatuses() {
	const response = await fetch(baseUrl + 'site-status/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	let statuses;

	if (response.ok) {
		statuses = await response.json();
	} else {
		statuses = null;
		console.log(await response.text());
	}

	return statuses;
}

export async function getSiteStatus(origin: string) {
	const response = await fetch(baseUrl + 'site-status/' + origin + '/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	let status;

	if (response.ok) {
		status = await response.json();
	} else {
		status = null;
	}

	return status;
}

export async function getPageView(origin: string, pathname: string) {
	const response = await fetch(baseUrl + 'page-views/' + origin + '/', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			pathname: pathname
		})
	});

	let pageView;

	if (response.ok) {
		pageView = response.json();
	} else {
		pageView = null;
	}

	return pageView;
}

export async function getPageViewAndIncrement(origin: string, pathname: string) {
	const response = await fetch(baseUrl + 'page-views/' + origin + '/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			pathname: pathname
		})
	});

	let pageView;

	if (response.ok) {
		pageView = response.json();
	} else {
		pageView = null;
	}

	return pageView;
}

export async function updateSiteStatus(
	origin: string | undefined,
	fd: FormData,
	token: string | undefined
) {
	const response = await fetch(baseUrl + 'update-site-status/' + origin + '/', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `JWT ${token}`
		},
		body: fd
	});
}

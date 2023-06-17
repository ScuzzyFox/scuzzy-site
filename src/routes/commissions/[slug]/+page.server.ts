import { error, redirect } from '@sveltejs/kit';

export const load = async (event) => {
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
		response = await fetch(`https://api.scuzzyfox.com/commissions/slug/${event.params.slug}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} else {
		response = await fetch(`https://api.scuzzyfox.com/commissions/${event.params.slug}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const optionsResponse = await fetch('https://api.scuzzyfox.com/commissions/options', {
		method: 'GET'
	});

	if (response.ok && optionsResponse.ok) {
		let commission = await response.json();
		let options = await optionsResponse.json();

		if (event.locals.admin.loggedIn || commission.visible) {
			//display page and data if user is logged in or if commission is visible.
			//if commission is not visible, then only admin can view this page.
			return {
				commission: commission,
				options: options
			};
		} else {
			throw redirect(307, 'commissions/');
		}
	} else {
		throw error(404, 'Not found.');
	}
};

export const actions = {
	addVisual: async (event) => {
		const fd = await event.request.formData();
		let cookie: string | undefined = event.locals.admin.token;
		if (!cookie) {
			cookie = event.cookies.get('admin');
		}

		const response = await fetch('https://api.scuzzyfox.com/commissions/visuals/', {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + cookie
			},
			body: fd
		});

		if (response.ok) {
			let vis = await response.json();
			return {
				notifications: [
					{
						type: 'success',
						message: 'Successfully created commission visual: ' + vis.group_identifier
					}
				]
			};
		} else if (response.status >= 400 && response.status < 500) {
			let error = await response.json();
			return {
				notifications: [
					{
						type: 'error',
						message: 'Failed to create commission visual: access denied...' + JSON.stringify(error)
					}
				]
			};
		} else if (response.status >= 500 && response.status < 600) {
			let error = await response.json();
			return {
				notifications: [
					{ type: 'error', message: 'A server error occurred: ' + JSON.stringify(error) }
				]
			};
		}
	},
	assignOption: async (event) => {
		const fd = await event.request.formData();
		let token: string | null | undefined = event.locals.admin.token;
		if (!token) {
			token = event.cookies.get('admin');
		}

		let commission_id = fd.get('commission');
		let option_id = fd.get('option');
		let assign = fd.get('assign');
		let unassign = fd.get('unassign');
		let method: string = 'GET';

		if (assign) {
			method = 'POST';
		} else if (unassign) {
			method = 'DELETE';
		}
		console.log('method: ', method);
		const response = await fetch(
			`https://api.scuzzyfox.com/commissions/option/${commission_id}/${option_id}`,
			{
				method: method,
				headers: {
					Authorization: 'JWT ' + token
				}
			}
		);

		if (response.ok) {
			await response.json();
			return {
				notifications: [
					{
						type: 'success',
						message:
							'Successfully ' +
							(assign ? 'assigned' : 'unassigned') +
							' option ' +
							option_id +
							' to commission ' +
							commission_id +
							'.'
					}
				]
			};
		} else if (response.status >= 400 && response.status < 500) {
			let error = await response.json();
			return {
				notifications: [
					{
						type: 'error',
						message: 'Failed to modify option assignment: access denied...' + JSON.stringify(error)
					}
				]
			};
		} else if (response.status >= 500 && response.status < 600) {
			let error = await response.json();
			return {
				notifications: [
					{ type: 'error', message: 'A server error occurred: ' + JSON.stringify(error) }
				]
			};
		}
	}
};

export const actions = {
	newCommission: async (event) => {
		const fd = await event.request.formData();
		let token: string | undefined = event.cookies.get('admin');

		const response = await fetch('https://api.scuzzyfox.com/commissions/', {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + token
			},
			body: fd
		});

		if (response.ok) {
			//redirect to original page
		} else {
			//redirect to original page with errors.
		}
	},
	newOption: async (event) => {
		const fd = await event.request.formData();
		let token: string | undefined = event.cookies.get('admin');

		const response = await fetch('https://api.scuzzyfox.com/commissions/options/', {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + token
			},
			body: fd
		});

		if (response.ok) {
			//redirect to original page
			console.log('success');
		} else {
			//redirect to original page with errors.
			console.log('faled');
			console.log(await response.text());
		}
	},
	newCategory: async (event) => {
		const fd = await event.request.formData();
		let token: string | undefined = event.cookies.get('admin');

		const response = await fetch('https://api.scuzzyfox.com/commissions/categories/', {
			method: 'POST',
			headers: {
				Authorization: 'JWT ' + token
			},
			body: fd
		});

		if (response.ok) {
			//redirect to original page
			console.log('success');
		} else {
			//redirect to original page with errors.
			console.log('faled');
			console.log(await response.text());
		}
	}
};

import { error, redirect } from '@sveltejs/kit';
import { DJANGO_API_TOKEN, TELEGRAM_BOT_TOKEN } from '$env/static/private';
import { blank_customer_sketch } from '$lib/constants/dataurls';
import type { CharacterReference, CommissionOrder } from '$lib/CommissionTypes';
import TelegramBot from 'node-telegram-bot-api';

const viewOrdersUrl: string = 'https://scuzzyfox.com/commission-orders/';
const scuzzyChatId = 136847371;

async function incrementViewCount(id: number) {
	const response = await fetch(
		`https://api.scuzzyfox.com/commissions/${id}/increment-view-count/`,
		{
			method: 'PUT',
			headers: {
				Authorization: 'Poken ' + DJANGO_API_TOKEN
			}
		}
	);
}

function deleteOrder(orderId: number) {
	console.log('HAD TO DELETE AN ORDER');
	fetch(`https://api.scuzzyfox.com/commissions/orders/${orderId}/`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Poken ' + DJANGO_API_TOKEN
		}
	});
}

async function notifyScuzzyOfNewOrder(order: CommissionOrder, chatId: any) {
	var bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });
	//exclamation marks: !
	//periods: .
	//dashes: -
	//must be escaped with double backslash: \
	const message = `*Hey 'real' scuzzy*\n\n__You have a new commission request from ${order.customer_name
		.replace('!', '\\!')
		.replace('.', '\\.')
		.replace('-', '\\-')}\\!__\n\nCatch it at [this link](${viewOrdersUrl}${
		order.id
	})\\.\n\nThe Order ID is ${order.id}\\.`;

	try {
		bot.sendMessage(chatId, message, { parse_mode: 'MarkdownV2' });
	} catch (err) {
		console.log(err);
	}

	setTimeout(() => {
		try {
			bot.stopPolling();
			//@ts-expect-error
			bot = null;
		} catch {
			//nothin
		}
	}, 10000);
}

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

	const optionsResponse = await fetch('https://api.scuzzyfox.com/commissions/options/', {
		method: 'GET'
	});

	const categoriesResponse = await fetch('https://api.scuzzyfox.com/commissions/categories/', {
		method: 'GET'
	});

	if (response.ok && optionsResponse.ok && categoriesResponse.ok) {
		let commission = await response.json();
		let options = await optionsResponse.json();
		let categories = await categoriesResponse.json();

		incrementViewCount(commission.id);

		if (event.locals.admin.loggedIn || commission.visible) {
			//display page and data if user is logged in or if commission is visible.
			//if commission is not visible, then only admin can view this page.
			return {
				commission: commission,
				options: options,
				categories: categories
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
			return {
				notifications: [
					{
						type: 'error',
						message: 'Failed to create commission visual: access denied...'
					}
				]
			};
		} else if (response.status >= 500 && response.status < 600) {
			return {
				notifications: [{ type: 'error', message: 'A server error occurred: ' }]
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
			`https://api.scuzzyfox.com/commissions/option/${commission_id}/${option_id}/`,
			{
				method: method,
				headers: {
					Authorization: 'JWT ' + token
				}
			}
		);

		console.log('status', response.status);

		if (response.ok) {
			return {
				notifications: [
					{
						type: 'success',
						message:
							'Successfully ' +
							(assign ? 'assigned' : 'unassigned') +
							' option ' +
							option_id +
							' involving commission ' +
							commission_id +
							'.'
					}
				]
			};
		} else if (response.status >= 400 && response.status < 500) {
			return {
				notifications: [
					{
						type: 'error',
						message: 'Failed to modify option assignment: access denied...'
					}
				]
			};
		} else {
			return {
				notifications: [{ type: 'error', message: 'A server error occurred: ' }]
			};
		}
	},
	assignCategory: async (event) => {
		const fd = await event.request.formData();
		let token: string | null | undefined = event.locals.admin.token;
		if (!token) {
			token = event.cookies.get('admin');
		}

		let commission_id = fd.get('commission');
		let category_id = fd.get('category');
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
			`https://api.scuzzyfox.com/commissions/category/${commission_id}/${category_id}/`,
			{
				method: method,
				headers: {
					Authorization: 'JWT ' + token
				}
			}
		);

		console.log('status', response.status);

		if (response.ok) {
			return {
				notifications: [
					{
						type: 'success',
						message:
							'Successfully ' +
							(assign ? 'assigned' : 'unassigned') +
							' category ' +
							category_id +
							' involving commission ' +
							commission_id +
							'.'
					}
				]
			};
		} else if (response.status >= 400 && response.status < 500) {
			return {
				notifications: [
					{
						type: 'error',
						message: 'Failed to modify option assignment: access denied...'
					}
				]
			};
		} else {
			return {
				notifications: [{ type: 'error', message: 'A server error occurred: ' }]
			};
		}
	},
	editCommission: async (event) => {
		const fd = await event.request.formData();
		let file = fd.get('ad_image');
		if (file instanceof File) {
			if (!file.name || file.size < 1) {
				fd.delete('ad_image');
			}
		} else {
			fd.delete('ad_image');
		}

		let token: string | null | undefined = event.locals.admin.token;
		if (!token) {
			token = event.cookies.get('admin');
		}

		let commission_id = fd.get('com_id');
		fd.delete('com_id');

		const response = await fetch(`https://api.scuzzyfox.com/commissions/${commission_id}/`, {
			method: 'PUT',
			body: fd,
			headers: {
				Authorization: 'JWT ' + token
			}
		});

		if (response.ok) {
			let comm = await response.json();
			return {
				notifications: [
					{
						type: 'success',
						message: 'Successfully modified commission ' + comm.id + '!'
					}
				]
			};
		} else if (response.status >= 400 && response.status < 500) {
			let error = await response.text();
			return {
				notifications: [
					{
						type: 'error',
						message: 'Failed to modify commission: ' + response.status + ' access denied...' + error
					}
				]
			};
		} else {
			return {
				notifications: [{ type: 'error', message: 'A server error occurred: ' }]
			};
		}
	},
	deleteCommission: async (event) => {
		const fd = await event.request.formData();

		let commission_id = fd.get('commission_id');

		let token: string | null | undefined = event.locals.admin.token;
		if (!token) {
			token = event.cookies.get('admin');
		}

		const response = await fetch(`https://api.scuzzyfox.com/commissions/${commission_id}/`, {
			method: 'DELETE',
			headers: {
				Authorization: 'JWT ' + token
			}
		});

		if (response.ok) {
			throw redirect(303, '/commissions');
		} else if (response.status == 403) {
			let error = await response.text();
			return {
				notifications: [
					{
						type: 'error',
						message: 'Failed to modify commission: ' + response.status + ' access denied...' + error
					}
				]
			};
		} else if (response.status >= 500) {
			return {
				notifications: [{ type: 'error', message: 'A server error occurred.' }]
			};
		} else {
			return {
				notifications: [
					{ type: 'error', message: 'Something unknown went wrong, perhaps user error.' }
				]
			};
		}
	},
	orderCommission: async (event) => {
		let notificationsArray: { type: string; message: string }[] = [];
		const OrderFD = await event.request.formData();
		//extract and parse non-necessary data:
		//(check if extra_character_details,
		//check if customer_sketch,
		//parse and remove selected options,
		//parse and remove character_references)
		let extraCharacterDetails = OrderFD.get('extra_character_details');
		if (!extraCharacterDetails) {
			OrderFD.delete('extra_character_details');
		}

		let customerSketch = OrderFD.get('customer_sketch');
		if (!customerSketch || customerSketch == blank_customer_sketch) {
			OrderFD.delete('customer_sketch');
		}

		let selectedOptions: number[] = [];
		let unparsedOptions = OrderFD.get('selected_options');
		OrderFD.delete('selected_options');
		if (typeof unparsedOptions === 'string' || unparsedOptions instanceof String) {
			let nums = unparsedOptions.split(',');
			nums.forEach((num) => {
				selectedOptions.push(parseInt(num));
			});
		} else if (unparsedOptions instanceof Array) {
			unparsedOptions.forEach((unparsedOption) => {
				selectedOptions.push(parseInt(unparsedOption));
			});
		}

		let unparsedCharacterReferences = OrderFD.get('character_references');
		OrderFD.delete('character_references');

		let characterReferences: CharacterReference[] = [];

		if (
			typeof unparsedCharacterReferences === 'string' ||
			unparsedCharacterReferences instanceof String
		) {
			//@ts-ignore
			characterReferences = JSON.parse(unparsedCharacterReferences);
		}

		//let listOfFiles: any[] = [];

		characterReferences.forEach((ref, index) => {
			if (ref.type == 'file') {
				let file: File | null | FormDataEntryValue = OrderFD.get(
					`${index}|${ref.character_name}|file`
				);
				if (!file) {
					delete characterReferences[index].image;
					//listOfFiles.push(NaN);
					return;
				} else if (!(file instanceof File)) {
					//listOfFiles.push(NaN);
					OrderFD.delete(`${index}|${ref.character_name}|file`);
					delete characterReferences[index].image;
					return;
				} else {
					characterReferences[index].image = file;
				}

				delete characterReferences[index].link;
				delete characterReferences[index].text_description;
				//listOfFiles.push(file);
			} else if (ref.type == 'link') {
				delete characterReferences[index].text_description;
				delete characterReferences[index].image;
			} else if (ref.type == 'text_description') {
				delete characterReferences[index].image;
				delete characterReferences[index].link;
			}
		});

		//1: create order in database, then
		//2: loop through list of references, create then assign to order. once done, then
		//3: loop through list of selected options, assign them to order.

		const orderResponse = await fetch('https://api.scuzzyfox.com/commissions/orders/', {
			method: 'POST',
			headers: {
				Authorization: 'Poken ' + DJANGO_API_TOKEN
			},
			body: OrderFD
		});

		if (orderResponse.ok) {
			let createdOrder: CommissionOrder = await orderResponse.json();
			if (createdOrder.id) {
				let referenceResponses: any[] = [];

				for (const ref of characterReferences) {
					const refFd = new FormData();
					refFd.append('character_name', ref.character_name);
					//@ts-expect-error
					refFd.append('order', createdOrder.id);
					//@ts-expect-error
					refFd.append('adult', ref.adult);
					//@ts-expect-error
					refFd.append('abdl', ref.abdl);
					if (ref.text_description) {
						refFd.append('text_description', ref.text_description);
					} else if (ref.link) {
						refFd.append('link', ref.link);
					} else if (ref.image) {
						refFd.append('image', ref.image);
					}
					const refResponse = await fetch('https://api.scuzzyfox.com/commissions/characters/', {
						method: 'POST',
						headers: {
							Authorization: 'Poken ' + DJANGO_API_TOKEN
						},
						body: refFd
					});
					referenceResponses.push(refResponse);

					//if response isn't okay, delete the order and return error.
					if (!refResponse.ok) {
						if (createdOrder.id) {
							deleteOrder(createdOrder.id);
						}

						return {
							notifications: [
								{
									type: 'error',
									message:
										'One of the character references failed to post. As a result, your order did not go through. You are welcome to try again or contact scuzzy for help. Error code: ' +
										refResponse.status
								}
							]
						};
					}
				}
				//if not all responses are ok, delete the order and return error
				if (
					!referenceResponses.every((res) => {
						return res.ok;
					})
				) {
					if (createdOrder.id) {
						deleteOrder(createdOrder.id);
					}

					return {
						notifications: [
							{
								type: 'error',
								message:
									'Not all of your character references posted. As a result, your order did not go through. You are welcome to try again or contact scuzzy for help.'
							}
						]
					};
				} //endif

				let optionsResponses: any[] = [];

				for (const opt of selectedOptions) {
					const optResponse = await fetch(
						`https://api.scuzzyfox.com/commissions/orders/option/${createdOrder.id}/${opt}/`,
						{
							method: 'POST',
							headers: {
								Authorization: 'Poken ' + DJANGO_API_TOKEN
							}
						}
					);
					optionsResponses.push(optResponse);
					//if post didn't succeed, delete order and return error
					if (!optResponse.ok) {
						if (createdOrder.id) {
							deleteOrder(createdOrder.id);
						}

						return {
							notifications: [
								{
									type: 'error',
									message:
										'One of your selected options failed to attach to your order. As a result, your order did not go through. You are welcome to try again or contact scuzzy for help. Error code: ' +
										optResponse.status
								}
							]
						};
					}
				}

				//if not all responses are ok, delete the order and return error
				if (
					!optionsResponses.every((res) => {
						return res.ok;
					})
				) {
					if (createdOrder.id) {
						deleteOrder(createdOrder.id);
					}

					return {
						notifications: [
							{
								type: 'error',
								message:
									'Not all of your selected options attached to your order. As a result, your order did not go through. You are welcome to try again or contact scuzzy for help.'
							}
						]
					};
				} //endif

				//if all's good, then return success notifications!
				notifyScuzzyOfNewOrder(createdOrder, scuzzyChatId);
				return {
					notifications: [
						{
							type: 'success',
							message:
								'Your commission request has been submitted! You can see it at ' +
								viewOrdersUrl +
								createdOrder.id +
								'.  ' +
								'Scuzzy will reach out if your commission has been approved. You might get an invoice with the final price or Scuzzy will talk to you about the final price. If you have any questions, please reach out!'
						},
						{
							type: 'success',
							message: 'All character references posted.'
						},
						{
							type: 'success',
							message: 'All selected options posted.'
						},
						{
							type: 'info',
							message:
								'YOUR ORDER NUMBER IS: ' +
								createdOrder.id +
								'. PLEASE KEEP THIS NUMBER HANDY JUST IN CASE. '
						}
					]
				};
			} else {
				return {
					notifications: [
						{
							type: 'error',
							message:
								'Somehow no order ID is available even though the server returned an OK status. Please reach out to scuzzy or try again.'
						}
					]
				};
			}
		} else if (orderResponse.status == 403) {
			//permissions failure
			return {
				notifications: [
					{
						type: 'error',
						message:
							"Authorization failed. Backend error. Sorry, your commission didn't go through! try again or contact scuzzy for help."
					}
				]
			};
		} else {
			//unknown failure
			return {
				notifications: [
					{
						type: 'error',
						message:
							'An unexpected error occurred. Commission did not go through. Please try again later or contact scuzzy for help.'
					}
				]
			};
		}
	}
};

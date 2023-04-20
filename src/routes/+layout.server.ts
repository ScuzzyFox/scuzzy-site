import { getSiteStatus } from '$lib/apis/site-status-api';

export async function load(event) {
	let status = await getJustSiteStatus(event.url.hostname)

	return {
		//locals is coming from either hooks or form actions.
		//accessible in pages by data.userSettings.xxx
		userSettings: event.locals.userSettings,
		admin: event.locals.admin,
		status: status


	};
}

async function getJustSiteStatus(hostname:any){
	let fullStatus = await getSiteStatus(hostname);

	return {
		store_open: fullStatus.store_open,
		commissions_open: fullStatus.commissions_open,
		requests_open: fullStatus.requests_open,
		art_trades_open: fullStatus.art_trades_open
	};
}
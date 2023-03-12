import type { PageServerLoad } from './$types';
import showdown from 'showdown';

import siteTosRaw from '$lib/markdown/siteTos.md?raw';
import commissionTosRaw from '$lib/markdown/commissionTos.md?raw';
import FAQRaw from '$lib/markdown/FAQ.md?raw';
import willNotDrawRaw from '$lib/markdown/willNotDraw.md?raw';
const converter = new showdown.Converter();

export const load = (async ({ params }) => {
	let siteTosHtml = converter.makeHtml(siteTosRaw);
	let commissionTosHtml = converter.makeHtml(commissionTosRaw);
	let FAQHtml = converter.makeHtml(FAQRaw);
	let willNotDrawHtml = converter.makeHtml(willNotDrawRaw);

	//data for tos page (html made from markdown files)
	return {
		siteTosHtml,
		commissionTosHtml,
		FAQHtml,
		willNotDrawHtml
	};
}) satisfies PageServerLoad;

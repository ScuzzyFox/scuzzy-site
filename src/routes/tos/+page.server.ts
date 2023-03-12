import type { PageServerLoad } from './$types';
import { readFile } from 'fs/promises';
import showdown from 'showdown';

//should probably use the import file from "$lib/markdown/siteTos.md?raw" pattern here!!!!!!!!
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

//reads data from file
async function content(path: any) {
	return await readFile(path, 'utf8');
}

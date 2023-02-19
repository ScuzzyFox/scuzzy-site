import type { PageServerLoad } from './$types';
import { readFile } from 'fs/promises';
import showdown from 'showdown';
const converter = new showdown.Converter();
let initPath: string = './static/';

export const load = (async ({ params }) => {
	let siteTosHtml: string = converter.makeHtml(await content(initPath + 'siteTos.md'));
	let commissionTosHtml: string = converter.makeHtml(await content(initPath + 'commissionTos.md'));
	let FAQHtml: string = converter.makeHtml(await content(initPath + 'FAQ.md'));
	let willNotDrawHtml: string = converter.makeHtml(await content(initPath + 'willNotDraw.md'));

	//data for tos page (html made from markdown files)
	return {
		siteTosHtml,
		commissionTosHtml,
		FAQHtml,
		willNotDrawHtml
	};
}) satisfies PageServerLoad;

//reads data from file
async function content(path: string) {
	return await readFile(path, 'utf8');
}

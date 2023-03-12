import type { PageServerLoad } from './$types';
import { readFile } from 'fs/promises';
import showdown from 'showdown';
const converter = new showdown.Converter();
let initPath: string = './static/';

export const load = (async ({ params }) => {
	let siteTosHtml, commissionTosHtml, FAQHtml, willNotDrawHtml;
	try {
		siteTosHtml = converter.makeHtml(await content(initPath + 'siteTos.md'));
		commissionTosHtml = converter.makeHtml(await content(initPath + 'commissionTos.md'));
		FAQHtml = converter.makeHtml(await content(initPath + 'FAQ.md'));
		willNotDrawHtml = converter.makeHtml(await content(initPath + 'willNotDraw.md'));
		console.log(__dirname);
	} catch (e) {
		siteTosHtml = `<p>file not found.</p>`;
		commissionTosHtml = '<p>file not found.</p>';
		FAQHtml = '<p>file not found.</p>';
		willNotDrawHtml = `<p>file not found.</p>`;
	}

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

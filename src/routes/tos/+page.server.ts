import type { PageServerLoad } from './$types';
import { readFile } from 'fs/promises';
import showdown from 'showdown';
const converter = new showdown.Converter();

import path from 'path';

export const load = (async ({ params }) => {
	let initPath: any = path.join(process.cwd(), 'static/');
	let siteTosHtml, commissionTosHtml, FAQHtml, willNotDrawHtml;
	try {
		siteTosHtml = converter.makeHtml(await content(initPath + 'siteTos.md'));
		commissionTosHtml = converter.makeHtml(await content(initPath + 'commissionTos.md'));
		FAQHtml = converter.makeHtml(await content(initPath + 'FAQ.md'));
		willNotDrawHtml = converter.makeHtml(await content(initPath + 'willNotDraw.md'));
	} catch (e) {
		siteTosHtml = `<p>file not found:${e} </p>`;
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
async function content(path: any) {
	return await readFile(path, 'utf8');
}

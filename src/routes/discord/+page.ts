import { redirect } from '@sveltejs/kit';

export async function load() {
	throw redirect(301, 'https://discord.gg/hE5w9SzSVw');
}

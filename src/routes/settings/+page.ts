import { redirect } from '@sveltejs/kit';

//locals wasn't accessible here, so had to use parent()
export async function load({ parent }: { parent: Function }) {
	let { userSettings } = await parent();
	if (!userSettings) {
		throw redirect(307, '/');
	}
}

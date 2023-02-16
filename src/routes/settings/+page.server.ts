import { redirect } from '@sveltejs/kit';

export async function load({ locals }: { locals: any }) {
	if (!locals.userSettings.adultAgreed) {
		throw redirect(307, '/');
	}

	return {
		userSettings: locals.userSettings
	};
}

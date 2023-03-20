import { redirect } from '@sveltejs/kit';

export async function load({ locals }: { locals: any }) {
	//if NOT logged in
	if (!locals.admin.loggedIn) {
		//then redirect to login
		throw redirect(307, 'login/');
	}
}

export const actions = {
	logout: async (event) => {
		let fd = await event.request.formData();
		event.cookies.delete('admin');
		event.locals.admin = {
			username: undefined!,
			email: undefined!,
			token: undefined!,
			loggedIn: false
		};

		//using 303 here prevents a 405 error when redirecting (looks like svelte is trying to forward the form data to the new resource when 307 is used).
		throw redirect(303, String(fd.get('currentUrl')));
	}
};

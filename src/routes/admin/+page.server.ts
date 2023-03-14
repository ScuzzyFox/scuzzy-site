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
		console.log('logging out...');
		event.cookies.delete('admin');
		event.locals.admin = {
			username: undefined!,
			email: undefined!,
			token: undefined!,
			loggedIn: false
		};

		throw redirect(307, 'login/');
	}
};

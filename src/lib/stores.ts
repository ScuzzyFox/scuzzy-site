import { writable } from 'svelte/store';

export const userSettingsStore = writable({
	adultAgreed: false,
	nsfwAllowed: false,
	abdlAllowed: false
});

export const adminStore = writable({
	username: '',
	email: '',
	loggedIn: false,
	token: ''
});

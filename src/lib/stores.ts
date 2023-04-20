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

export const statusStore = writable({
	store_open: false,
	commissions_open: false,
	requests_open: false,
	art_trades_open: false
})
import { writable } from 'svelte/store';

export const userSettingsStore = writable({
	adultAgreed: false,
	nsfwAllowed: false,
	abdlAllowed: false
});

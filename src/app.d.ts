// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { UserSettings } from '$lib/UserSettings';
import type { Admin } from '$lib/Admin';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userSettings: UserSettings;
			admin: Admin;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

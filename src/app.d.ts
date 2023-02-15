// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { UserSettings } from '/UserSettings';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userSettings: UserSettings;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

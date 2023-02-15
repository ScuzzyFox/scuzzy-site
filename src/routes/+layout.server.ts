import type { UserSettings } from '$lib/UserSettings';

export function load({ locals }: { locals: any }) {
	return {
		//accessible in pages by data.userSettings.xxx
		userSettings: locals.userSettings
	};
}

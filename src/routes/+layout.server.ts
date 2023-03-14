import type { UserSettings } from '$lib/UserSettings';
import { USER_SETTINGS_SECRET } from '$env/static/private';
import * as jose from 'jose';
import type { RequestEvent } from './$types';

export function load({ locals }: { locals: any }) {
	return {
		//locals is coming from either hooks or form actions.
		//accessible in pages by data.userSettings.xxx
		userSettings: locals.userSettings,
		admin: locals.admin
	};
}

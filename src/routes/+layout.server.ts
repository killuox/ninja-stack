import type { LayoutServerLoad } from './$types';
import { loadTranslations } from '$lib/locales';
import { locale } from '$lib/locales';

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies, event }) => {
	const { pathname } = event.url;
	const { session, user } = await safeGetSession();
	const userLocale = user?.language;
	// set locale
	const localeCookie = event.cookies.get('lang') || 'en';
	const localeToSet = userLocale || localeCookie;

	locale.set(localeToSet);

	await loadTranslations(localeToSet, pathname); // keep this just before the `return`

	return {
		session,
		user,
		cookies: cookies.getAll()
	};
};

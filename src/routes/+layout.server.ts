import type { LayoutServerLoad } from './$types';
import { loadTranslations } from '$lib/locales';
import { locale } from '$lib/locales';

export const load: LayoutServerLoad = async (event) => {
	const { pathname } = event.url;
	const userLocale = event.locals.user?.language;
	// set locale
	const localeCookie = event.cookies.get('lang') || 'en';
	const localeToSet = userLocale || localeCookie;

	locale.set(localeToSet);

	await loadTranslations(localeToSet, pathname); // keep this just before the `return`

	return {
		session: event.locals.session,
		user: event.locals.user
	};
};

import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { loadTranslations, locale } from '$lib/locales';

export const load: LayoutLoad = async (event) => {
	const { pathname } = event.url;
	const user = event.data.user;
	let defaultLocale = 'en';

	// get browser locale
	if (browser) {
		const browserLocale = navigator.language.split('-')[0];

		// set cookie
		document.cookie = `lang=${browserLocale}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

		defaultLocale = browserLocale;
	}

	const initLocale = locale.get() || user?.language || defaultLocale;

	await loadTranslations(initLocale, pathname);

	return {
		lang: initLocale
	};
};

import type { LayoutServerLoad } from './$types';
import { loadTranslations } from '$lib/locales';

export const load: LayoutServerLoad = async (event) => {
	const { pathname } = event.url;

	const initLocale = 'en'; // get from cookie, user session, ...
  
	await loadTranslations(initLocale, pathname); // keep this just before the `return`

	return {
		session: event.locals.session
	};
};
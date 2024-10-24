import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { loadTranslations, locale } from '$lib/locales';
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const load: LayoutLoad = async (event) => {
	const { pathname } = event.url;
	const data = event.data;
	const user = data.user;
	let defaultLocale = 'en';
	event.depends('supabase:auth');

	const supabase = isBrowser()
		? createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				}
			})
		: createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
				global: {
					fetch
				},
				cookies: {
					getAll() {
						return data.cookies;
					}
				}
			});

	/**
	 * It's fine to use `getSession` here, because on the client, `getSession` is
	 * safe, and on the server, it reads `session` from the `LayoutData`, which
	 * safely checked the session using `safeGetSession`.
	 */
	// get browser locale
	const userLanguage = user?.user_metadata.language;
	if (browser) {
		const browserLocale = navigator.language.split('-')[0];
		// set cookie
		document.cookie = `lang=${userLanguage || browserLocale}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

		defaultLocale = browserLocale;
	}
	const initLocale = userLanguage || locale.get() || defaultLocale;

	await loadTranslations(initLocale, pathname);

	return { supabase, session: data.session, lang: initLocale, user: data.user };
};

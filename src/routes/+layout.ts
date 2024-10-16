import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import { loadTranslations, locale } from '$lib/locales';
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async (event) => {
	const { pathname } = event.url;
	const user = event.data.user;
	let defaultLocale = 'en';
	depends('supabase:auth');

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
	const {
		data: { session }
	} = await supabase.auth.getSession();

	// get browser locale
	if (browser) {
		const browserLocale = navigator.language.split('-')[0];

		// set cookie
		document.cookie = `lang=${browserLocale}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

		defaultLocale = browserLocale;
	}

	const initLocale = locale.get() || user?.language || defaultLocale;

	await loadTranslations(initLocale, pathname);

	return { supabase, session, lang: initLocale };
};

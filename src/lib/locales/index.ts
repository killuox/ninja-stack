import i18n from 'sveltekit-i18n';
import type { Parser } from '@sveltekit-i18n/parser-default';
import type { Config } from 'sveltekit-i18n';

export interface Payload extends Parser.PayloadDefault {
	[key: string]: string | Payload
}

/** @type {import('sveltekit-i18n').Config} */
const config: Config = {
	loaders: [
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		},
		{
			locale: 'fr',
			key: 'common',
			loader: async () => (await import('./fr/common.json')).default
		},
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n<
    Parser.Params<Payload>
>(config);
import i18n from 'sveltekit-i18n';
import type { Parser } from '@sveltekit-i18n/parser-default';
import type { Config } from 'sveltekit-i18n';

export interface Payload extends Parser.PayloadDefault {
	[key: string]: string | Payload;
}

/** @type {import('sveltekit-i18n').Config} */
const config: Config = {
	loaders: [
		// ----- ENGLISH -----
		{
			locale: 'en',
			key: 'common',
			loader: async () => (await import('./en/common.json')).default
		},
		{
			locale: 'en',
			key: 'auth',
			loader: async () => (await import('./en/auth.json')).default
		},
		{
			locale: 'en',
			key: 'form',
			loader: async () => (await import('./en/form.json')).default
		},
		{
			locale: 'en',
			key: 'validation',
			loader: async () => (await import('./en/validation.json')).default
		},
		{
			locale: 'en',
			key: 'account',
			loader: async () => (await import('./en/account.json')).default
		},
		// ----- FRENCH -----
		{
			locale: 'fr',
			key: 'common',
			loader: async () => (await import('./fr/common.json')).default
		},
		{
			locale: 'fr',
			key: 'auth',
			loader: async () => (await import('./fr/auth.json')).default
		},
		{
			locale: 'fr',
			key: 'form',
			loader: async () => (await import('./fr/form.json')).default
		},
		{
			locale: 'fr',
			key: 'validation',
			loader: async () => (await import('./fr/validation.json')).default
		},
		{
			locale: 'fr',
			key: 'account',
			loader: async () => (await import('./fr/account.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations } = new i18n<Parser.Params<Payload>>(
	config
);

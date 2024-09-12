import {
	superForm as libSuperForm,
	type FormOptions,
	type SuperValidated
} from 'sveltekit-superforms';
import { t } from '$lib/locales';
import { toast } from 'svelte-sonner';
import { valibot } from 'sveltekit-superforms/adapters';
import { locale } from '$lib/locales';
import type { GenericSchema, GenericSchemaAsync } from 'valibot';
import '@valibot/i18n/fr';

export const superForm = <
	T extends Record<string, unknown> = Record<string, unknown>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	M = any extends never ? any : any,
	In extends Record<string, unknown> = T
>(
	form: SuperValidated<T, M, In> | T,
	formOptions?: FormOptions<T, M, In>
) => {
	return libSuperForm(form, {
		...formOptions,
		onResult: (e) => {
			const { result } = e; 
			const message = result?.data?.form?.message || result?.data?.message

			switch (result.type) {
				case 'success':
					toast.success(message || t.get('common.success.message'));
					break;
				case 'failure':
					toast.error(message || t.get('error_code.TRY_AGAIN'));
					break;
				default:
					return;
			}

			if (formOptions?.onResult) {
				return formOptions.onResult(e);
			}
		}
	});
};

export const adapter = <T extends GenericSchema | GenericSchemaAsync>(schema: T) =>
	valibot(schema, {
		config: {
			lang: locale.get()
		}
	});

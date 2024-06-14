import {
	superForm as libSuperForm,
	type FormOptions,
	type SuperValidated
} from 'sveltekit-superforms';
import { t } from '$lib/locales';
import { toast } from 'svelte-sonner';

// <T extends Record<string, unknown> = Record<string, unknown>, M = App.Superforms.Message extends never ? any : App.Superforms.Message, In extends Record<string, unknown> = T>(form: SuperValidated<T, M, In> | T, formOptions?: FormOptions<T, M, In>): SuperForm<T, M>;
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
			switch (result.type) {
				case 'success':
					toast.success(result?.data?.form.message || t.get('common.success.message'));
					break;
				case 'failure':
					toast.error(result.data?.form.message || t.get('error_code.TRY_AGAIN'));
					break;
				default:
					return;
			}
		}
	});
};

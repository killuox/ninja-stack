<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { type SuperValidated } from 'sveltekit-superforms';
	import { updateUserSchema, type UpdateUserSchema } from '@schemas/user';
	import { t } from '$lib/locales';
	import * as Select from '$lib/components/ui/select';
	import { adapter, superForm } from '@lib/utils/superform';

	export let updateUserForm: SuperValidated<UpdateUserSchema>;
	let languageHasChanged = false;
	const languageOptions = {
		en: $t('common.english'),
		fr: $t('common.french')
	};

	const form = superForm(updateUserForm, {
		validators: adapter(updateUserSchema),
		resetForm: false,
		onResult: () => {
			if (languageHasChanged) {
				location.reload();
			}
			return;
		},
		onChange: () => {
			const initialLanguage = updateUserForm.data.language;
			if ($formData.language !== initialLanguage) {
				languageHasChanged = true;
			} else {
				languageHasChanged = false;
			}
		}
	});
	const { form: formData, enhance } = form;
	$: selectedLanguage = $formData.language
		? {
				label: languageOptions[$formData.language],
				value: $formData.language
			}
		: undefined;
	
</script>

<form method="POST" use:enhance action="?/updateUser">
	<div class="grid gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<Form.Field {form} name="firstName">
				<Form.Control let:attrs>
					<Form.Label>{$t('form.firstName.label')}</Form.Label>
					<Input {...attrs} type="text" bind:value={$formData.firstName} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="lastName">
				<Form.Control let:attrs>
					<Form.Label>{$t('form.lastName.label')}</Form.Label>
					<Input {...attrs} type="text" bind:value={$formData.lastName} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>{$t('form.email.label')}</Form.Label>
					<Input {...attrs} type="email" bind:value={$formData.email} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="language">
				<Form.Control let:attrs>
					<Form.Label>{$t('form.language.label')}</Form.Label>
					<Select.Root
						selected={selectedLanguage}
						onSelectedChange={(v) => {
							v && ($formData.language = v.value);
						}}
					>
						<Select.Trigger {...attrs}>
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="en">{$t('common.english')}</Select.Item>
							<Select.Item value="fr">{$t('common.french')}</Select.Item>
						</Select.Content>
					</Select.Root>
					<input hidden bind:value={$formData.language} name={attrs.name} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<Button type="submit" class="w-full">{$t('common.update')}</Button>
	</div>
</form>

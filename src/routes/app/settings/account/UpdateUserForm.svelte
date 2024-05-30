<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateUserSchema, type UpdateUserSchema } from '@schemas/user';
	import { toast } from 'svelte-sonner';
	import { t } from '$lib/locales';
	import * as Select from '$lib/components/ui/select';

	let { form: formProps, data }: {
		form: SuperValidated<UpdateUserSchema>;
		data: {
			updateUserForm: SuperValidated<UpdateUserSchema>;
		};
	
	} = $props();

	const form = superForm(data.updateUserForm as SuperValidated<UpdateUserSchema>, {
		validators: zodClient(updateUserSchema),
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'error':
					toast.error($t('common.errors.tryAgain'));
					break;
				case 'failure':
					toast.error(result.data?.message || $t('common.errors.tryAgain'));
					break;
				default:
					return;
			}
			return;
		}
	});
	const { form: formData, enhance } = form;
	let selectedLanguage = $derived(
		$formData.language
			? {
					label: $formData.language,
					value: $formData.language
				}
			: undefined
	);
</script>

<form method="POST" use:enhance action="?/updateUser">
	<div class="grid gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<Form.Field {form} name="firstName">
				<Form.Control let:attrs>
					<Form.Label>{$t('form.firstName.label')}</Form.Label>
					<Input type="text" bind:value={$formData.firstName} {...attrs} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="lastName">
				<Form.Control let:attrs>
					<Form.Label>{$t('form.lastName.label')}</Form.Label>
					<Input type="text" bind:value={$formData.lastName} {...attrs} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</div>
		<div class="grid gap-4 md:grid-cols-2">
			<Form.Field {form} name="email">
				<Form.Control let:attrs>
					<Form.Label>{$t('form.email.label')}</Form.Label>
					<Input type="email" bind:value={$formData.email} {...attrs} />
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

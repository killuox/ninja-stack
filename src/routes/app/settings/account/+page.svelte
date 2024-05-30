<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import UpdateUserForm from './UpdateUserForm.svelte';
	import ChangePasswordForm from './ChangePasswordForm.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { type SuperValidated, superForm, type Infer } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateUserSchema, type UpdateUserSchema } from '@schemas/user';
	import { toast } from 'svelte-sonner';
	import { t } from '$lib/locales';
	import * as Select from '$lib/components/ui/select';

	let { data = $bindable() } = $props();
	let {
		form: formProps
	}: {
		form: SuperValidated<Infer<typeof updateUserSchema>>;
	} = data;

	const form = superForm(formProps, {
		validators: zodClient(updateUserSchema),
		onResult: ({ result }) => {
			console.log(result);
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

<Card.Root class="m-4 w-full max-w-xl md:mx-auto md:w-3/4">
	<Card.Header>
		<Card.Title>{$t('auth.account.label')}</Card.Title>
		<Card.Description>{$t('auth.account.description')}</Card.Description>
	</Card.Header>
	<Card.Content>
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
	</Card.Content>
</Card.Root>
<Card.Root class="m-4 w-full max-w-xl md:mx-auto md:w-3/4">
	<Card.Header>
		<Card.Title>{$t('auth.passwordChange.label')}</Card.Title>
		<Card.Description>{$t('auth.passwordChange.description')}</Card.Description>
	</Card.Header>
	<Card.Content>
		<ChangePasswordForm form={data.changePasswordForm} />
	</Card.Content>
</Card.Root>

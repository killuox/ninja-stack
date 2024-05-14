<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerUserSchema, type RegisterUserSchema } from '@schemas/user';
	import { toast } from 'svelte-sonner';
	import { t } from '$lib/locales';
	import * as Select from '$lib/components/ui/select';

	let { data } = $props();

	const { form: formProps } = data;

	const form = superForm(formProps as SuperValidated<RegisterUserSchema>, {
		validators: zodClient(registerUserSchema),
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
		$formData.email
			? {
					label: $formData.language,
					value: $formData.language
				}
			: undefined
	);
</script>

<Card.Root class="m-4 w-full max-w-4xl md:mx-auto md:w-3/4">
	<Card.Header>
		<Card.Title>{$t('auth.account.label')}</Card.Title>
		<Card.Description>{$t('auth.account.description')}</Card.Description>
	</Card.Header>
	<Card.Content>
		<form method="POST" use:enhance>
			<div class="grid gap-4">
				<div class="grid grid-cols-2 gap-4">
					<Form.Field {form} name="firstName">
						<Form.Control let:attrs>
							<Form.Label>{$t('form.first_name.label')}</Form.Label>
							<Input type="text" bind:value={$formData.firstName} {...attrs} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="lastName">
						<Form.Control let:attrs>
							<Form.Label>{$t('form.last_name.label')}</Form.Label>
							<Input type="text" bind:value={$formData.lastName} {...attrs} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid grid-cols-2 gap-4">
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

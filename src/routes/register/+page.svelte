<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import AuthLayout from '@components/layout/AuthLayout.svelte';
	import { registerUserSchema } from '@schemas/user';
	import { t } from '$lib/locales';
	import { adapter, superForm } from '@lib/utils/superform';

	let { data } = $props();
	const { form: formProps } = data;

	const form = superForm(formProps, {
		validators: adapter(registerUserSchema),
		resetForm: true
	});

	const { form: formData, enhance } = form;
</script>

<AuthLayout>
	<Card.Root>
		<Card.Header>
			<Card.Title class="text-xl">{$t('auth.register.label')}</Card.Title>
			<Card.Description>{$t('auth.register.description')}</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<div class="grid gap-4">
					<div class="grid grid-cols-2 gap-4">
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
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>{$t('form.email.label')}</Form.Label>
							<Input type="email" bind:value={$formData.email} {...attrs} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<Form.Label>{$t('form.password.label')}</Form.Label>
							<Input type="password" bind:value={$formData.password} {...attrs} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="passwordConfirm">
						<Form.Control let:attrs>
							<Form.Label>{$t('form.passwordConfirm.label')}</Form.Label>
							<Input type="password" bind:value={$formData.passwordConfirm} {...attrs} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Button type="submit" class="w-full">{$t('auth.register.action')}</Button>
				</div>
				<div class="mt-4 text-center text-sm">
					{$t('account.exist.question')}
					<a href="/login" class="underline"> {$t('auth.login.label')} </a>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</AuthLayout>

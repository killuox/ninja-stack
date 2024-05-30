<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import AuthLayout from '@components/layout/AuthLayout.svelte';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginUserSchema, type LoginUserSchema } from '@schemas/user';
	import { toast } from 'svelte-sonner';
	import { t } from '$lib/locales';

	export let data;
	const { form: formProps } = data;

	const form = superForm(formProps as SuperValidated<LoginUserSchema>, {
		validators: zodClient(loginUserSchema),
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
</script>

<AuthLayout>
	<Card.Root class="min-w-96">
		<Card.Header>
			<Card.Title class="text-xl">{$t('auth.login.label')}</Card.Title>
			<Card.Description>{$t('auth.login.description')}</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<div class="grid gap-4">
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
					<Button type="submit" class="w-full">{$t('auth.login.label')}</Button>
				</div>
				<div class="mt-4 text-center text-sm">
					{$t('account.empty.question')} <a href="/register" class="underline"> {$t('auth.register.label')} </a>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</AuthLayout>

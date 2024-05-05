<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';

	import AuthLayout from '@components/layout/AuthLayout.svelte';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { registerUserSchema, type RegisterUserSchema } from '@schemas/user';
	import { toast } from 'svelte-sonner';
	let { data } = $props();
	const { form: formProps } = data;

	const form = superForm(formProps as SuperValidated<RegisterUserSchema>, {
		validators: zodClient(registerUserSchema),
		resetForm: true,
		onResult: ({ result }) => {
			switch (result.type) {
				case 'success':
					toast.success('Account created successfully');
					break;
				case 'error':
					toast.error('An error occurred, please try again later');
					break;
				case 'failure':
					toast.error(result.data?.message || 'An error occurred, please try again later');
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
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Sign Up</Card.Title>
			<Card.Description>Enter your information to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" use:enhance>
				<div class="grid gap-4">
					<div class="grid grid-cols-2 gap-4">
						<Form.Field {form} name="first_name">
							<Form.Control let:attrs>
								<Form.Label>First name</Form.Label>
								<Input type="text" bind:value={$formData.first_name} {...attrs} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
						<Form.Field {form} name="last_name">
							<Form.Control let:attrs>
								<Form.Label>Last name</Form.Label>
								<Input type="text" bind:value={$formData.last_name} {...attrs} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input type="email" bind:value={$formData.email} {...attrs} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<Form.Label>Password</Form.Label>
							<Input type="password" bind:value={$formData.password} {...attrs} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="passwordConfirm">
						<Form.Control let:attrs>
							<Form.Label>Confirm Password</Form.Label>
							<Input type="password" bind:value={$formData.passwordConfirm} {...attrs} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Button type="submit" class="w-full">Create an account</Button>
				</div>
				<div class="mt-4 text-center text-sm">
					Already have an account?
					<a href="/login" class="underline"> Log in </a>
				</div>
			</form>
		</Card.Content>
	</Card.Root>
</AuthLayout>

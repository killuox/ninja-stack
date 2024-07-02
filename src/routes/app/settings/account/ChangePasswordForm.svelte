<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form';
	import { type SuperValidated } from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { changePasswordSchema, type ChangePasswordSchema } from '@schemas/user';
	import { t } from '$lib/locales';
	import { superForm } from '@lib/utils/superform';
	export let changePasswordForm: SuperValidated<ChangePasswordSchema>;

	const form = superForm(changePasswordForm, {
		validators: valibotClient(changePasswordSchema),
		resetForm: true
	});
	const { form: formData, enhance } = form;

</script>

<form method="POST" use:enhance action="?/changePassword">
	<div class="grid gap-4">
		<div class="grid gap-4 md:grid-cols-2">
			<Form.Field {form} name="currentPassword">
				<Form.Control let:attrs>
					<Form.Label>{$t('form.currentPassword.label')}</Form.Label>
					<Input type="password" bind:value={$formData.currentPassword} {...attrs} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<div class="flex-col md:flex">
				<Form.Field {form} name="newPassword">
					<Form.Control let:attrs>
						<Form.Label>{$t('form.newPassword.label')}</Form.Label>
						<Input type="password" bind:value={$formData.newPassword} {...attrs} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="newPasswordConfirm">
					<Form.Control let:attrs>
						<Form.Label>{$t('form.newPasswordConfirm.label')}</Form.Label>
						<Input type="password" bind:value={$formData.newPasswordConfirm} {...attrs} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
		</div>
		<Button type="submit" class="w-full">{$t('common.changePassword')}</Button>
	</div>
</form>

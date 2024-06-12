<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import UpdateUserForm from './UpdateUserForm.svelte';
	import ChangePasswordForm from './ChangePasswordForm.svelte';
	import { t } from '$lib/locales';
	import type { PageData } from "./$types.js";
	export let data: PageData;
</script>

<Card.Root class="m-4 w-full max-w-xl md:mx-auto md:w-3/4">
	<Card.Header>
		<Card.Title>{$t('auth.account.label')}</Card.Title>
		<Card.Description>{$t('auth.account.description')}</Card.Description>
	</Card.Header>
	<Card.Content>
		<UpdateUserForm updateUserForm={data.updateUserForm} />
	</Card.Content>
</Card.Root>
<Card.Root class="m-4 w-full max-w-xl md:mx-auto md:w-3/4">
	<Card.Header>
		<Card.Title>{$t('auth.passwordChange.label')}</Card.Title>
		<Card.Description>{$t('auth.passwordChange.description')}</Card.Description>
	</Card.Header>
	<Card.Content>
		<ChangePasswordForm changePasswordForm={data.changePasswordForm} />
	</Card.Content>
</Card.Root>

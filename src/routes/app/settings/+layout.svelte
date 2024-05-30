<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { t } from '$lib/locales';
	import { User, Users } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	function handleTabChange(value: string) {
		goto(`/app/settings/${value}`);
	}
</script>

<div class="mx-2 flex w-full flex-col items-center justify-center">
	<Tabs.Root value="account">
		<Tabs.List>
			<Tabs.Trigger value="account" on:click={() => handleTabChange('account')}>
				<User class="mr-2 h-4 w-4" />
				<span>{$t('auth.account.label')}</span>
			</Tabs.Trigger>
			<Tabs.Trigger value="users" on:click={() => handleTabChange('users')}>
				<Users class="mr-2 h-4 w-4" />
				<span>{$t('common.user.many.label')}</span>
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
	<slot />
</div>

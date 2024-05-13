<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { t } from '$lib/locales';
	import { User, Users, Briefcase } from 'lucide-svelte';
	import { goto } from '$app/navigation';
	let { children } = $props();

    function handleTabChange(value: string) {
        goto(`/app/settings/${value}`);
    }
</script>

<div class="flex w-full flex-col items-center justify-center">
	<Tabs.Root value="account" class="w-[400px]">
		<Tabs.List>
			<Tabs.Trigger value="account" onclick={() => handleTabChange('account')}>
				<Briefcase class="mr-2 h-4 w-4" />
				<span>{$t('auth.account.label')}</span>
			</Tabs.Trigger>
			<Tabs.Trigger value="profile" onclick={() => handleTabChange('profile')}>
				<User class="mr-2 h-4 w-4" />
				<span>{$t('account.profile.label')}</span>
			</Tabs.Trigger>
			<Tabs.Trigger value="users" onclick={() => handleTabChange('users')}>
				<Users class="mr-2 h-4 w-4" />
				<span>{$t('common.user.many.label')}</span>
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
	{@render children()}
</div>

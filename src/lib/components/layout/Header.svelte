<script lang="ts">
	import { PanelLeft, LineChart } from 'lucide-svelte';

	import { Button } from '@components/ui/button/index.js';
	import * as DropdownMenu from '@components/ui/dropdown-menu/index.js';
	import * as Sheet from '@components/ui/sheet/index.js';
	import Breadcrumb from '@components/layout/Breadcrumb.svelte';
	import { appRoutes } from '@configs/routes.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import type { SanitizedUser } from '@lib/schemas/user';

	let {
		user
	}: {
		user: SanitizedUser;
	} = $props();

	const userInitials = $derived(user.first_name[0] + user.last_name[0]);
</script>

<header
	class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
				<PanelLeft class="h-5 w-5" />
				<span class="sr-only">Toggle Menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left" class="sm:max-w-xs">
			<nav class="grid gap-6 text-lg font-medium">
				{#each appRoutes as route}
					<a
						href={route.path}
						class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
					>
						<svelte:component this={route.icon} class="h-5 w-5" />
						{route.label}
					</a>
				{/each}
				<a
					href="/app/settings"
					class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				>
					<LineChart class="h-5 w-5" />
					Settings
				</a>
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<Breadcrumb />
	<div class="ml-auto">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					variant="outline"
					size="icon"
					class="overflow-hidden rounded-full"
					builders={[builder]}
				>
					<Avatar.Root class="h-8 w-8 uppercase">
						<Avatar.Fallback>{userInitials}</Avatar.Fallback>
					</Avatar.Root>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Item>Support</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<form action="/logout" method="POST">
						<button type="submit">Logout</button>
					</form>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>

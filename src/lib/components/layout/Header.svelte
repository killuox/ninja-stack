<script lang="ts">
	import {
		PanelLeft,
		UsersRound,
		ShoppingCart,
		Package,
		Package2,
		LineChart,
		Home
	} from 'lucide-svelte';

	import { Button } from '@components/ui/button/index.js';
	import * as DropdownMenu from '@components/ui/dropdown-menu/index.js';
	import * as Sheet from '@components/ui/sheet/index.js';
	import Breadcrumb from '@components/layout/Breadcrumb.svelte';
	import { appRoutes } from '@configs/routes.js';
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
					<img
						src="/images/placeholder-user.jpg"
						width={36}
						height={36}
						alt="Avatar"
						class="overflow-hidden rounded-full"
					/>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Item>Support</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Logout</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</header>

<script lang="ts">
	import Home from 'lucide-svelte/icons/home';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import UsersRound from 'lucide-svelte/icons/users-round';

	import * as Tooltip from '@components/ui/tooltip/index.js';
	import { appRoutes } from '@configs/routes.js';
	import { page } from '$app/stores';
</script>

<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
	<nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
		<a
			href="##"
			class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
		>
			<Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
			<span class="sr-only">Acme Inc</span>
		</a>

		<Tooltip.Root>
			{#each appRoutes as route}
				<Tooltip.Trigger asChild let:builder>
					<a
						href={route.path}
						class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 {$page
							.url.pathname === route.path
							? 'bg-accent text-accent-foreground'
							: 'text-muted-foreground'}"
						use:builder.action
						{...builder}
					>
						<svelte:component this={route.icon} class="h-5 w-5" />
						<span class="sr-only">{route.label}</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">{route.label}</Tooltip.Content>
			{/each}
		</Tooltip.Root>
	</nav>
	<nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					href="/app/settings"
					class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8 {$page
						.url.pathname === '/app/settings'
						? 'bg-accent text-accent-foreground'
						: 'text-muted-foreground'}"
					use:builder.action
					{...builder}
				>
					<Settings class="h-5 w-5" />
					<span class="sr-only">Settings</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Settings</Tooltip.Content>
		</Tooltip.Root>
	</nav>
</aside>

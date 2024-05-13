<script lang="ts">
	import Aside from '@components/layout/Aside.svelte';
	import Header from '@components/layout/Header.svelte';
	let { children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
	<Aside />
	<div class="flex flex-col h-full sm:gap-4 sm:py-4 sm:pl-14">
		<Header />
		<main
			class="flex h-full w-full"
		>
			{@render children()}
		</main>
	</div>
</div>

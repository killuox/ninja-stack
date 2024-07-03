<script lang="ts">
	import Aside from '@components/layout/Aside.svelte';
	import Header from '@components/layout/Header.svelte';
	let { data, children } = $props();
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
	<Aside />
	<div class="flex h-full flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<Header user={data.user} />
		<main class="flex h-full w-full">
			{@render children()}
		</main>
	</div>
</div>

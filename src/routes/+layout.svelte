<script lang="ts">
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import type { Snippet } from 'svelte';
	import { ENV } from '$lib/server/env';
	import { setupConvex } from 'convex-svelte';
	setupConvex(ENV.CONVEX_URL);
	let {
		children
	}: {
		children: Snippet;
	} = $props();
</script>

<Toaster />
{@render children()}

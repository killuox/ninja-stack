<script>
	import { t } from '$lib/locales';
	let { data } = $props();

	const pageName = 'Home';
</script>

<div class="flex items-center space-x-4">
	<a href="/register">Register</a>

	{#if data.session}
		<a class="ml-10" href="/app">App</a>
	{:else}
		<a class="ml-10" href="/login">Login</a>
	{/if}
</div>

<div>
	<!-- you can use `placeholders` and `modifiers` in your definitions (see docs) -->
	<h2>{$t('common.page', { pageName })}</h2>
</div>

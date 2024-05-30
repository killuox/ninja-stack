<script>
	export let data;
</script>

<div class="flex items-center space-x-4">
	<a href="/register">Register</a>

	{#if data.session}
		<a class="ml-10" href="/app">App</a>
	{:else}
		<a class="ml-10" href="/login">Login</a>
	{/if}
</div>

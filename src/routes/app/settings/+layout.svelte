<script lang="ts">
	let { children } = $props();
</script>

<div class="mx-2 flex w-full flex-col items-center justify-center">
	{@render children()}
</div>

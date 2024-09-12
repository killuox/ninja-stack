<script>
	import { Button, Hr, Html, Text } from 'svelty-email';

	const { name } = $props();
</script>

<Html lang="en">
	<Text>
		Hello, {name}!
	</Text>
	<Hr />
	<Button href="https://svelte.dev">Visit Svelte</Button>
</Html>

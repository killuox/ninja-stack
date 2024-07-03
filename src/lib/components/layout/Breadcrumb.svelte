<script lang="ts">
	import * as Breadcrumb from '@components/ui/breadcrumb/index.js';
	import { page } from '$app/stores';

	const paths = $derived($page.url.pathname.split('/').filter(Boolean));
</script>

<Breadcrumb.Root class="hidden md:flex">
	<Breadcrumb.List class="capitalize">
		{#each paths as path, i (path)}
			{#if i === 0}
				<Breadcrumb.Item>
					<Breadcrumb.Link href="/app">{path}</Breadcrumb.Link>
				</Breadcrumb.Item>
			{:else if i !== paths.length - 1}
				<Breadcrumb.Item>
					<Breadcrumb.Link href={'/' + paths.slice(0, i + 1).join('/')}>{path}</Breadcrumb.Link>
				</Breadcrumb.Item>
			{:else}
				<Breadcrumb.Item>
					<Breadcrumb.Page>{path}</Breadcrumb.Page>
				</Breadcrumb.Item>
			{/if}
			{#if i !== paths.length - 1}
				<Breadcrumb.Separator />
			{/if}
		{/each}
	</Breadcrumb.List>
</Breadcrumb.Root>

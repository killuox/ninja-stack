<script lang="ts">
	import * as Card from '$lib/components/ui/card';
    import { t } from '$lib/locales';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{$t('auth.user.many.label')}</Card.Title>
		<Card.Description>{$t('auth.user.many.description')}</Card.Description>
	</Card.Header>
	<Card.Content>
		users form here
	</Card.Content>
</Card.Root>
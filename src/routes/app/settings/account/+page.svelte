<script lang="ts">
	import * as Card from '$lib/components/ui/card';
    import { t } from '$lib/locales';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{$t('auth.account.label')}</Card.Title>
		<Card.Description>{$t('auth.account.description')}</Card.Description>
	</Card.Header>
	<Card.Content>
		account form here
	</Card.Content>
</Card.Root>
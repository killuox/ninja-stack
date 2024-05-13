<script lang="ts">
	import * as Card from '$lib/components/ui/card';
    import { t } from '$lib/locales';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{$t('auth.profile.label')}</Card.Title>
		<Card.Description>{$t('auth.profile.description')}</Card.Description>
	</Card.Header>
	<Card.Content>
		profile form here
	</Card.Content>
</Card.Root>
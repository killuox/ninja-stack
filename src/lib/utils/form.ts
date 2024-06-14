import { t } from '$lib/locales';

export const displayToastResult = async (result: ActionResult) => {
    switch (result.type) {
        case 'error':
            toast.error(t.get(result.data?.message) || t('common.errors.tryAgain'));
            break;
        case 'failure':
            toast.error($t(result.data?.message) || $t('common.errors.tryAgain'));
            break;
        default:
            return;
    }
    return;
}
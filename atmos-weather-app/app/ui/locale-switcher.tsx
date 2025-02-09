import {useLocale, useTranslations} from 'next-intl';
import LocaleSwitcherSelect from "./locale-switcher-select";

export default async function LocaleSwitcher() {

    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect
            defaultValue={locale}
            items={[
                {
                value: 'en',
                label: t('en')
                },
                {
                value: 'de',
                label: t('de')
                }
            ]}
            label={t('label')}
        />
    )
}
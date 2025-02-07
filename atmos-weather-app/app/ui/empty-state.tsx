import { useTranslations } from "next-intl"

export default function EmptyState() {

    const t = useTranslations('empty');

    return (
        <div className="bg-freshAir w-[80%] h-[100%] text-center py-8 px-8 rounded-xl mx-auto">
            <h2>{t('header')}</h2>
            <p>{t('paragraph')}</p>
        </div>
    )
}
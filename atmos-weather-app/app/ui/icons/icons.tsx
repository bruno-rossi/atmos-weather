import Image from "next/image";
import { WeatherCondition } from "@/app/lib/definitions";
import { useTranslations } from "next-intl";

export function Logo() {

    const t = useTranslations('logo');

    return (
        <div className="flex items-center gap-4">
            <Image 
                src="/Partly-cloudy.svg"
                width={80}
                height={80}
                alt={t('app_logo_alt_text')}
            />
            <h1 className="text-2xl font-bold max-w-[90px]">{t('app_name')}</h1>
        </div>
    )
}

export function SettingsIcon() {

    const t = useTranslations('icons');

    return (
        <Image 
            src="/cog-settings.svg"
            width={40}
            height={40}
            alt={t('settings_icon_alt_text')}
        />
    )
}

export function WeatherIcon({condition}: WeatherCondition) {

    const t = useTranslations('icons');

    return (
        <Image
            src={`/${condition.code}.svg`}
            width={40}
            height={40}
            alt={t('weather_icon_alt_text', {label: condition.label})}
        />
    )
}
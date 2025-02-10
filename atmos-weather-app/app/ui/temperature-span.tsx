'use client'

import { useTranslations } from "next-intl"

export default function TemperatureSpan({ temperatureUnit, temperatureAmount}: { temperatureUnit: "celsius" | "fahrenheit", temperatureAmount: number}) {

    const t = useTranslations('temperature');

    const displayTemperature = t('display_text', {unit: temperatureUnit, amount: temperatureAmount} )
    
    return (
        <span className="col-span-1 text-3xl text-center border">
            {displayTemperature}
        </span>
    )
}
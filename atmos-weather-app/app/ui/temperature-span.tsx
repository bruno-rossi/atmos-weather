'use client'

export default function TemperatureSpan({ temperatureUnit, temperatureAmount}: { temperatureUnit: "celsius" | "fahrenheit", temperatureAmount: number}) {

    return (
        <span className="col-span-1 text-3xl text-center border">
            {temperatureAmount} {temperatureUnit}
        </span>
    )
}
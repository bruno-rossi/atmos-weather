'use client';

import WeatherCondition from "./weather-condition";
import { useState, useEffect } from "react";
import { WeatherDataCurrent, WeatherDataHourly } from "../lib/definitions";
import { getForecastNextSixHours } from "../lib/data";
import { formatIntlTime } from "../lib/data";
import { useTranslations } from "next-intl";
import TemperatureSpan from "./temperature-span";

interface ForecastTableProps {
    currentTime: string,
    weatherDataHourly: WeatherDataHourly,
    temperatureUnit: "celsius" | "fahrenheit",
}

export default function ForecastTable({currentTime, weatherDataHourly, temperatureUnit}: ForecastTableProps) {


    const t = useTranslations('table');
    const currentHour = (new Date(currentTime)).getHours()
    const [hourlyForecast, setHourlyForecast] = useState<WeatherDataCurrent[]>([]);

    useEffect(() => {
        if (currentHour !== null) {
            setHourlyForecast(getForecastNextSixHours(currentHour, weatherDataHourly));
        }
    }, [currentHour, weatherDataHourly]);
    
    if (currentHour === null) return <p>{t('loading_data')}</p>;


    // const tempData = { weatherData: {
    //     time: '2025-01-28T06:00',
    //     interval: 900,
    //     temperature_2m: -29.5,
    //     is_day: 1, // Ensure it's 1 or 0
    //     precipitation: 0,
    //     rain: 0,
    //     showers: 0,
    //     snowfall: 0,
    //     cloud_cover: 0,
    // }}

    return (
        <table className="mx-auto w-full border-t">
            <thead>
                <tr className="grid grid-cols-6 text-center">
                {
                    hourlyForecast.map(weather => <td className="" key={weather.time}>{formatIntlTime(weather.time)}</td>)
                }
                </tr>
            </thead>
            <tbody>
                <tr className="grid grid-cols-6 text-center">
                    {
                        hourlyForecast.map(weather => <td className="" key={weather.time}>
                            <TemperatureSpan temperatureAmount={weather.temperature_2m} 
                                temperatureUnit={temperatureUnit}
                                />
                        </td>)
                    }
                </tr>
                <tr className="grid grid-cols-6">
                    {
                        hourlyForecast.map(weather => <td><WeatherCondition weatherData={weather}/></td>)
                    }
                </tr>
            </tbody>
        </table>
    )
}
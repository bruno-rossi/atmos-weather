'use client'
import WeatherCondition from "./weather-condition";
import { useState } from "react";
import { WeatherDataHourly } from "../lib/definitions";
import { getForecastNextSixHours } from "../lib/data";

interface ForecastTableProps {
    currentTime: string,
    weatherDataHourly: WeatherDataHourly,
}

export default function ForecastTable({currentTime, weatherDataHourly}: ForecastTableProps) {

    const [ hourlyForecast, setHourlyForecast ] = useState(getForecastNextSixHours(currentTime, weatherDataHourly));

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
        <table className="mx-auto w-full">
            <thead>
                <tr className="grid grid-cols-6 text-center">
                {
                    hourlyForecast.map(weather => <td className="border">{weather.time}</td>)
                }
                </tr>
            </thead>
            <tbody>
                <tr className="grid grid-cols-6 text-center">
                    {
                        hourlyForecast.map(weather => <td className="border">{weather.temperature_2m}</td>)
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
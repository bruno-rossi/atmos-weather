'use client'
import WeatherCondition from "./weather-condition";
import { useState, useEffect } from "react";
import { WeatherDataCurrent, WeatherDataHourly } from "../lib/definitions";
import { getForecastNextSixHours } from "../lib/data";

interface ForecastTableProps {
    currentHour: number | null,
    weatherDataHourly: WeatherDataHourly,
}

export default function ForecastTable({currentHour, weatherDataHourly}: ForecastTableProps) {

    console.log("Forecast table received current hour:", currentHour)
    const [hourlyForecast, setHourlyForecast] = useState<WeatherDataCurrent[]>([]);

    useEffect(() => {
        if (currentHour !== null) {
            setHourlyForecast(getForecastNextSixHours(currentHour, weatherDataHourly));
        }
    }, [currentHour, weatherDataHourly]);
    
    if (currentHour === null) return <p>Loading time data...</p>;


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
                    hourlyForecast.map(weather => <td className="border" key={weather.time}>{weather.time}</td>)
                }
                </tr>
            </thead>
            <tbody>
                <tr className="grid grid-cols-6 text-center">
                    {
                        hourlyForecast.map(weather => <td className="border" key={weather.time}>{weather.temperature_2m}</td>)
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
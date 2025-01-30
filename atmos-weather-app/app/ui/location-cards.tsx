'use client'

import { LocationCardProps } from "../lib/definitions";
import { fetchWeather } from "../lib/data";
import React, {useState, useEffect, Suspense } from "react";
import { WeatherData } from "../lib/definitions";
import { getForecastNextSixHours } from "../lib/data";

const WeatherCondition = React.lazy(() => import("./weather-condition"));
const ForecastTable = React.lazy(() => import("./forecast-table"));

export default function LocationCard({ location, handleDelete }: LocationCardProps) {

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeather(location);
                setWeatherData(data);

                const time = new Date(data.current.time);
                setCurrentDateTime(currentDateTime);
            } catch (err) {
                setError("Error fetching weather data.");
            } finally {
                setIsLoading(false);
            }
        };

        getWeather(); // Fetch the weather for this location
    }, [location]);

    if (isLoading) return <p>Loading weather...</p>;
    if (error) return <p>{error}</p>;
    if (!weatherData || !weatherData.current) return <p>No weather data available.</p>;
    
    return (
        <div className="group flex flex-col bg-white w-full mx-auto py-4 px-4 border rounded-xl">
            <div onClick={() => handleDelete(location.location_id)}
                className="flex flex-row justify-end block py-2 invisible group-hover:visible"
                ><span className="bg-capri text-white font-bold px-4 py-2 rounded-xl">Delete</span></div>
            <div className="grid grid-cols-6 gap-0 border w-full items-center">
                <div className="col-span-1 border text-center">
                <Suspense fallback={<p>Loading weather condition...</p>}>
                    <WeatherCondition weatherData={weatherData.current} />
                </Suspense>
                </div>
                <h2 className="col-span-2 text-4xl text-center truncate border">
                    {location.latitude}, {location.longitude}
                </h2>
                <h3 className="col-span-2 text-3xl text-center border">
                    {currentDateTime? currentDateTime.getUTCHours() : "00"}:{currentDateTime? currentDateTime.getUTCMinutes() : "00"}
                </h3>
                <h3 className="col-span-1 text-3xl text-center border">
                    {weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}
                </h3>
            </div>
            <Suspense fallback={<p>Loading forecast...</p>}>
                <ForecastTable 
                    currentTime={weatherData.current.time} 
                    weatherDataHourly={weatherData.hourly}
                />
            </Suspense>
        </div>
    )
}
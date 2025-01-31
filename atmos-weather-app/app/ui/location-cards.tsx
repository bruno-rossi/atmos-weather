'use client'

import { LocationCardProps } from "../lib/definitions";
import { fetchWeather } from "../lib/data";
import React, {useState, useEffect, Suspense } from "react";
import { WeatherData } from "../lib/definitions";
import { fetchCurrentTime } from "../lib/data";

const WeatherCondition = React.lazy(() => import("./weather-condition"));
const ForecastTable = React.lazy(() => import("./forecast-table"));

export default function LocationCard({ location, handleDelete }: LocationCardProps) {

    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);
    const [currentTimeString, setCurrentTimeString] = useState<string>("");

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeather(location);
                setWeatherData(data);
                console.log("Weather data: ", data)

                const timezone = data?.timezone.split("/");
                console.log("Timezone:", timezone)

                if (timezone.length === 2) {
                    // Ensure each location fetches the time for its own timezone
                    const currentTimeString = await fetchCurrentTime(timezone);
                    console.log("The fetchcurrenttime function returned: ", currentTimeString)

                    if (currentTimeString && !isNaN(Date.parse(currentTimeString))) {
                        const currentDateTimeObj = new Date(currentTimeString);
                        setCurrentDateTime(currentDateTimeObj);
                    } else {
                        console.error("Invalid time string received:", currentTimeString);
                    }
                } else {
                    console.error("Invalid timezone format:", data?.timezone);
                }

            } catch (err) {
                setError("Error fetching weather data.");
            } finally {
                setIsLoading(false);
            }
        };

        getWeather(); // Fetch the weather for this location
    }, [location]);

    useEffect(() => {

        const formattedHours = currentDateTime instanceof Date && !isNaN(currentDateTime.getTime()) 
        ? currentDateTime.getHours().toString().padStart(2, "0")
        : "00";
        const formattedMinutes = currentDateTime instanceof Date && !isNaN(currentDateTime.getTime()) 
            ? currentDateTime.getMinutes().toString().padStart(2, "0")
            : "00";

        setCurrentTimeString(`${formattedHours}:${formattedMinutes}`);

        console.log("Current time:", currentTimeString);

    }, [currentDateTime]);

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
                    {currentTimeString}
                </h3>
                <h3 className="col-span-1 text-3xl text-center border">
                    {weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}
                </h3>
            </div>
            <Suspense fallback={<p>Loading forecast...</p>}>
                <ForecastTable 
                    currentHour={currentDateTime?.getHours() ?? null} 
                    weatherDataHourly={weatherData.hourly}
                />
            </Suspense>
        </div>
    )
}
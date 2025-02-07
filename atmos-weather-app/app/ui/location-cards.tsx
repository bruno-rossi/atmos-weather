'use client';

import { LocationCardProps } from "../lib/definitions";
import { fetchWeather } from "../lib/data";
import React, {useState, useEffect, Suspense } from "react";
import { WeatherData } from "../lib/definitions";
import { formatIntlTime } from "../lib/data";
import { ForecastTableSkeleton, LocationCardSkeleton, WeatherConditionSkeleton } from "./skeletons";

const WeatherCondition = React.lazy(() => import("./weather-condition"));
const ForecastTable = React.lazy(() => import("./forecast-table"));
const TemperatureSpan = React.lazy(() => import("./temperature-span"));

export default function LocationCard({ location, temperatureUnit, handleDelete }: LocationCardProps) {

    const [ weatherData, setWeatherData ] = useState<WeatherData | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ formattedLocalTime, setFormattedLocalTime ] = useState<string>("")

    useEffect(() => {
        console.log("Fetching weather for unit:", temperatureUnit);
        const getWeather = async () => {
            try {
                const data = await fetchWeather(location, temperatureUnit);
                setWeatherData(data);
                console.log("Weather data: ", data)
                
                if (data?.current?.time) {
                    setFormattedLocalTime(formatIntlTime(data.current.time));
                }

            } catch (err) {
                setError("Error fetching weather data.");
            } finally {
                setIsLoading(false);
            }
        };

        getWeather(); // Fetch the weather for this location
    }, [temperatureUnit, location?.location_id]);

    useEffect(() => {
        console.log("useEffect triggered with temperatureUnit:", temperatureUnit, "and location:", location);
    }, [temperatureUnit, location?.location_id]);

    if (isLoading) return <LocationCardSkeleton />;
    if (error) return <p>{error}</p>;
    if (!weatherData || !weatherData.current) return <p>No weather data available.</p>;
    
    return (
        <div className="group flex flex-col bg-white w-full mx-auto py-4 px-4 border rounded-xl">
            <div className="flex flex-row justify-end ">
                <button onClick={() => handleDelete(location.location_id)}
                    className="block py-2 invisible group-hover:visible group-hover:pointer-events-auto pointer-events-none"
                    ><span className="bg-capri text-white font-bold px-4 py-2 rounded-xl">Delete</span>
                </button>
            </div>
            <div className="grid grid-cols-6 gap-0 border w-full items-center">
                <div className="col-span-1 border text-center">
                <Suspense fallback={<WeatherConditionSkeleton />}>
                    <WeatherCondition weatherData={weatherData.current} />
                </Suspense>
                </div>
                <h2 className="col-span-2 text-4xl text-center truncate border">
                    { location.location_name && location.location_name !== "" ? location.location_name : `${location.latitude}, ${location.longitude}` }
                </h2>
                <h3 className="col-span-2 text-3xl text-center border">
                        { formattedLocalTime }
                </h3>
                <h3 className="col-span-1 text-3xl text-center border">
                    <TemperatureSpan 
                        temperatureUnit={weatherData.current_units.temperature_2m as "celsius" | "fahrenheit"} 
                        temperatureAmount={weatherData.current.temperature_2m} 
                    />
                </h3>
            </div>
            <Suspense fallback={<ForecastTableSkeleton />}>
                <ForecastTable 
                    currentTime={weatherData.current.time ?? null} 
                    weatherDataHourly={weatherData.hourly}
                />
            </Suspense>
        </div>
    )
}
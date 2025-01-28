import { LocationCardProps } from "../lib/definitions";
import WeatherCondition from "./weather-condition";
import ForecastTable from "./forecast-table";
import { fetchWeather } from "../lib/data";

export default async function LocationCard({ location }: LocationCardProps) {

    const weatherData = await fetchWeather(location);
    console.log("Fetched Weather:", weatherData);
    const currentDateTime = new Date(weatherData.current.time);
    
    return (
        <div className="flex flex-col bg-white w-full mx-auto py-4 px-4 border rounded-xl">
            <div className="grid grid-cols-6 gap-0 border w-full items-center">
                <div className="col-span-1 border text-center">
                    <WeatherCondition weatherData={weatherData.current} />
                </div>
                <h2 className="col-span-2 text-4xl text-center truncate border">{location.latitude}, {location.longitude}</h2>
                <h3 className="col-span-2 text-3xl text-center border">{currentDateTime.getUTCHours()}:{currentDateTime.getUTCMinutes()}</h3>
                <h3 className="col-span-1 text-3xl text-center border">{weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}</h3>
            </div>
            <ForecastTable />
        </div>
    )
}
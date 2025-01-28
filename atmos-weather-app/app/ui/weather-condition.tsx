import { WeatherConditionProps } from "../lib/definitions";
import { getWeatherCondition } from "../lib/data";
import { WeatherIcon } from "./icons/icons";

export default function WeatherCondition({ weatherData }: WeatherConditionProps) {

    console.log(weatherData);
    const condition = getWeatherCondition({ weatherData });

    return (
        <div className="border p-4 mx-auto flex flex-col items-center justify-center">
            <WeatherIcon condition={condition} />
            <p className="mt-2 text-center">{condition.label}</p>
        </div>
    )
}
import { sql } from "@vercel/postgres";
import { Location } from "./definitions";
import { WeatherConditionProps } from "./definitions";

export async function fetchLocations() {

    try {
        const data = await sql<Location>`SELECT * from locations`;
        // console.log("Database Result:", data.rows);
        return data.rows;
        
    } catch (error) {
        // console.error('Database Error:', error);
        return [];
    }
}

export async function fetchWeather(location: Location) {

    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,is_day,precipitation,rain,showers,snowfall,cloud_cover&timezone=auto&forecast_days=2`)

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetch weather result:", data)
        return data;

    } catch(error) {
        // console.error('Database Error:', error);
        return {}
    }
}

export function getWeatherCondition(data: WeatherConditionProps) {

    const { is_day, rain, snowfall, cloud_cover } = data.weatherData;
    const weatherCondition = {code: "", label: ""};

    if (snowfall > 0 && snowfall <= 0.5) {
        weatherCondition.code = 'condition-snow';
        weatherCondition.label = 'Light snow';
    } else if (snowfall > 0.5 && snowfall <= 4.0) {
        weatherCondition.code = 'condition-snow';
        weatherCondition.label = 'Moderate snow';
    } else if (snowfall > 4) {
        weatherCondition.code = 'condition-snow';
        weatherCondition.label = 'Heavy snow';
    } else if (rain > 0 && rain <= 0.5) {
        weatherCondition.code = 'condition-drizzle';
        weatherCondition.label = 'Light rain';
    } else if (rain > 0.5 && rain <= 4.0) {
        weatherCondition.code = 'condition-rain';
        weatherCondition.label = 'Moderate rain';
    } else if (rain > 4) {
        weatherCondition.code = 'condition-heavy-rain';
        weatherCondition.label = 'Heavy rain';
    } else if (cloud_cover > 5 && cloud_cover <= 20 && is_day === 1) {
        weatherCondition.code = 'condition-cloudy-day';
        weatherCondition.label = 'Cloudy';
    } else if (cloud_cover > 5 && cloud_cover <= 20 && is_day === 0) {
        weatherCondition.code = 'condition-cloudy-night';
        weatherCondition.label = 'Cloudy';
    } else if (cloud_cover >= 70) {
        weatherCondition.code = 'condition-overcast';
        weatherCondition.label = 'Overcast'
    } else if (is_day === 1) {
        weatherCondition.code = 'condition-clear-day';
        weatherCondition.label = 'Clear skies'
    } else if (is_day === 0) {
        weatherCondition.code = 'condition-clear-night';
        weatherCondition.label = 'Clear skies'
    } else {
        weatherCondition.code = 'condition-undefined';
        weatherCondition.label = 'Undefined'
    }

    return weatherCondition;
}
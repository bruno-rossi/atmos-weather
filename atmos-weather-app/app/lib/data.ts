import { db } from "@vercel/postgres";
import { Location } from "./definitions";
import { WeatherConditionProps, WeatherDataHourly, WeatherDataCurrent  } from "./definitions";
import { useTranslations } from "next-intl";

export async function fetchLocations(): Promise<Location[]> {

    const client = await db.connect();
    
    console.log("Fetching locations from the database...");
    try {
        const data = await client.sql`SELECT * from locations`;

        const locations: Location[] = data.rows.map((row: any) => ({
            location_id: row.location_id,
            location_name: row.location_name,
            user_id: row.user_id,
            latitude: row.latitude,
            longitude: row.longitude,
        }));

        console.log("Database Result:", locations);
        return locations;
        
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    } finally {
        client.release();
    }
}

export async function fetchWeather(location: Location, temperatureUnit: 'celsius' | 'fahrenheit') {

    console.log("Fetch weather triggered");

    try {
        
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,is_day,precipitation,rain,snowfall,cloud_cover&hourly=temperature_2m,rain,snowfall,cloud_cover,is_day&timezone=auto&temperature_unit=${temperatureUnit}&forecast_days=2`)

        if (!response.ok) {
            const errorMessage = "Error: {status} - {statusText}."
            throw new Error(errorMessage);
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

    const t = useTranslations('weather_conditions');

    if (snowfall > 0 && snowfall <= 0.5) {
        weatherCondition.code = 'condition-snow';
        weatherCondition.label = t('light_snow');
    } else if (snowfall > 0.5 && snowfall <= 4.0) {
        weatherCondition.code = 'condition-snow';
        weatherCondition.label = t('moderate_snow');
    } else if (snowfall > 4) {
        weatherCondition.code = 'condition-snow';
        weatherCondition.label = t('heavy_snow');
    } else if (rain > 0 && rain <= 0.5) {
        weatherCondition.code = 'condition-drizzle';
        weatherCondition.label = t('light_rain');
    } else if (rain > 0.5 && rain <= 4.0) {
        weatherCondition.code = 'condition-rain';
        weatherCondition.label = t('moderate_rain');
    } else if (rain > 4) {
        weatherCondition.code = 'condition-heavy-rain';
        weatherCondition.label = t('heavy_rain');
    } else if (cloud_cover > 5 && cloud_cover <= 20 && is_day === 1) {
        weatherCondition.code = 'condition-cloudy-day';
        weatherCondition.label = t('cloudy_day');
    } else if (cloud_cover > 5 && cloud_cover <= 20 && is_day === 0) {
        weatherCondition.code = 'condition-cloudy-night';
        weatherCondition.label = t('cloudy_night');
    } else if (cloud_cover >= 70) {
        weatherCondition.code = 'condition-overcast';
        weatherCondition.label = t('overcast');
    } else if (is_day === 1) {
        weatherCondition.code = 'condition-clear-day';
        weatherCondition.label = t('clear_day');
    } else if (is_day === 0) {
        weatherCondition.code = 'condition-clear-night';
        weatherCondition.label = t('clear_night');
    } else {
        weatherCondition.code = 'condition-undefined';
        weatherCondition.label = t('undefined');
    }
    return weatherCondition;
}

export function getForecastNextSixHours(currentHour: number, weatherDataHourly: WeatherDataHourly): WeatherDataCurrent[] {

    console.log("forecast function received current hour:", currentHour);

    const firstHourIndex = weatherDataHourly.time.findIndex((time: string) => {
        return new Date(time).getHours() === currentHour;
    });
    const hourlyForecast: WeatherDataCurrent[] = [];

    for (let i = firstHourIndex + 1; i <= firstHourIndex+6; i++) { // Get next 6 hours

        if (i >= weatherDataHourly.time.length) break; // Prevent out-of-bounds error

        let hourly: WeatherDataCurrent = {
            time: weatherDataHourly.time[i],
            temperature_2m: weatherDataHourly.temperature_2m[i],
            is_day: weatherDataHourly.is_day[i],
            rain: weatherDataHourly.rain[i],
            snowfall: weatherDataHourly.snowfall[i],
            cloud_cover: weatherDataHourly.cloud_cover[i],
        }
        hourlyForecast.push(hourly);
    }
    console.log("Hourly forecast:", hourlyForecast)
    return hourlyForecast;
}

export function formatIntlTime(localTime: string): string {

    const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
    }

    let formattedLocalTime = new Intl.DateTimeFormat('en-US', options).format(new Date(localTime));

    return formattedLocalTime;
}
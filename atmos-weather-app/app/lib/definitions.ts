export type Location = {
    location_id: string,
    user_id: string,
    latitude: number,
    longitude: number,
}

export type LocationCardProps = {
    location: Location,
}

export type WeatherConditionProps = {
    weatherData: {
        time: string,
        interval: number,
        temperature_2m: number,
        is_day: 1 | 0,
        precipitation: number,
        rain: number,
        showers: number,
        snowfall: number,
        cloud_cover: number,
    }
}

export type WeatherCondition = {
    condition: {
        code: string,
        label: string,
    }
}
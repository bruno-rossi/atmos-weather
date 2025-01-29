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
        is_day: number,
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

export type CreateLocationResponse = {
    newLocation: Location;
    message: string;
  }

export type WeatherData = {
    latitude: number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_units: {
        time: string;
        interval: string;
        temperature_2m: string;
        is_day: number,
        precipitation: string;
        rain: string;
        showers: string;
        snowfall: string;
        cloud_cover: string;
    },
    current: {
        time: string;
        interval: number;
        temperature_2m: number;
        is_day: number,
        precipitation: number;
        rain: number;
        showers: number;
        snowfall: number;
        cloud_cover: number;
    }
}

export type FormState = {
    errors?: {
      latitude?: string[];
      longitude?: string[];
      [key: string]: string[] | undefined;
    };
    newLocation?: Location;
    message?: string | null;
};
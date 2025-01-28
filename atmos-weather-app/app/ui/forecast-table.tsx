import WeatherCondition from "./weather-condition";

export default function ForecastTable() {

    const tempData = { weatherData: {
        time: '2025-01-28T06:00',
        interval: 900,
        temperature_2m: -29.5,
        is_day: 1 as 0 | 1, // Ensure it's 1 or 0
        precipitation: 0,
        rain: 0,
        showers: 0,
        snowfall: 0,
        cloud_cover: 0,
    }}

    return (
        <table className="mx-auto w-full">
            <tr className="grid grid-cols-6 text-center">
                <td className="border">2 C</td>
                <td className="border">2 C</td>
                <td className="border">2 C</td>
                <td className="border">2 C</td>
                <td className="border">2 C</td>
                <td className="border">2 C</td>
            </tr>
            <tr className="grid grid-cols-6">
                <td><WeatherCondition weatherData={tempData.weatherData}/></td>
                <td><WeatherCondition weatherData={tempData.weatherData}/></td>
                <td><WeatherCondition weatherData={tempData.weatherData}/></td>
                <td><WeatherCondition weatherData={tempData.weatherData}/></td>
                <td><WeatherCondition weatherData={tempData.weatherData}/></td>
                <td><WeatherCondition weatherData={tempData.weatherData}/></td>
            </tr>
        </table>
    )
}
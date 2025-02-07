'use client';

export default function SettingsDrawer({ temperatureUnit, setTemperatureUnit }: {temperatureUnit: "celsius" | "fahrenheit", setTemperatureUnit: Function}) {

    // function changeLocale

    function toggleTemperatures(event: React.MouseEvent<HTMLLIElement>) {

        const target = event.target as HTMLLIElement;
        const value = target.getAttribute('value') as 'celsius' | 'fahrenheit';

        console.log(value);
        setTemperatureUnit(value);

        if (typeof window !== "undefined") {
            console.log("Setting temperature unit in localStorage:", temperatureUnit);
            localStorage.setItem('temperatureUnit', temperatureUnit);
        }
    }

    return (
        <div className="flex justify-end items-center cursor-pointer bg-white px-8 w-fit rounded-xl">
            <label className="sr-only" htmlFor="temperature-toggle">Temperature</label>
            <ul id="temperature-toggle" className="flex flex-row gap-4 text-center mx-auto">
                <li onClick={toggleTemperatures} value="celsius">°C</li>
                <li>|</li>
                <li onClick={toggleTemperatures} value="fahrenheit">°F</li>
            </ul>
        </div>
    )
}
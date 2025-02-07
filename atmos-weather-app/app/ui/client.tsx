'use client'

import { useState, useEffect, Suspense } from "react";
import CardsWrapper from "./cards-wrapper";
import LocationFormWrapper from "./location-form-wrapper";
import { Location } from "../lib/definitions";
import { fetchLocations } from "../lib/data";
import { CardsWrapperSkeleton } from "./skeletons";

export default function Client({initialLocations}: { initialLocations: Location[]}) {

    const [locations, setLocations] = useState<Location[]>(initialLocations);
    const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>(() => {
        if (typeof window !== "undefined") {
            const savedUnit = localStorage.getItem('temperatureUnit');
            return (savedUnit as 'celsius' | 'fahrenheit') || 'celsius';
        }
        return 'celsius'; // Default value for SSR
    });

    useEffect(() => {

        const loadLocations = async () => {
            const latestLocations = await fetchLocations();
            setLocations(latestLocations);
        };
        loadLocations();
    }, []);

    return (
        <div className="flex flex-col items-center sm:items-start w-full">
            <LocationFormWrapper setLocations={setLocations} />
            <Suspense fallback={<CardsWrapperSkeleton />}>
                <CardsWrapper locations={locations} setLocations={setLocations} />
            </Suspense>
        </div>
    )
}
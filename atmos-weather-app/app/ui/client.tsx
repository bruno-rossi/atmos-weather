'use client'

import { useState, useEffect } from "react";
import CardsWrapper from "./cards-wrapper";
import LocationFormWrapper from "./location-form-wrapper";
import { Location } from "../lib/definitions";
import { fetchLocations } from "../lib/data";

export default function Client({initialLocations}: { initialLocations: Location[]}) {

    const [locations, setLocations] = useState<Location[]>(initialLocations);

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
            <CardsWrapper locations={locations} setLocations={setLocations} />
        </div>
    )
}
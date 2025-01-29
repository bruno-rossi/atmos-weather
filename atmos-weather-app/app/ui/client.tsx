'use client'

import { useState } from "react";
import CardsWrapper from "./cards-wrapper";
import LocationFormWrapper from "./location-form-wrapper";
import { Location } from "../lib/definitions";

export default function Client({initialLocations}: { initialLocations: Location[]}) {

    const [locations, setLocations] = useState<Location[]>(initialLocations);

    return (
        <div className="flex flex-col row-start-2 items-center sm:items-start">
            <LocationFormWrapper setLocations={setLocations} />
            <CardsWrapper locations={locations} />
        </div>
    )
}
'use client';

import LocationCard from "./location-cards";
import { Location } from "../lib/definitions";

export default function CardsWrapper({ locations }: { locations: Location[] }) {

    return (
        <div className="flex flex-col gap-4 bg-freshAir w-[80%] h-[100%] py-8 px-8 rounded-xl mx-auto">
            {locations.map((location) => (
                <LocationCard key={location.location_id} location={location} />
            ))}
        </div>
    )
}
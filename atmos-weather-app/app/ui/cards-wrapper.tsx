'use client';
import { useState } from 'react';
import LocationCard from "./location-cards";
import { Location } from "../lib/definitions";
import { deleteLocation } from "../lib/actions";
import EmptyState from "./empty-state";
import SettingsDrawer from "./settings-drawer";

export default function CardsWrapper({ locations, setLocations }: { locations: Location[], setLocations: React.Dispatch<React.SetStateAction<Location[]>> }) {
    
    const [temperatureUnit, setTemperatureUnit] = useState<'celsius' | 'fahrenheit'>(() => {
        if (typeof window !== "undefined") {
            const savedUnit = localStorage.getItem('temperatureUnit');
            return (savedUnit as 'celsius' | 'fahrenheit') || 'celsius';
        }
        return 'celsius'; // Default value for SSR
    });

    async function handleDelete(location_id: string) {
        console.log('Delete function triggered');

        // Call delete action here for db;
        const response = await deleteLocation(location_id);

        if (response.status === 204) {
            
            const updatedLocations = locations.filter(location => location.location_id !== location_id);

            // Update list of locations in state
            setLocations(updatedLocations);
            console.log("Location deleted successfully.");
        } else if (response.status === 400) {
            console.log("An error has occurred.")
        }
    }

    if (locations.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="flex flex-col gap-4 bg-freshAir w-full md:w-[80%] h-[100%] py-8 px-8 rounded-xl md:mx-auto">
            <SettingsDrawer temperatureUnit={temperatureUnit} setTemperatureUnit={setTemperatureUnit} />
            {locations.map((location) => {
                return (
                    <LocationCard key={location.location_id} temperatureUnit={temperatureUnit} location={location} handleDelete={handleDelete} />
                );
            })}
        </div>
    )
}
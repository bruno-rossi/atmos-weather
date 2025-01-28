import LocationCard from "./location-cards";
import { Location } from "../lib/definitions";
import { fetchLocations } from "../lib/data";

export default async function CardsWrapper() {

    const locations = await fetchLocations();
    // console.log("Fetched Locations:", locations);

    return (
        <div className="flex flex-col gap-4 bg-freshAir w-[80%] h-[100%] py-8 px-8 rounded-xl mx-auto">
            {locations.length > 0 ? (
            locations.map((location: Location) => (
                <LocationCard key={location.location_id} location={location} />
            ))
        ) : (
            <p>No locations found.</p>
        )}
        </div>
    )
}
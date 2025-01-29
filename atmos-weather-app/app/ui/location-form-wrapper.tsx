import LocationForm from "./location-form";
import { Location } from "../lib/definitions";

export default function LocationFormWrapper({ setLocations }: { setLocations: React.Dispatch<React.SetStateAction<Location[]>> }) {

    return (
        <div className="flex justify-center items-center w-full">
            <LocationForm setLocations={setLocations}  />
        </div>
    )
}
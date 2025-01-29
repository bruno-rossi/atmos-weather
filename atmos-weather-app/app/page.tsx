
import { fetchLocations } from "./lib/data";
import { Location } from "./lib/definitions";
import Client from "./ui/client";

export default async function Home() {
  
  const initialLocations: Location[] = await fetchLocations();

  return (
      <div className="flex flex-col row-start-2 items-center sm:items-start">
        <Client initialLocations={initialLocations} />
      </div>
  );
}

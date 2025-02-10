
import { fetchLocations } from "./lib/data";
import { Location } from "./lib/definitions";
import Client from "./ui/client";

export default async function Home() {
  
  const initialLocations: Location[] = await fetchLocations();

  return (
      <div className="flex flex-col items-center w-full">
        <Client initialLocations={initialLocations} />
      </div>
  );
}

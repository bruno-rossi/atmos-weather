
import { fetchLocations } from "./lib/data";
import { Location } from "./lib/definitions";
import Client from "./ui/client";
import { cookies } from 'next/headers';

export default async function Home() {
  
  const initialLocations: Location[] = await fetchLocations();

  return (
      <div className="flex flex-col items-center sm:items-start w-full">
        <Client initialLocations={initialLocations} />
      </div>
  );
}

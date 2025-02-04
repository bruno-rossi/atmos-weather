
import { fetchLocations } from "./lib/data";
import { Location } from "./lib/definitions";
import Client from "./ui/client";
import { cookies } from 'next/headers';

export default async function Home() {
  
  const initialLocations: Location[] = await fetchLocations();

  const cookieStore = await cookies();
  const userDataCookie = cookieStore.get('user_data'); // Function to extract cookie value
  const userIdCookie = cookieStore.get('user_id'); // Function to extract cookie value

  if (!userIdCookie) {
    const userData = {
      locale: "en-US", // Example, replace with actual user data if available
      unit_of_temperature: "celsius", // Example
      unit_of_measurement: "metric", // Example
    };

    await fetch('/api/setUser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  }  

  return (
      <div className="flex flex-col items-center sm:items-start w-full">
        <Client initialLocations={initialLocations} />
      </div>
  );
}

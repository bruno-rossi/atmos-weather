import { Location } from '@/app/lib/definitions';
import { fetchLocations } from '../../lib/data';

export async function GET() {

    console.log("GET handler invoked");
    
    try {
        const locations = await fetchLocations();
        console.log("Locations from fetchLocations:", locations);
        return new Response(JSON.stringify(locations), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error('Error fetching locations:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch locations' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

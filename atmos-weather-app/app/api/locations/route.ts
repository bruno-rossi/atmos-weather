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

// export async function POST(newLocation: Location) {
//     console.log("POST handler invoked");

//     try {
        

//     } catch (error) {
//         console.error(`Error creating a new location: ${error}`);
//         return new Response(JSON.stringify({ error: 'Failed to create location.'}), {
//             status: 500,
//             headers: {
//                 'Content-Type':'application/json',
//             },
//         })
//     };
// }
import type {FullAdvert} from "$lib/models/full-advert";


export async function getAllAdvertisements() {
    try {
        const res = await fetch('http://localhost:3000/advertisements');
        if (!res.ok) {
            switch (res.status) {
                case 401:
                    console.log('Unauthorized');
                    break;
                case 404:
                    console.log('Not found');
                    break;
                default:
                    console.log('An error occurred');
            }
        }
        const json: FullAdvert[] =  await res.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}


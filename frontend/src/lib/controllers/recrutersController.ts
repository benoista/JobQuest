import type {Recruters} from "$lib/models/recruters";

export async function getCompanyByRecruter(){
    try {
        const res = await fetch('http://localhost:3000/recruter/getCompanyByRecruter', {
            method: 'GET',
            credentials: 'include', // include JWT token in the request
        });
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
        else {
            const recruter = await res.json();
            return recruter;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
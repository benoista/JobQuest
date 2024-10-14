import type {Advertisement} from "$lib/models/advertisement";
import type {Application} from "$lib/models/applications";

export async function apply(name: string, firstName: string, email: string, advertId: number){
    const response = await fetch('http://localhost:3000/apply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, firstName, email, advertId})
    });
    return response.json();
}

export async function myapplication(){
    try {
        const res = await fetch('http://localhost:3000/application/myApplications', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
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
        const json: Application[] =  await res.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}
export async function removeMyApp(id: number){
    try {
        const res = await fetch('http://localhost:3000/application/remove?advertId=' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
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
        const json: Application[] =  await res.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}

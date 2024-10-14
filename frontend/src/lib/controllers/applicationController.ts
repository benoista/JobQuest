import type {Advertisement} from "$lib/models/advertisement";
import type {Application} from "$lib/models/applications";

export async function apply(advertId: number, message: string){
    const response = await fetch('http://localhost:3000/application/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : 'include',
        body: JSON.stringify({advertId, message})
    });
    if (!response.ok){
        switch(response.status){
            case 400:
                alert('Invalid request');
                break;
            case 401:
                alert('Unauthorized');
                break;
            case 404:
                alert('Advert not found');
                break;
            case 409:
                alert('Already applied');
                break;
            default:
                alert('Something went wrong');
                break;
        }
    } else{
        alert('Application sent');
        return await response.json();
    };
};





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


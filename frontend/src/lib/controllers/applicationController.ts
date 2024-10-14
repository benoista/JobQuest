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
    }
    else{
        alert('Application sent');
        return await response.json();
    }
}

export async function getAllApplications(){
    const response = await fetch('http://localhost:3000/application/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : 'include'
    });

    if (!response.ok){
        switch(response.status){
            case 401:
                alert('Unauthorized');
                break;
            default:
                alert('Something went wrong');
                break;
        }
    }
    else{
        let data: Application[] = await response.json();
        console.log(JSON.stringify(data));
        return data;
    }
}

export async function adminCreateApplication(advertId: number, userId: number , message: string){
    const body = {
        advertId,
        userId,
        message: message
    }
    const response = await fetch('http://localhost:3000/application/admin/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : 'include',
        body: JSON.stringify(body)
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
    }
    else{
        alert('Application sent');
        return await response.json();
    }
}
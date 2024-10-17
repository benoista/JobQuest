
import type {Advertisement} from "$lib/models/advertisement";
import type {Application} from "$lib/models/applications";

export async function applyNoAccount(name: string, firstName: string, email: string, message: string, advertId: number){
    const body =  {
        name,
        firstname: firstName,
        email,
        message
    }

    const response = await fetch('http://localhost:3000/application/addNoAccount?id=' + advertId, {
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
                console.log('Unauthorized');
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
                console.log('Unauthorized');
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
                console.log('Unauthorized');
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
                console.log('Unauthorized');
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


export async function updateApplication(id_ads: number, id_people: number, message: string) {
    const body = {id_ads: id_ads, id_people: id_people,  message: message};
    const response = await fetch('http://localhost:3000/application/admin/update/', {
        method: 'PUT',
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
                console.log('Unauthorized');
                break;
            case 404:
                alert('Application not found');
                break;
            default:
                alert('Something went wrong');
                break;
        }
    }
    else{
        alert('Application updated');
    }
}

export async function deleteApplication(id_ads: number, id_people: number){
    const res = await fetch('http://localhost:3000/application/admin/remove?advertId=' + id_ads + "&userId=" + id_people, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials : 'include',
    });
    if (!res.ok){
        switch(res.status){
            case 400:
                alert('Invalid request');
                break;
            case 401:
                console.log('Unauthorized');
                break;
            case 404:
                alert('Application not found');
                break;
            default:
                alert('Something went wrong');
                break;
        }
    }
    else{
        alert('Application deleted');
    }
}
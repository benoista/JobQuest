import type {Sector} from "$lib/models/sector";

export async function getSectors(){
    try {
        const res = await fetch('http://localhost:3000/sector');
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
        let data: Sector[] = await res.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getSectorById(id: number){
    try {
        const res = await fetch('http://localhost:3000/sector/' + id);
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
        const json: Sector =  await res.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function createSector(name: string){
    const body = {
        name: name
    }
    try {
        const res = await fetch('http://localhost:3000/sector/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
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
            alert('Sector added');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteSector(id: number){
    try {
        const res = await fetch('http://localhost:3000/sector/remove?id=' + id, {
            method: 'DELETE',

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
            alert('Sector deleted');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function updateSector(id: number, name: string){
    const body = {
        name: name
    }
    try {
        const res = await fetch('http://localhost:3000/sector/update?id=' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
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
            alert('Sector updated');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getSectorByName(name:string){
    try {
        const res = await fetch('http://localhost:3000/sector/name/?' + name);
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
        const json: Sector =  await res.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getAllSectors(){
    try {
        const res = await fetch('http://localhost:3000/sector');
        if (!res.ok) {
            switch (res.status) {
                case 401:
                    console.log('Unauthorized');
                    break;
                case 404:
                    console.log(res);
                    console.log('Not found');
                    break;
                default:
                    console.log('An error occurred');
            }
        }
        const json: Sector[] =  await res.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}

import type {Advertisement} from "$lib/models/advertisement";


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
        const json: Advertisement[] =  await res.json();
        console.log(JSON.stringify(json))
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}


export async function getAdvertisements(event: FormDataEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const title = formData.get('title')?.toString() || '';
    const company = formData.get('company')?.toString() || '';
    const localization = formData.get('location')?.toString() || '';
    const salary = formData.get('salary')?.toString() || '';
    const contract_type = formData.get('contract_type')?.toString() || '';
    const sector = formData.get('sector')?.toString() || '';
    const working_time = formData.get('working_time')?.toString() || '';

    console.log("title: " + title + " company: " + company + " localization: " + localization + " salary: " + salary + " contract_type: " + contract_type + " sector: " + sector + " working_time: " + working_time)


    try {
        const res = await fetch('http://localhost:3000/advertisements?title=' + title + '&company=' + company + '&localization=' + localization + '&salary=' + salary + '&contract_type=' + contract_type + '&sector=' + sector + '&working_time=' + working_time);
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
        const json: Advertisement[] =  await res.json();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}


async function addAdvertisement(ad : Advertisement){

    try {
        const res = await fetch('http://localhost:3000/advertisements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ad),
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
            alert('Advertisement added');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteAdvertisement(id : number){

    try {
        const res = await fetch('http://localhost:3000/advertisements/remove?id=' + id, {
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
            alert('Advertisement deleted');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getAdvertisementDescription(id : number) {
    try {
        const res = await fetch('http://localhost:3000/advertisements/description?id=' + id, {
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
        const json: string =  await res.json();
        console.log("advertisement description: " + json);
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function updateAdvertisement(id: number, ad){

    const body = {
        title: ad.title,
        short_description: ad.short_description,
        description: ad.description,
        company: ad.company,
        localization: ad.localization,
        salary: ad.salary,
        contract_type: ad.contract_type,
        date: ad.date,
        working_time: ad.working_time,
        sector: ad.sector,
    }

    try {
        const res = await fetch('http://localhost:3000/advertisements/update?id=' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ad),
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
            alert('Advertisement updated');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
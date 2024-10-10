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


export async function getAdvertisements(event: FormDataEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const title = formData.get('title')?.toString() || '';
    const company = formData.get('company')?.toString() || '';
    const localization = formData.get('localization')?.toString() || '';
    const salary = formData.get('salary')?.toString() || '';
    const contract_type = formData.get('contract_type')?.toString() || '';
    const sector = formData.get('sector')?.toString() || '';
    const working_time = formData.get('working_time')?.toString() || '';


    try {
        const res = await fetch('http://localhost:3000/advertisements? title=' + title + '&company=' + company + '&localization=' + localization + '&salary=' + salary + '&contract_type=' + contract_type + '&sector=' + sector + '&working_time=' + working_time);
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


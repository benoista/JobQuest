import type {Company} from "$lib/models/company";


export async function getCompanyById(id:number){
    try {
        const res = await fetch('http://localhost:3000/companies?id=' + id, {
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
        else {
            const data = await res.json();
            console.log(" company fetched by id : ", data);
            return data;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function createCompany(name: string, website: string){
    const body = {
        name: name,
        website: website
    }
    try {
        const res = await fetch('http://localhost:3000/companies/add', {
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
            alert('Company added');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteCompany(id : number){
    try {
        const res = await fetch('http://localhost:3000/companies/remove?id=' + id, {
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
            alert('Company deleted');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function updateCompany(id: number, name: string, website: string){
    const body = {
        name: name,
        website: website
    }
    try {
        const res = await fetch('http://localhost:3000/companies/update?id=' + id, {
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
            alert('Company updated');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getCompanyByName(name:string){
    try {
        const res = await fetch('http://localhost:3000/companies?name=' + name, {
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
        else {
            const data = await res.json();
            console.log(" company fetched by name : ", data);
            return data;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function getAllCompanies():Promise<Company[]>{
    try {
        const res = await fetch('http://localhost:3000/companies', {
            method: 'GET',
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
            return await res.json();
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
export async function getUserById(id: number){
    try {
        const res = await fetch('http://localhost:3000/people?id=' + id, {
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
            return await res.json();
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function createUser(firstName: string, name: string, email: string){
    const body = {
        firstName: firstName,
        name: name,
        email: email
    }
    try {
        const res = await fetch('http://localhost:3000/people/add', {
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
            alert('User added');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function deleteUser(id: number){
    try {
        const res = await fetch('http://localhost:3000/people/remove?id=' + id, {
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
            alert('User deleted');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function updateUser(id: number, firstName: string, name: string, email: string){
    const body = {
        firstName: firstName,
        name: name,
        email: email
    }
    try {
        const res = await fetch('http://localhost:3000/people/update?id=' + id, {
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
            alert('User updated');
        }

    } catch (error) {
        console.error('Error:', error);
    }
}
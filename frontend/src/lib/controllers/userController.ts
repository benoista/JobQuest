import type {User} from "$lib/models/user";

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

export async function updateUser(id: number, firstname: string, name: string, email: string): Promise<boolean>{
    const body = {
        id: id,
        firstname: firstname,
        name: name,
        email: email,
    }
    try {
        const res = await fetch('http://localhost:3000/people/update',{
            method: 'PUT',
            mode: "cors",
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
                    return false;
                case 404:
                    console.log('Not found');
                    return false;
                default:
                    console.log('An error occurred');
                    return false;
            }
        }
        else {
            alert('User updated');
            return true;
        }

    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

// @ts-ignore
export async function getAllUsers(): Promise<User[]> {
    try {
        const res = await fetch('http://localhost:3000/people', {
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


/**
 * Fetch the user's profile data with the token in the request
 */
export async function getUserInfoWithToken(){
    try {
        const res = await fetch('http://localhost:3000/people/me', {
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
             // return the user's profile data
            let data =  await res.json();
            let user: User = JSON.parse(JSON.stringify(data[0]));
            return user;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function Updatepwd(id: number, current: string, newPassword: string): Promise<boolean> {
    const body = {
        id: id,
        current: current,
        newPassword: newPassword,
    };
    try {
        const res = await fetch('http://localhost:3000/people/update',{
            method: 'PUT',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
            credentials: 'include', // include JWT token in the request
        });
        if (!res.ok) {
            switch (res.status) {
                case 401:
                    alert('Unauthorized');
                    return false;
                case 404:
                    alert('Not found');
                    return false;
                default:
                    alert('An error occurred');
                    return false;
            }
        } else {
            alert('User updated');
            return true;
        }

    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
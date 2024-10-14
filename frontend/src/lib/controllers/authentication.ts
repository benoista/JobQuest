import type {User} from "$lib/models/user";



export type Signin = {
    email: string,
    password: string,
}

export type Signup = {
    name: string,
    email: string,
    firstname: string,
    password: string,
}


/**
 * Sign up the user
 * Send a post request to the server
 * Use the name, email and password from the form data
 * if the server returns an error alert the user
 * if the server returns a user object set the app state with the user object
 * @param event
 */
export async function handleSignUp(event: FormDataEvent){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const body: Signup = {
        name: formData.get("name")!.toString(),
        firstname: formData.get("firstname")!.toString(),
        email: formData.get("email")!.toString(),
        password: formData.get("password")!.toString()
    };

    try {
        const res = await fetch('http://localhost:3000/people/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            switch (res.status) {
                case 409:
                    alert('This email is already used');
                    break;
                default:
                    alert('An unexpected error occurred');
                    break;
            }
            return;
        } else {
            window.location.href = '/';
        }

        const data: User = await res.json(); // parse response into a user object
        console.log(data);
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Sign in the user
 * Send a post request to the server
 * Use the email and password from the form data
 * if the server returns an error alert the user
 * if the server returns a user object set the app state with the user object
 *
 * @param event
 */

export async function handleSignIn(event: FormDataEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        const body: Signin = {
            email: formData.get("email")?.toString() || "",
            password: formData.get("password")?.toString() || ""
        };

        try {
            const res = await fetch('http://localhost:3000/people/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                switch (res.status) {
                    case 401:
                        alert('Invalid email or password');
                        break;
                    default:
                        alert('An unexpected error occurred');
                }
            } else {
                const data = await res.json();
                const token = data.token;

                document.cookie = `token=${token}; path=/; max-age=3600; secure; samesite=strict;`;
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error);
        }
    }

/**
 * Sign out the user
 * delete the session
 * delete the cookie
 * redirect to the home page
 * sets the app state user to null
 * @returns void
 */
function handleSignOut() {

}

export async function isAdmin(): Promise<boolean>{
    try {
        const res = await fetch('http://localhost:3000/people/isadmin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (!res.ok) {
            switch (res.status) {
                case 401:
                    return false;
                default:
                    alert('An unexpected error occurred');
            }
        } else {
            const json = res.json();
            console.log(json);
            return true;
        }
    } catch (e) {
        console.log(e);
    }
    return false;
}
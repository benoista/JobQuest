import type {User} from "$lib/models/user";



export type Signin = {
    email: string,
    password: string,
}

export type Signup = {
    name: string,
    email: string,
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
async function handleSignUp(event: FormDataEvent){
    event.preventDefault();
    const formData = event.formData;
    const signup: Signup = JSON.parse(JSON.stringify(formData));

    console.log(signup);

    const body: Signup = {
        name: formData.get("name").toString(),
        email: formData.get('email').toString(),
        password: formData.get('password').toString(),
    }


    try {
        const res = await fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) {
            throw new Error('Error to sign up user');
        }

        const data: User = await res.json();    // parse response into a user object
        console.log(data);


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
function handleSignIn(event:FormDataEvent){
    event.preventDefault();
    const formData = event.formData;

    const body: Signin = {
        email: formData.get('email').toString(),
        password: formData.get('password').toString(),
    }
    console.log(body);

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                console.log(data);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
    fetch('http://localhost:3000/signout', {
        method: 'POST',
    });
}
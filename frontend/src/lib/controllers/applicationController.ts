

export async function apply(name: string, firstName: string, email: string, advertId: number){
    const response = await fetch('http://localhost:3000/apply', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, firstName, email, advertId})
    });
    return response.json();
}
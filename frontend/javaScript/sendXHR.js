// function globale des requêtes (GET, PUT, POST, ...) 
export async function sendXHR (method, url, data) {
    let response = await fetch( url, {
        method ,
        body: JSON.stringify(data),
        headers: data ? {'Content-Type':'application/json'} : {}
    });

    if( response.status >= 400) {
        return response.json().then(errorResponseData => {
            const error = new Error ("Error in response");
            error.data = errorResponseData;
            throw error;
        })
    }
    return response.json();
}



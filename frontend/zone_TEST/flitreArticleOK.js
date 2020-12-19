
// Filtre des articles affichés. 
let optionFiltre = document.querySelector('#filtre');

optionFiltre.addEventListener('change', (event) =>  {

    vitrine.innerHTML = "";
    switch (event.target.value) {

        case "prixCroissant":
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  
                        return a.price - b.price  // ordonner les articles par rix croissant 
                        })
                    console.log(responseData);
                    return responseData;
                })
                .then(infoProduits => afficherProduits(infoProduits) ,
                    errorResponseData => {
                    const error = new Error ("Error in vitrine rendering");
                    error.data = errorResponseData;
                    throw error;
                    })
                    .then(imageOpacity);
            break;

        case "prixDecroissant":
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  
                        return b.price - a.price  // ordonner les articles par rix décroissant 
                        })
                    console.log(responseData);
                    return responseData
                })
                .then(infoProduits => afficherProduits(infoProduits) ,
                            errorResponseData => {
                            const error = new Error ("Error in vitrine rendering");
                            error.data = errorResponseData;
                            throw error;
                })
                .then(imageOpacity);
            break;

        case "nomCroissant":
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  // ordonner les articles par nom croissant
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;} 
                        })
                    console.log(responseData);
                    return responseData
                })
                .then(infoProduits => afficherProduits(infoProduits) ,
                        errorResponseData => {
                        const error = new Error ("Error in vitrine rendering");
                        error.data = errorResponseData;
                        throw error;
                })
                .then(imageOpacity);
            break;

        case "nomDecroissant":
            sendXHR('GET', 'http://localhost:3000/api/cameras')
                .then(responseData => {
                        responseData.sort(function(a, b) {  // ordonner les articles par nom decroissant
                            if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;} 
                        })
                    console.log(responseData);
                    return responseData
                })
                .then(infoProduits => afficherProduits(infoProduits) ,
                        errorResponseData => {
                        const error = new Error ("Error in vitrine rendering");
                        error.data = errorResponseData;
                        throw error;
                })
                .then(imageOpacity);
            break;
    }
}); 

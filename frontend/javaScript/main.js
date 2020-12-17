import {sendXHR}  from './sendXHR.js'
import {updatePanierHeader}  from  './updatePanierHeader.js'




// async function filtrationData(responseData) {
//     let infosProduits = [];
//     let optionFiltre = document.querySelector('#filtre');
//     optionFiltre.addEventListener('change', (event) => {

//         console.log(event.target.value) // OK
//         switch (event.target.value) {

//             case "nomCroissant":
//                 infosProduits = responseData.sort(function(a, b) {  
//                     return a.price - b.price  // ordonner les articles par prix croissant
//                     return infosProduits
//                 })
//                 break;

//             case "nomDecroissant":
//                 infosProduits = responseData.sort(function(a, b) {  
//                     return b.price - a.price  // ordonner les articles par prix décroissant
//                     return infosProduits
//                 })
//                 break;

//             case "prixCroissant":
//                 infosProduits = responseData.sort(function(a, b) {  // ordonner les articles par nom croissant
//                     if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
//                     if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
//                     return infosProduits
//                 })
//                 break;

//             case "prixDecroissant":
//                 infosProduits = responseData.sort(function(a, b) {  // ordonner les articles par nom décroissant
//                     if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
//                     if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;}
//                     return infosProduits
//                 })
//                 break;
            
//         }
        

//     });
   

// }





//  Afficher tous les articles en vente


async function afficherProduits(responseData) {  

    responseData = responseData.sort(function(a, b) {  
        return a.price - b.price  // ordonner les articles par prix croissant
    });

    let optionFiltre = document.querySelector('#filtre');
    optionFiltre.addEventListener('mouseup', (event) => {

       let  result = event.target.value;

        console.log(event.target.value) // OK

        if (result == "nomCroissant") {
            responseData = responseData.sort(function(a, b) {  
                return a.price - b.price  // ordonner les articles par prix croissant  
            });

        } /*else*/ if (result == "nomDecroissant") {
            responseData = responseData.sort(function(a, b) {  
                return a.price - b.price  // ordonner les articles par prix croissant  
            });

        } /*else*/ if (result == "prixCroissant") {
            responseData = responseData.sort(function(a, b) {  
                return a.price - b.price  // ordonner les articles par prix croissant  
            });

        } /*else*/ if (result == "prixDecroissant") {
            responseData = responseData.sort(function(a, b) {  
                return a.price - b.price  // ordonner les articles par prix croissant  
            });
        }

        //-----------------------------------
        // switch (event.target.value) {

        //     case "nomCroissant":
        //         infosProduits = responseData.sort(function(a, b) {  
        //             return a.price - b.price  // ordonner les articles par prix croissant  
        //         })

        //         break;

        //     case "nomDecroissant":
        //         infosProduits = responseData.sort(function(a, b) {  
        //             return b.price - a.price  // ordonner les articles par prix décroissant 
        //         })

        //         break;

        //     case "prixCroissant":
        //         infosProduits = responseData.sort(function(a, b) {  // ordonner les articles par nom croissant
        //             if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
        //             if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;} 
        //         })

        //         break;

        //     case "prixDecroissant":
        //         infosProduits = responseData.sort(function(a, b) {  // ordonner les articles par nom décroissant
        //             if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
        //             if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;} 
        //         })

        //         break;
        // }






      

    });


    

    // });
   
    // let infosProduits = responseData.sort(function(a, b) {  
    //     return b.price - a.price  // ordonner les articles par prix croissant
    // });
    // let  infosProduits = responseData.sort(function(a, b) {
    //     if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
    //     if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;}
    // });
    
    let vitrine = document.querySelector('#vitrine');
    responseData.forEach(article => {
        vitrine.innerHTML += `
                    <div class="jumbotron d-flex flex-column flex-md-row articles">
                       <div class="flex-fill">
                          <a href="./produit.html?id=${article._id}" >
                              <img src=${article.imageUrl} width=600 alt="oricono oricamera image ${article.name}" 
                                   class="img-thumbnail mx-auto d-block">
                          </a>
                        </div>
                        <div class="flex-fill mx-auto text-center">
                            <h2 class="mb-4 mt-4 display-4"> ${article.name} </h2>
                            <p>${article.description}</p> 
                            <h4>&Agrave partir de ${article.price/100}€</h4>
                            <a id=${article._id} class="btn btn-info mt-4" href="./produit.html?id=${article._id}">Découvrez nos modèles</a>
                        </div>
                    </div> `;
        return vitrine;
    });
};


// Opacity 75% des images 'mouseover'
function imageOpacity () {
    let imageAffiche = document.querySelectorAll('img');
    for(let i = 0 ; i < imageAffiche.length ; i++) {
        imageAffiche[i].addEventListener('mouseover', function() {
            this.style.opacity ='0.75'
        });
        imageAffiche[i].addEventListener('mouseout', function() {
            this.style.opacity ='1'
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {  // affichage vitrine au chargement terminé
    let produitVitrine =[];
    produitVitrine = sendXHR('GET', 'http://localhost:3000/api/cameras')
                      /*.then(filtrationData)*/
                      .then(infoProduits => afficherProduits(infoProduits) ,
                            errorResponseData => {
                                const error = new Error ("Error in vitrine rendering");
                                error.data = errorResponseData;
                                throw error;
                      }).then(imageOpacity);
});

updatePanierHeader();



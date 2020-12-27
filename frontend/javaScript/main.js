import {sendXHR}  from './sendXHR.js'
import {updatePanierHeader}  from  './updatePanierHeader.js'



function afficherVitrine(responseData) {  
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
                            <h2 class=" display-4"> ${article.name} </h2>
                            <p class= ml-2 text-justify>${article.description}</p> 
                            <h4>&Agrave partir de ${article.price/100}€</h4>
                            <a id=${article._id} class="btn btn-info mt-4" href="./produit.html?id=${article._id}">Découvrez nos modèles</a>
                        </div>
                    </div> `;
        return vitrine;
    });
}


function imageAnimation() {  // Animation & style des images 'mouseover'
    let imageAffiche = document.querySelectorAll('img');
    for(let i = 0 ; i < imageAffiche.length ; i++) {
        imageAffiche[i].addEventListener('mouseover', function() {
            this.style.opacity ='0.75'
            this.style.scale ='1.1'
            this.style.transition ='all 350ms'
        });
        imageAffiche[i].addEventListener('mouseout', function() {
            this.style.opacity ='1'
            this.style.scale ='1'
        });
    }
}


document.addEventListener("DOMContentLoaded", () => { // affichage vitrine au chargement terminé
    sendXHR('GET', 'http://localhost:3000/api/cameras')
        .then(infoProduits => afficherVitrine(infoProduits) ,
              errorResponseData => {
                const error = new Error ("Error in vitrine rendering");
                error.data = errorResponseData;
                throw error;
        }).then(imageAnimation);
});


// Filtre des articles affichés. 
let optionFiltre = document.querySelector('#filtre');

optionFiltre.addEventListener('change', (event) =>  {
    vitrine.innerHTML = "";
    sendXHR('GET', 'http://localhost:3000/api/cameras')
    .then( responseData => {
        
        switch (event.target.value) {

            case "prixCroissant":
                responseData.sort(function(a, b) {  
                    return a.price - b.price  // ordonner les articles par rix croissant 
                });
            break;

            case "prixDecroissant":
                responseData.sort(function(a, b) {  
                    return b.price - a.price  // ordonner les articles par rix décroissant
                });
            break;

            case "nomCroissant":  
                responseData.sort(function(a, b) {  // ordonner les articles par nom croissant
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;} 
                });
            break;

            case "nomDecroissant":
                responseData.sort(function(a, b) {  // ordonner les articles par nom decroissant
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;} 
                });
            break;
        }
        return responseData
    })
    .then(infoProduits => afficherVitrine(infoProduits))
    .then(imageAnimation);

}); 

updatePanierHeader();  // ATTENTION : Ne pas supprimer !!!!  <<<===========





import {sendXHR}  from './sendXHR.js'
import {updatePanierHeader}  from  './updatePanierHeader.js'
// localStorage.clear();



// Afficher les articles après reception des data produits
function afficherVitrine(responseData) {   
    let vitrine = document.querySelector('#vitrine');
    responseData.forEach(article => {
        vitrine.innerHTML += `
                    <div id="bloc-article" class="jumbotron d-flex flex-column flex-md-row articles border border-dark">
                       <div class="flex-fill">
                          <a href="./html/produit.html?id=${article._id}" >
                              <img src=${article.imageUrl} width=400 alt="oricono oricamera image ${article.name}" 
                                   class="img-thumbnail mx-auto d-block">
                          </a>
                        </div>
                        <div class="flex-fill mx-auto text-center">
                            <h2 class=" display-4"> ${article.name} </h2>
                             
                            <h4>&Agrave partir de ${article.price/100}€</h4>
                            <a id=${article._id} class=" bouton-decouvrir btn mt-3" href="./html/produit.html?id=${article._id}">Découvrez nos modèles</a>
                        </div>
                    </div> `;
        return vitrine;
    });
}


// Animer & styliser les images produit 'mouseover'
function imageAnimation() {  
    let imageAffiche = document.querySelectorAll('img');
    for(let i = 0 ; i < imageAffiche.length ; i++) {
        imageAffiche[i].addEventListener('mouseover', function() {
            this.style.opacity ='0.75';
            this.style.scale ='1.1';
            this.style.transition ='all 350ms';
        });
        imageAffiche[i].addEventListener('mouseout', function() {
            this.style.opacity ='1'
            this.style.scale ='1'
        });
    }
}


// Requêter les données produits au tout début de la création de la page HTML
document.addEventListener("DOMContentLoaded", () => {     
    sendXHR('GET', 'http://localhost:3000/api/cameras')
        .then(infoProduits => afficherVitrine(infoProduits) ,
              errorResponseData => {
                const error = new Error ("Error in vitrine rendering");
                error.data = errorResponseData;
                throw error;
        }).then(imageAnimation);
});


 // Filtrer des articles affichés.
let optionFiltre = document.querySelector('#filtre');
optionFiltre.addEventListener('change', (event) =>  {  
    vitrine.innerHTML = "";
    sendXHR('GET', 'http://localhost:3000/api/cameras')
    .then( responseData => {
        
        switch (event.target.value) {

            case "prixCroissant":
                responseData.sort(function(a, b) {  
                    return a.price - b.price;  
                });
            break;

            case "prixDecroissant":
                responseData.sort(function(a, b) {  
                    return b.price - a.price;  
                });
            break;

            case "nomCroissant":  
                responseData.sort(function(a, b) {  
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;} 
                });
            break;

            case "nomDecroissant":
                responseData.sort(function(a, b) {  
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;} 
                });
            break;
        }
        return responseData;
    })
    .then(infoProduits => afficherVitrine(infoProduits))
    .then(imageAnimation);
}); 


updatePanierHeader();





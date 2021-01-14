import { requeteFiltration } from './index_filtrationData.js';
import {sendXHR}  from './sendXHR.js'
import {updatePanierHeader}  from  './updatePanierHeader.js'
import {imageAnimation}  from  './index_animationImage.js'


// Afficher les articles après reception des data produits
export function afficherVitrine(responseData) {   
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
requeteFiltration(optionFiltre);


// actualisation en continue du panier en header
updatePanierHeader();





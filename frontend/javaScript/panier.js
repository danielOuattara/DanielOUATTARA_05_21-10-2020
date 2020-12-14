
import {updatePanierHeader} from './updatePanierHeader.js';

// localStorage.clear();

// Afficher tous les articles choisis dans le panier
async function afficherPanier() {
     console.log(localStorage.length);
     for ( let i = 0; i < localStorage.length; i++) {
        let clefArticleChoisie = localStorage.key(i);
        let articlesChoisiesJSON = localStorage.getItem(clefArticleChoisie);
        let articlesChoisies = JSON.parse(articlesChoisiesJSON);

        console.log(clefArticleChoisie)
        console.log(articlesChoisies);
        let listingPanier = document.querySelector('#vitrine');
        listingPanier.innerHTML +=  
                        `
                        <div class="jumbotron d-flex flex-column flex-md-row articles">
                           <div class="flex-fill">
                              <a href="./produit.html?id=${articlesChoisies[1]}" >
                                  <img src=${articlesChoisies[2]} width=300 alt="oricono oricamera  ${name}image ${articlesChoisies[0]}" 
                                       class="img-thumbnail mx-auto d-block">
                              </a>
                            </div>
                            <div class="flex-fill mx-auto text-center">
                                <h2 class="mb-4 mt-4"> ${articlesChoisies[0]} </h2> 
                                <p>Lentilles Choisie :  ${articlesChoisies[3]}</p>

                                <div>
                                    <span>Quantite choisie : ${articlesChoisies[4]} </span>

                                    <p><i class="far fa-minus-square"></i> &nbsp;<i class="far fa-plus-square"></i></p>
  
                                </div>

                                <p>Prix Unitaire :  ${articlesChoisies[6]}€</p>
                                <p>Prix Total :  ${articlesChoisies[5]}€</p>
                                <a class="btn btn-info mt-4 supprimer-article">Supprimez Article</a>
                            </div>

                            <div class="d-md-flex justify-content-between text-center">
                            <div>


                        </div>
                        `;
          }

          updatePanierHeader();
};



// formulaire du contact







document.addEventListener("DOMContentLoaded", () => {

afficherPanier();
});




























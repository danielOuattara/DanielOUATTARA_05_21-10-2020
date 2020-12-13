
//  Afficher tous les articles choisis dans le panier
async function afficherPanier() {

     console.log(localStorage.length);

     for (i = 0; i < localStorage.length; i++) {
        x = localStorage.key(i);
        let articlesChoisiesJSON = localStorage.getItem(localStorage.key(i));
        let articlesChoisies = JSON.parse(articlesChoisiesJSON);
        console.log(x)
        console.log(articlesChoisies);
        let listingPanier = document.querySelector('#vitrine');
        listingPanier.innerHTML +=  
                        `
                        <div class="jumbotron d-flex flex-column flex-md-row articles">
                           <div class="flex-fill">
                              <a href="./produit.html?id=${articlesChoisies[1]}" >
                                  <img src=${articlesChoisies[2]} width=400 alt="oricono oricamera image ${articlesChoisies[0]}" 
                                       class="img-thumbnail mx-auto d-block">
                              </a>
                            </div>
                            <div class="flex-fill mx-auto text-center">
                                <h2 class="mb-4 mt-4 display-4"> ${articlesChoisies[0]} </h2> 
                                <h4>Lentilles Choisie ${articlesChoisies[3]}€</h4>
                                <h4>Quantite choisie ${articlesChoisies[4]}€</h4>
                                <h4>Prix Total ${articlesChoisies[5]}€</h4>
        
                            </div>
                        </div>
                        `;
          }





};



document.addEventListener("DOMContentLoaded", () => {

afficherPanier();
});

























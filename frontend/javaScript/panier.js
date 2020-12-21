
import {updatePanierHeader} from './updatePanierHeader.js';


// Afficher tous les articles choisis dans le panier

;

async function __afficherPanier__() {
  let panierCommande = []

     console.log(`localStorage Length = ` , localStorage.length);
     for ( let i = 0; i < localStorage.length; i++) {
        let articleChoisieKEY = localStorage.key(i);
        let articlesChoisiesJSON = localStorage.getItem(articleChoisieKEY);
        let articlesChoisies = JSON.parse(articlesChoisiesJSON);
        panierCommande.push(articlesChoisies);

        console.log(articleChoisieKEY)
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
                                    <p><i class="far fa-minus-square btn"></i> &nbsp;<i class="far fa-plus-square btn"></i></p>
                                </div>
                                <p>Prix Unitaire :  ${articlesChoisies[6]}€</p>
                                <p>Prix Total :  ${articlesChoisies[5]}€</p>
                                <button class="btn btn-info mt-4 supprimer-article">Supprimez Article</button>
                            </div>
                            <div class="d-md-flex justify-content-between text-center">
                            <div>
                        </div>
                        `;
          }

          
}

document.addEventListener("DOMContentLoaded", () => {

  __afficherPanier__();

});

updatePanierHeader();

// supprimer article
//-------------------


// if (localStorage.lenght !== 0 ) {
//     let supprimerArticle = document.querySelector('.supprimer-article');
//     supprimerArticle.addEventListener('click', () => {
//         localStorage.removeItem(this.key);
// })

// };


// vider panier

let formulaireCommande = document.querySelector('.formulaire-commande');
let videurPanier = document.querySelector('.vider-panier');
if(localStorage.length == 0) {
  videurPanier.style.display = "none";
  formulaireCommande.style.display = "none";
  
}


videurPanier.addEventListener('click', () => {
  localStorage.clear();
  updatePanierHeader();
  __afficherPanier__();
  formulaireCommande.style.display = "none";
  videurPanier.style.display = "none";
});

// afficher button : vider-panier



// formulaire du contact : code de validation coté client
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();



  const cacherVideurPanier = () => {
    if (localStorage.length  == 0 ) {
        document.querySelector('.vider-panier').style.visibility = "hidden";
    }
}
cacherVideurPanier();



  // génération de l'objet de commande : les articles + formulaire valide


//   let commande =  {
//        articles = [], 
//        formulaire = []
//     }



























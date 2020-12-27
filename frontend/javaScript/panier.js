
import {updatePanierHeader} from './updatePanierHeader.js';


// Afficher tous les articles choisis dans le panier

function afficherPanier() {
  // let panierCommande = []

     for ( let i = 0; i < localStorage.length; i++) {
        let articleChoisieKEY = localStorage.key(i);
        let articleChoisieJSON = localStorage.getItem(articleChoisieKEY);
        let articleChoisie = JSON.parse(articleChoisieJSON);
        // panierCommande.push(articleChoisie);

        let listingPanier = document.querySelector('#vitrine');
        listingPanier.innerHTML +=  
                        `
                        <div class="d-flex flex-row border-top border-3 border-info border-5 my-3 flex-md-row articles ">
                           <div class="">
                              <a href="./produit.html?id=${articleChoisie[1]}" >
                                  <img src=${articleChoisie[2]} width=300 alt="oricono oricamera  ${name}image ${articleChoisie[0]}" 
                                       class="img-thumbnail mx-auto d-block">
                              </a>
                            </div>
                            <div class=" mx-auto text-center">
                                <h2 class="mb-4 mt-4"> ${articleChoisie[0]} </h2> 
                                <p>Lentilles Choisie :  ${articleChoisie[3]}</p>
                                <div>
                                    <p>Quantite choisie : <span class= "quantite-choisie">${articleChoisie[4]} </span></p>
                                    <p><i class="far fa-minus-square btn"></i> &nbsp;<i class="far fa-plus-square btn"></i></p>
                                </div>
                                <p>Prix Unitaire :  ${articleChoisie[5]}€</p>
                                <p>Prix Total :  ${articleChoisie[6]}€</p>
                                <button class="btn btn-info mt-4 retirer-article" data-toggle="modal" data-target="#supprimer-article-modal">Supprimez article</button>
                            </div>
                        </div>
                        `;
      }

    // return panierCommande    
}




// supprimer article
//-------------------

function retirerArticlePanier() {

  let supprimerArticle = document.querySelector('.supprimer-article-ok');

  supprimerArticle.addEventListener('click', () => {

    supprimerArticle.parentNode.parentNode.innerHTML= "";
    
  });

  if (localStorage.length !== 0 ) {
      supprimerArticle.addEventListener('click', () => {
          localStorage.removeItem(this.key);
      })
  }
}



// ajuster (+ / -) quantité article et prix total
//------------------------------------------------

function ajusterQuantite() {

  let quantiteChoisie = document.querySelector('.quantite-choisie'); 

  let reduire = document.querySelector('.fa-minus-square');
  reduire.addEventListener('click', function(event) {
    console.log("Hello");
    if (quantiteChoisie.innerHTML < 0) {
      event.stopPropagation();
      event.preventDefault();

    } else {
    quantiteChoisie.innerHTML -=1;
    }



  });


  let augmenter = document.querySelector('.fa-plus-square');
  augmenter.addEventListener('click', function(event) {

    quantiteChoisie.innerHTML +=1;
  });

}



// vider panier
//------------------

 function viderPanier() {

    let videurPanier = document.querySelector('.vider-panier-ok');

    videurPanier.addEventListener('click', () => {
        localStorage.clear();
        updatePanierHeader();
        afficherPanier();
    });

 }


// formulaire du contact : code de validation coté client
//--------------------------------------------------------

(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to

      let formulaire = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      Array.prototype.filter.call(formulaire, function(form) {
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


// Créer l'objet de contact
//-----------------------------------

let prenom = document.querySelector('#prenom')
let nom = document.querySelector('#nom')
let adresse = document.querySelector('#adresse')
let codePostale = document.querySelector('#code-postale')
let ville = document.querySelector('#ville')
let email = document.querySelector('#email')


let contact = {

  prenom:        prenom ,  
  nom:           nom ,
  adresse:       adresse , 
  ville:         ville ,
  codePostale,
  email:         ""
}


// Création du tableau de produits
//---------------------------------

let products = [];










window.addEventListener("load", () => {

  afficherPanier();
  updatePanierHeader();
  viderPanier();
  retirerArticlePanier();
  ajusterQuantite();

});


















//   const cacherVideurPanier = () => {
//     if (localStorage.length  == 0 ) {
//         document.querySelector('.vider-panier').style.visibility = "hidden";
//     }
// }
// cacherVideurPanier();



  // génération de l'objet de commande : les articles + formulaire valide


//   let commande =  {
//        articles = [], 
//        formulaire = []
//     }




























import {updatePanierHeader} from './updatePanierHeader.js';
import {sendXHR} from './sendXHR.js';

// Afficher tous les articles choisis dans le panier

function afficherPanier() {

  //  console.log(localStorage.getItem(articleChoisie));

     for ( let i = 0; i < localStorage.length; i++) {
        let articleChoisieKEY = localStorage.key(i);
        // console.log(articleChoisieKEY);
        let articleChoisieJSON = localStorage.getItem(articleChoisieKEY);
        let articleChoisie = JSON.parse(articleChoisieJSON);
        // console.log(articleChoisie);
        // panierCommande.push(articleChoisie);

        let listingPanier = document.querySelector('#vitrine');
        listingPanier.innerHTML +=  
                        `
                        <div class="d-flex flex-row border-top border-3 border-info border-5 my-3 flex-md-row articles ">
                           <div class="">
                              <a href="./produit.html?id=${articleChoisie[1]}" >
                                  <img src=${articleChoisie[2]} width=300 alt="oricono oricamera image ${articleChoisie[0]}" 
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
                                <p>Prix Total :  ${articleChoisie[5] * articleChoisie[4]} €</p>
                                <button class=" supprimer-article-${i} btn btn-warning mt-4 retirer-article" data-toggle="modal" data-target="#supprimer-article-modal">Supprimez article</button>
                            </div>
                        </div>
                        `;
      }

    // return panierCommande    
}



// supprimer article
//-------------------

function supprimerArticlePanier() {

  let supprimerArticle = document.querySelector('.supprimer-article-ok');

  supprimerArticle.addEventListener('click', function(event) {
    this.parentNode.parentNode.innerHTML= "";

    if (localStorage.length !== 0 ) {
      localStorage.removeItem(this.key);
}
    
  });

}



// ajuster (+ / -) quantité article et prix total
//------------------------------------------------

function ajusterQuantite() {
  if( localStorage.length !==0) {

    let quantiteChoisie = document.querySelector('.quantite-choisie'); 
    let reduire = document.querySelector('.fa-minus-square');
    reduire.addEventListener('click', function(event) {
      console.log("Hello");
      if (quantiteChoisie.innerHTML <= 0) {
        event.stopPropagation();
        event.preventDefault();

      } else {
      quantiteChoisie.innerHTML --;
      }
    });


    let augmenter = document.querySelector('.fa-plus-square');
    augmenter.addEventListener('click', function(event) {

      quantiteChoisie.innerHTML ++;
    });
  }

}



// vider panier : OK !
//------------------

 function viderPanier() {

    let videurPanier = document.querySelector('.vider-panier-ok');
    videurPanier.addEventListener('click', () => {
        videurPanier.href = "./../html/index.html";
        localStorage.clear();
        updatePanierHeader();
    });

 }



// formulaire du contact : code de validation coté client
//--------------------------------------------------------

// (function() {
//     'use strict';
//     window.addEventListener('load', function() {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to

//       let formulaire = document.getElementsByClassName('needs-validation');
//       // Loop over them and prevent submission
//       Array.prototype.filter.call(formulaire, function(form) {
//         form.addEventListener('submit', function(event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//           }
//           form.classList.add('was-validated');
//         }, false);
//       });
//     }, false);
//   })();


  function formValidation() {

    let form = document.querySelector('.needs-validation');
    form.addEventListener('submit', function(event) {

        if( form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();   
        }

        form.classList.add('was-validated');
    });
  }



  
// Créer l'objet de contact
//-----------------------------------






// Création du tableau de produits
//---------------------------------

let products = [];

function confirmationCommande() {


  /* 
  Action à accomplir: en cliquant sur le bouton

  1- demande de confirmation de validation commande (modal) : OK !
  2- validation du formulaire de contact
  3- création de l'objet de contact
  4- création du tableau de produits
  5- requête POST avec sendXHR()
  
  */



  let btnConfirmationCommande = document.querySelector('.confirmer-commande-ok')
  
  btnConfirmationCommande.addEventListener('click', function(event) {
    console.log("Hello")

    // event.preventDefault();

  // let prenom = document.querySelector('#prenom')
  // let nom = document.querySelector('#nom')
  // let adresse = document.querySelector('#adresse')
  // let codePostale = document.querySelector('#code-postale')
  // let ville = document.querySelector('#ville')
  // let email = document.querySelector('#email')

  // let contactObjet = {

  //   prenomClient: prenom.value,  
  //   nomClient: nom.value,
  //   addresseClient: adresse.value, 
  //   clientVille: ville.value ,
  //   codePostaleClient: codePostale.value,
  //   emailCLient: email.value
  // }

  // console.log("contact = ", contactObjet)
  // // console.log(contactObjet);
    
  //   event.preventDefault();

    });

}








window.addEventListener("load", () => {

  afficherPanier();
  updatePanierHeader();
  viderPanier();
  supprimerArticlePanier();
  ajusterQuantite();
  // confirmationCommande();

});





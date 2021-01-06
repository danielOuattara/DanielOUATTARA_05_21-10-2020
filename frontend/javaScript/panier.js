
import {updatePanierHeader} from './updatePanierHeader.js';
import {sendXHR} from './sendXHR.js';

// Afficher tous les articles choisis dans le panier
// localStorage.clear();
function afficherPanier() {
        console.log("localStorage.length  = ", localStorage.length)
     for ( let i = 0; i < localStorage.length; i++) {


        let articleChoisiKEY    = localStorage.key(i);
        console.log(" articleChoisiKEY = ", articleChoisiKEY)
        let articleChoisiJSON   = localStorage.getItem(articleChoisiKEY);
        console.log("articleChoisiJSON = ", articleChoisiJSON)
        let articleChoisi       = JSON.parse(articleChoisiJSON);
        let listingPanier       = document.querySelector('#vitrine');
        listingPanier.innerHTML +=  
                        `
                        <div class="donnees-article d-flex flex-row border-bottom border-top border-3 border-info border-5 py-3 flex-md-row articles ">
                           <div class="">
                              <a href="./produit.html?id=${articleChoisi[1]}" >
                                  <img src=${articleChoisi[2]} width=300 alt="oricono oricamera image ${articleChoisi[0]}" 
                                       class="img-thumbnail mx-auto d-block">
                              </a>
                            </div>
                            <div class=" mx-auto text-center">
                                <h2 class="mb-4 mt-4"> ${articleChoisi[0]} </h2> 
                                <p>Lentilles Choisie :  ${articleChoisi[3]}</p>
                                <div class ="gestion-quantite-article">
                                    <p>Quantite choisie : <span class= "quantite-choisie">${articleChoisi[4]} </span></p>
                                    <p><i class="far fa-minus-square btn" data-id="${i}"></i> &nbsp;<i class="far fa-plus-square btn" data-id="${i}"></i></p>
                                    <p>Prix Unitaire :  ${articleChoisi[5]}€</p>
                                    <p>Prix Total : <span class="prix-total" data-id="${i}">${articleChoisi[5] * articleChoisi[4]}</span> €</p>
                                </div>
                                <button data-id="${i}" class="supprimer-article btn btn-warning mt-4" data-toggle="modal" data-target="#supprimer-article-modal">Supprimez article</button>
                            </div>
                        </div>
                        `;
      }  
}

// supprimer article : (OK!)
//-------------------

function supprimerArticlePanier() {

  if (localStorage.length !== 0) {

      let supprimerArticleOk = document.querySelector('.supprimer-article-ok');
      let supprimerArticle = document.querySelectorAll('.supprimer-article');

      supprimerArticle.forEach ( item => {

        item.addEventListener('click', function() {

          supprimerArticleOk.addEventListener('click', () => {

            let articleChoisieKEY = localStorage.key(item.dataset.id);
            localStorage.removeItem(articleChoisieKEY);
            item.parentElement.parentElement.remove();
            console.log(localStorage.length);
            updatePanierHeader();

            if (localStorage.length == 0) {
              window.location.replace("./../html/index.html")
            }
          });
        });
      });
  }
}


// ajuster (+ / -) quantité article et prix total
//------------------------------------------------
function ajusterQuantite() {

  if( localStorage.length !== 0) {

    let gestionQuantiteArticle = document.querySelectorAll('.gestion-quantite-article'); 
    gestionQuantiteArticle.forEach( item => {


      //1-  reduction
      let reduire = item.querySelector('.fa-minus-square');
      reduire.addEventListener('click', function(event) {  

         if (item.querySelector('.quantite-choisie').innerHTML == 1 ) {

          this.setAttribute("data-toggle","modal");
          this.setAttribute("data-target","#supprimer-article-modal")
          let supprimerArticleOk = document.querySelector('.supprimer-article-ok');
          supprimerArticleOk.addEventListener('click', function() {

            let articleChoisieKEY = localStorage.key(item.dataset.id);
            localStorage.removeItem(articleChoisieKEY);
            item.parentElement.parentElement.remove();
            // updatePanierHeader();
            if (localStorage.length == 0) {

              window.location.replace("./../html/index.html")
            }
          });

        } else {

          item.querySelector('.quantite-choisie').innerHTML -- ; 
          updateAffichagePanier(event.target.dataset.id, item.querySelector('.quantite-choisie'), item.querySelector('.prix-total'));


          // let articleChoisieKEY = localStorage.key(event.target.dataset.id);  // ici modifie le localStorage pour l'element cliqué
          // let articleChoisieJSON = localStorage.getItem(articleChoisieKEY);          
          // let articleChoisie = JSON.parse(articleChoisieJSON);
          // articleChoisie[4] = item.querySelector('.quantite-choisie').innerHTML;          
          // articleChoisie[6] =  parseFloat(articleChoisie[4]) * parseFloat (articleChoisie[5]);
          // item.querySelector('.prix-total').innerHTML = articleChoisie[6];
          // articleChoisieJSON = JSON.stringify(articleChoisie);
          // localStorage.setItem(articleChoisieKEY, articleChoisieJSON);         
        }  
        updatePanierHeader(); 
      });

      // 2- augmentation
      let augmenter = item.querySelector('.fa-plus-square');
      augmenter.addEventListener('click', function(event) {

        item.querySelector('.quantite-choisie').innerHTML ++;
        updateAffichagePanier(event.target.dataset.id, item.querySelector('.quantite-choisie'), item.querySelector('.prix-total'));


        // let articleChoisieKEY = localStorage.key(event.target.dataset.id); // ici modifier le localStorage sur l'element cliqué
        // let articleChoisieJSON = localStorage.getItem(articleChoisieKEY);
        // let articleChoisie = JSON.parse(articleChoisieJSON);
        // articleChoisie[4] = item.querySelector('.quantite-choisie').innerHTML;
        // articleChoisie[6] =  parseFloat(articleChoisie[4]) *  parseFloat (articleChoisie[5]);
        // item.querySelector('.prix-total').innerHTML = articleChoisie[6];
        // articleChoisieJSON = JSON.stringify(articleChoisie);
        // localStorage.setItem(articleChoisieKEY, articleChoisieJSON);
        updatePanierHeader(); 
     })
    });
  }
  // afficherPanier();
}



function updateAffichagePanier( foo, boo, doo) {
  let articleChoisieKEY = localStorage.key(foo);  // ici modifie le localStorage pour l'element cliqué
let articleChoisieJSON = localStorage.getItem(articleChoisieKEY);          
let articleChoisie = JSON.parse(articleChoisieJSON);
articleChoisie[4] = boo.innerHTML;          
articleChoisie[6] =  parseFloat(articleChoisie[4]) * parseFloat (articleChoisie[5]);
doo.innerHTML = articleChoisie[6];
articleChoisieJSON = JSON.stringify(articleChoisie);
localStorage.setItem(articleChoisieKEY, articleChoisieJSON);  

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
  // updateAffichagePanier();
  // confirmationCommande();

});





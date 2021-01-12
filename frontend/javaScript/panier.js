
import {updatePanierHeader} from './updatePanierHeader.js';
import {sendXHR} from './sendXHR.js';
// localStorage.clear();
// ----------------------------------------------- OK !
function afficherPanier() {
     for ( let i = 0; i < localStorage.length; i++) {

        let articleChoisiKEY    = localStorage.key(i);
        let articleChoisiJSON   = localStorage.getItem(articleChoisiKEY);
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

//------------------------------------------------------------------ OK 
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
            updatePanierHeader();

            if (localStorage.length == 0) {
              window.location.replace("./../html/index.html")
            }
          });
        });
      });
  }
}

//------------------------------------------------------------------ OK
function ajusterQuantite() {
  if( localStorage.length !== 0) {
    let gestionQuantiteArticle = document.querySelectorAll('.gestion-quantite-article'); 

    gestionQuantiteArticle.forEach( item => {
      let reduire = item.querySelector('.fa-minus-square');
      reduire.addEventListener('click', function(event) {  

        if (item.querySelector('.quantite-choisie').innerHTML == 1 ) { // 1- suppression
          this.setAttribute("data-toggle","modal");
          this.setAttribute("data-target","#supprimer-article-modal")
          let supprimerArticleOui = document.querySelector('.supprimer-article-ok');

          supprimerArticleOui.addEventListener('click', function() {
            let articleChoisieKEY = localStorage.key(reduire.dataset.id);
            localStorage.removeItem(articleChoisieKEY);
            item.parentElement.parentElement.remove();
            updatePanierHeader();
            if (localStorage.length == 0) {
              window.location.replace("./../html/index.html")
            }
          });
 
        } else { //1-  reduction
          item.querySelector('.quantite-choisie').innerHTML -- ; 
          updateAffichagePanier(event.target.dataset.id, item.querySelector('.quantite-choisie'), item.querySelector('.prix-total'));   
        }  
        updatePanierHeader(); 

      });

      let augmenter = item.querySelector('.fa-plus-square');  // 2- augmentation

      augmenter.addEventListener('click', function(event) {
        item.querySelector('.quantite-choisie').innerHTML ++;
        updateAffichagePanier(event.target.dataset.id, item.querySelector('.quantite-choisie'), item.querySelector('.prix-total'));
        updatePanierHeader(); 
        
     })
    });
  }
  
}

//------------------------------------------------------------------ OK

function updateAffichagePanier( IdArticle, nouvelleQteChoisie, nouveauPrixTotal) {   //ici modifie le localStorage pour l'element cliqué
    let articleChoisieKEY  = localStorage.key(IdArticle); 
    let articleChoisieJSON = localStorage.getItem(articleChoisieKEY);          
    let articleChoisie     = JSON.parse(articleChoisieJSON);
    articleChoisie[4]      = nouvelleQteChoisie.innerHTML;          
    articleChoisie[6]      =  parseFloat(articleChoisie[4]) * parseFloat (articleChoisie[5]);
    nouveauPrixTotal.innerHTML          = articleChoisie[6];
    articleChoisieJSON     = JSON.stringify(articleChoisie);
    localStorage.setItem(articleChoisieKEY, articleChoisieJSON);  
}


//------------------------------------------------------------------ OK
 function viderPanier() {

    let videurPanier = document.querySelector('.vider-panier-ok');
    videurPanier.addEventListener('click', () => {
      localStorage.clear();
      updatePanierHeader();
      videurPanier.href = "./../html/index.html";
    });
 }


 //----------------------------------------------------------------- OK
function validerFormulaireCommande() {

  let form = document.querySelector('.needs-validation');
  form.addEventListener('submit', function(event) {
    
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();  
    }
    form.classList.add('was-validated');

    if(form.checkValidity()) {
      let btnConfirmationCommande = document.querySelector('.confirmation-commande');
      btnConfirmationCommande.setAttribute("data-toggle", "modal")
      btnConfirmationCommande.setAttribute("data-target", "#confirmer-commande-modal")
      event.preventDefault();
    }
  });
}


//------------------------------------------------------------------ OK
let contact;
function creerObjetContact() {
   contact = {
      firstName:   document.querySelector('#prenom').value,
      lastName:    document.querySelector('#nom').value,
      address:     document.querySelector('#adresse').value,
      city:        document.querySelector('#ville').value,
      email:       document.querySelector('#email').value
  }
    return contact;
}

//------------------------------------------------------------------ OK 

let products =[];
function creerTableauProduct() {
  for (let i = 0; i < localStorage.length; i++) {
    let articleChoisiKEY    = localStorage.key(i);
    let articleChoisiJSON   = localStorage.getItem(articleChoisiKEY);
    let articleChoisi       = JSON.parse(articleChoisiJSON);
    if (articleChoisi[4] > 1) {
      for (let j = articleChoisi[4]; j > 1; j-- ) {
        products.push(articleChoisi[1])
      }
    } 
    products.push(articleChoisi[1])
  }
  return products; 
}


function capterDataCommande() {
  let prixTotal= 0;
  document.querySelectorAll('.prix-total').forEach(item => prixTotal += parseInt(item.innerHTML))
  // console.log(prixTotal);
  localStorage.setItem('prixTotal', prixTotal);
}


function dirigerVersPageConfirmationCommande() {
  location.replace('./../html/confirmation.html')
}

//------------------------------------------------------------------ OK 

function confirmerCommande() {
    let btnConfirmationCommandeOui = document.querySelector('.confirmer-commande-oui')
    btnConfirmationCommandeOui.addEventListener('click', function(event) {
      creerObjetContact();
      creerTableauProduct();
      sendXHR('POST','http://localhost:3000/api/cameras/order' ,{contact, products})
        .then( responseData => localStorage.setItem('_idCommande', responseData.orderId))
        .then(capterDataCommande)
        .then(dirigerVersPageConfirmationCommande);
    })
}




window.addEventListener("load", () => {

  afficherPanier();
  updatePanierHeader();
  viderPanier();
  supprimerArticlePanier();
  ajusterQuantite();
  validerFormulaireCommande();
  confirmerCommande();


});





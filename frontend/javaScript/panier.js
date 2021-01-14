
import { updatePanierHeader        } from './updatePanierHeader.js';
import { supprimerArticlePanier    }  from './panier_supprimerArticle.js'
import { ajusterQuantite           }  from './panier_ajusterQuantite.js'
import { viderPanier               }  from './panier_viderPanier.js'
import { validerFormulaireCommande }  from './panier_validerFormulaire.js'
import { confirmerCommande         }  from './panier_confirmerCommande.js'

//--------------------------------------------------------------------------------
function afficherPanier() {
  for ( let i = 0; i < localStorage.length; i++) {

     let articleChoisiKEY    = localStorage.key(i);
     let articleChoisiJSON   = localStorage.getItem(articleChoisiKEY);
     let articleChoisi       = JSON.parse(articleChoisiJSON);
     let listingPanier       = document.querySelector('#vitrine');
     listingPanier.innerHTML +=  
                     `
                     <div id="bloc-article" class="donnees-article d-sm-flex flex-sm-row border-bottom border-top py-3 flex-sm-row articles ">
                        <div class="">
                           <a href="./produit.html?id=${articleChoisi[1]}" >
                               <img src=${articleChoisi[2]} width=300 alt="oricono oricamera image ${articleChoisi[0]}" 
                                    class="img-thumbnail mx-auto d-block m-sm-3">
                           </a>
                         </div>
                         <div class=" mx-auto text-center">
                             <h2 class="m-3"> ${articleChoisi[0]} </h2> 
                             <p>Lentille choisie :  ${articleChoisi[3]}</p>
                             <div class ="gestion-quantite-article">
                                 <p>Quantite choisie : <span class= "quantite-choisie">${articleChoisi[4]} </span></p>
                                 <p><i class="far fa-minus-square btn" data-id="${i}"></i> &nbsp;<i class="far fa-plus-square btn" data-id="${i}"></i></p>
                                 <p>Prix Unitaire :  ${articleChoisi[5]}€</p>
                                 <p class=" prix-total-panier border rounded d-inline-block p-2 text-light bg-secondary">Prix Total : <span class="prix-total" data-id="${i}">${articleChoisi[5] * articleChoisi[4]}</span> €</p>
                             </div>
                             <button data-id="${i}" class="supprimer-article btn mt-2" data-toggle="modal" data-target="#supprimer-article-modal">Supprimez article</button>
                         </div>
                     </div>
                     `;
   }  
}


//--------------------------------------------------------------------------------
window.addEventListener("load", () => {

  afficherPanier();
  updatePanierHeader();
  viderPanier();
  supprimerArticlePanier();
  ajusterQuantite();
  validerFormulaireCommande();
  confirmerCommande();
});





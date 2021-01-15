// import { sendXHR } from './sendXHR.js';
import { updatePanierHeader } from './updatePanierHeader.js'
import { afficherData } from './produit_afficher.js'
import { capterOptionLentilles, capterNombreArticleChoisi, capterPrixTotal } from './produit_capteurs.js'
import { creationOptionLentilles, creationOptionQuantite } from './produit_creationOptions.js'


export function ajouterAuPanier(data) {

    let btnAjouterPanier = document.querySelector('.ajoutez-panier');
    let articleChoisi= [];
    let articleChoisiKEY;
    let articleChoisiJSON;
    let articleName, articleID, articleImageUrl, lentilleChoisie, quantiteChoisie, articlePrix, prixTotal ;
  
    btnAjouterPanier.addEventListener('click', () => {
        // capter toutes les données de l'article au "click"
        articleName      = document.querySelector('.article-name');
        articleID        = data._id;
        articleImageUrl  = document.querySelector('.hover-image');
        lentilleChoisie  = document.querySelector('.options-lentilles');
        quantiteChoisie  = document.querySelector('.quantite-article');
        articlePrix      = document.querySelector('.article-prix');
        prixTotal        = document.querySelector('#prix-total');

        // creer un Array qui stocke les données précédentes
        articleChoisi = [ 
            articleName.innerHTML, 
            articleID, 
            articleImageUrl.src, 
            lentilleChoisie.value, 
            quantiteChoisie.value, 
            articlePrix.textContent, 
            prixTotal.textContent
            ];

        // créer une clef par choix d'article pour localStorage
        articleChoisiKEY = articleName.innerHTML.replace(/\s/, "_")+ "_" + articleID.trim() + "_" + lentilleChoisie.value.replace(/\s/, "_");

        afficherConfirmation(articleChoisiKEY);
        
        // stocker contenu dans la localStorage
        articleChoisiJSON = JSON.stringify(articleChoisi);
        localStorage.setItem(articleChoisiKEY, articleChoisiJSON);

        updatePanierHeader()
        afficherData(data)
        creationOptionLentilles(data.lenses)
        creationOptionQuantite()
        capterOptionLentilles()
        capterNombreArticleChoisi()
        capterPrixTotal(data.price)
        ajouterAuPanier(data);
    });
}



function afficherConfirmation(arg) {
    let confirmationArticlePresent = document.getElementById('confirmation-article-present');
    let articleName      = document.querySelector('.article-name');
    let lentilleChoisie  = document.querySelector('.options-lentilles');

    if( localStorage.getItem(arg) !== undefined) {
        confirmationArticlePresent.innerHTML= 
            `<div class="alert-actualisation-article alert alert-info py-2 text-center">
                    <strong> ${articleName.innerHTML} ${lentilleChoisie.value} : </strong> actualisé au panier
            </div>`
        setTimeout (function() {
            confirmationArticlePresent.innerHTML = "";
        }, 1500)
    }

    if( localStorage.getItem(arg) == undefined) {
            confirmationArticlePresent.innerHTML= 
            `<div class=" alert-ajout-article alert alert-info py-2 text-center">
                    <strong> ${articleName.innerHTML} ${lentilleChoisie.value} : </strong> ajouté au panier
            </div>`
        setTimeout (function() {
            confirmationArticlePresent.innerHTML = "";
        }, 1500)
    }
}

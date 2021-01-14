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
    let confirmationArticlePresent = document.getElementById('confirmation-article-present');


    
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

        if( localStorage.getItem(articleChoisiKEY) !== undefined) {
            confirmationArticlePresent.innerHTML= 
                `<div class="alert-actualisation-article alert alert-info alert-dismissible py-2 text-center">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>NOTE : </strong>Article ${articleName.innerHTML} ${lentilleChoisie.value} actualisé et rajouté au panier
                </div>`

            setTimeout (function() {
                confirmationArticlePresent.innerHTML = "";
            }, 2000)
        }

        if( localStorage.getItem(articleChoisiKEY) == undefined) {
                confirmationArticlePresent.innerHTML= 
                `<div class=" alert-ajout-article alert alert-info alert-dismissible py-2 text-center">
                        <button type="button" class="close" data-dismiss="alert">&times;</button>
                        <strong>NOTE : </strong>Article ${articleName.innerHTML} ${lentilleChoisie.value} a bien été ajouté au panier
                </div>`
            setTimeout (function() {
                confirmationArticlePresent.innerHTML = "";
            }, 2000)
        }

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

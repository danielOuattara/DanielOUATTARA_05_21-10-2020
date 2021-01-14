// import { sendXHR } from './sendXHR.js';
import { updatePanierHeader } from './updatePanierHeader.js'
import { afficherData } from './produit_afficher.js'
import { capterOptionLentilles, capterNombreArticleChoisi, capterPrixTotal } from './produit_capteurs.js'
import { creationOptionLentilles, creationOptionQuantite } from './produit_creationOptions.js'


export function ajouterAuPanier(data) {
    let btnAjouterPanier = document.querySelector('.ajoutez-panier');

    btnAjouterPanier.addEventListener('click', () => {

        // capter toutes les données de l'article au "click"
        let articleName      = document.querySelector('.article-name');
        let articleID        = data._id;
        let articleImageUrl  = document.querySelector('.hover-image');
        let lentilleChoisie  = document.querySelector('.options-lentilles');
        let quantiteChoisie  = document.querySelector('.quantite-article');
        let articlePrix      = document.querySelector('.article-prix');
        let prixTotal        = document.querySelector('#prix-total');

        // creer un Array qui stocke les données précédentes
        let articleChoisi = [ 
                articleName.innerHTML, 
                articleID, 
                articleImageUrl.src, 
                lentilleChoisie.value, 
                quantiteChoisie.value, 
                articlePrix.textContent, 
                prixTotal.textContent
        ];

        // créer une clef par choix d'article pour localStorage
        let articleChoisiKEY = articleName.innerHTML.replace(/\s/, "_")+ "_" + articleID.trim() + "_" + lentilleChoisie.value.replace(/\s/, "_");

        // stocker contenu dans la localStorage
        let articleChoisiJSON = JSON.stringify(articleChoisi);
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
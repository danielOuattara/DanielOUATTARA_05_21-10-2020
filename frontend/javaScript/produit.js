import { sendXHR } from './sendXHR.js';
import { updatePanierHeader } from './updatePanierHeader.js'
import { afficherData, animationImageProduit } from './produit_afficher.js'
import { ajouterAuPanier } from './produit_ajouterPanier.js'
import { capterOptionLentilles, capterNombreArticleChoisi, capterPrixTotal } from './produit_capteurs.js'
import { creationOptionLentilles, creationOptionQuantite } from './produit_creationOptions.js'

let produit_id = window.location.href.match(/[^=]+$/).toString();

function controlerButtonAllerPanier() {
    if (localStorage.length == 0 ) {
        document.querySelector('.aller-panier').style.display= "none";
    } else {
        document.querySelector('.aller-panier').style.display = "visible";
    }
}


// Requêter les données pour 1 produit 
document.addEventListener("DOMContentLoaded", () => {
    sendXHR('GET', 'http://localhost:3000/api/cameras/'+produit_id)
        .then(data => {
            afficherData(data);
            creationOptionLentilles(data.lenses);
            creationOptionQuantite();
            capterOptionLentilles();
            capterNombreArticleChoisi();
            capterPrixTotal(data.price);
            ajouterAuPanier(data);
        })
        .then(animationImageProduit)
        .then(updatePanierHeader)
        .then(controlerButtonAllerPanier);
});





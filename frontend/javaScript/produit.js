import { sendXHR } from './sendXHR.js';
import { updatePanierHeader } from './updatePanierHeader.js'
import { afficherData, animationImageProduit } from './produit_afficher.js'
import { ajouterAuPanier } from './produit_ajouterPanier.js'
import { capterOptionLentilles, capterNombreArticleChoisi, capterPrixTotal } from './produit_capteurs.js'
import { creationOptionLentilles, creationOptionQuantite } from './produit_creationOptions.js'

let produit_id = window.location.href.match(/[^=]+$/).toString();



// function afficherData(data) {

//     const { name, price, description, imageUrl} = data;
//     let produit       = document.querySelector('.contenu-js');
//     produit.innerHTML =  `
//                             <div id="bloc-article" class="jumbotron border border-primary rounded">
//                                 <h1 class="text-center mb-3 display-4 article-name">${name}</h1>
//                                 <div class="d-inline-flex flex-column flex-md-row articles">
//                                     <div class="flex-fill">
//                                         <div class="container">
//                                             <div class="modal" id="image-modal">
//                                                 <div class="modal-dialog modal-xl">
//                                                     <div class="modal-content">              
//                                                         <div class="modal-header">
//                                                             <h3 class="modal-title">${name} </h3>
//                                                             <button type="button" class="btn btn-danger" data-dismiss="modal">Fermez</button>
//                                                         </div>
//                                                         <img src=${imageUrl} alt=" oricamera ${name}, ${description}" class="img-thumbnail img-fluid mx-auto d-block"/>                                         
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <a href="#" data-toggle="modal" data-target="#image-modal">
//                                             <img src=${imageUrl} id="#" alt=" oricamera ${name}, ${description}" width=400 class=" hover-image img-thumbnail img-fluid mx-auto d-block"/>
//                                         </a>
//                                     </div>
//                                 </div>
                                
//                                 <div class="flex-fill text-center pl-md-4">
//                                     <p class="text-left text-sm-center">${description}</p> 
//                                     <div class="form-group form-inline my-1 pl-4">
//                                         <label>Lentilles : </label>
//                                         <select class="form-control ml-3 col-sm-3 options-lentilles"><!--Contenu généré dynamiquement --></select>
//                                     </div>
//                                     <h4 class= "my-4 pl-4 text-left">Prix unité :  <span class="article-prix">${price/100}</span>€</h4>
//                                     <div class="form-group form-inline pl-4">
//                                         <label>Quantité :</label>
//                                         <select class="form-control ml-3 col-3 col-sm-3 quantite-article"><!--Contenu généré dynamiquement --></select>
//                                     </div> 
//                                     <h3 class=" prix-total text-left text-light bg-secondary border rounded d-inline-block p-2" >Total : <span id="prix-total">${price/100}</span>€</h3>
//                                 </div>

//                                 <div class="d-flex flex-column flex-md-row justify-content-md-around  ">
//                                     <a class=" bouton-lien-produit btn m-2 py-2 revenir-vitrine bouton-decouvrir text-center" href='./../index.html'> <i class="far fa-caret-square-left"></i>&nbsp;&nbsp;Continuer mes achats </a>
//                                     <button class=" bouton-lien-produit btn  m-2 py-2 ajoutez-panier bouton-decouvrir text-center"> <i class="fas fa-cart-arrow-down"></i>&nbsp;&nbsp; Ajouter au panier</button>
//                                     <a class=" bouton-lien-produit btn m-2 py-2 aller-panier bouton-decouvrir text-center" href="./../html/panier.html"><i class="fas fa-shopping-basket"></i>&nbsp;&nbsp; Aller au panier </a>
//                                 </div>
//                             </div>
    
//                         `;
// }





// function animationImageProduit() {

//     let imageProduit = document.querySelector('.hover-image');
//     imageProduit.addEventListener('mouseover', function() {
//         this.style.opacity ='0.75';
//         this.style.scale ='1.1';
//         this.style.transition ='all 350ms';
//     });
//     imageProduit.addEventListener('mouseout', function() {
//         this.style.opacity ='1'
//         this.style.scale ='1'
//     });
// }


// function capterOptionLentilles () {
    
//     let selectOptionsLentilles = document.querySelector('.options-lentilles');
//     let lentilleChoisie = selectOptionsLentilles.value;    
//     selectOptionsLentilles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs des otpions lentilles
//         lentilleChoisie = event.target.value;
//     })
// }


// function capterNombreArticleChoisi() {

//     let selectQuantiteArticles = document.querySelector('.quantite-article');
//     let quantiteChoisie = selectQuantiteArticles.value;
//     selectQuantiteArticles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs quantite et €
//         quantiteChoisie = event.target.value;
//     })
// }


// function capterPrixTotal(price) {

//     let selectQuantiteArticles = document.querySelector('.quantite-article');
//     let prixTotal = document.querySelector('#prix-total')

//     selectQuantiteArticles.addEventListener('change', (event)=> {
//         prixTotal.innerHTML = event.target.value * (price/100);
//     });
// }


function controlerButtonAllerPanier() {
    if (localStorage.length == 0 ) {
        document.querySelector('.aller-panier').style.display= "none";
    } else {
        document.querySelector('.aller-panier').style.display = "visible";
    }
}



// function alerteAjoutPanier() {}  // A completer
    

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



// function ajouterAuPanier(data) {
//     let btnAjouterPanier = document.querySelector('.ajoutez-panier');

//     btnAjouterPanier.addEventListener('click', () => {

//         // capter toutes les données de l'article au "click"
//         let articleName      = document.querySelector('.article-name');
//         let articleID        = data._id;
//         let articleImageUrl  = document.querySelector('.hover-image');
//         let lentilleChoisie  = document.querySelector('.options-lentilles');
//         let quantiteChoisie  = document.querySelector('.quantite-article');
//         let articlePrix      = document.querySelector('.article-prix');
//         let prixTotal        = document.querySelector('#prix-total');

//         // creer un Array qui stocke les données précédentes
//         let articleChoisi = [ 
//                 articleName.innerHTML, 
//                 articleID, 
//                 articleImageUrl.src, 
//                 lentilleChoisie.value, 
//                 quantiteChoisie.value, 
//                 articlePrix.textContent, 
//                 prixTotal.textContent
//         ];

//         // créer une clef par choix d'article pour localStorage
//         let articleChoisiKEY = articleName.innerHTML.replace(/\s/, "_")+ "_" + articleID.trim() + "_" + lentilleChoisie.value.replace(/\s/, "_");

//         // stocker contenu dans la localStorage
//         let articleChoisiJSON = JSON.stringify(articleChoisi);
//         localStorage.setItem(articleChoisiKEY, articleChoisiJSON);

//         updatePanierHeader()
//         afficherData(data)
//         creationOptionLentilles(data.lenses)
//         creationOptionQuantite()
//         capterOptionLentilles()
//         capterNombreArticleChoisi()
//         capterPrixTotal(data.price)
//         ajouterAuPanier(data);
//     });
// }

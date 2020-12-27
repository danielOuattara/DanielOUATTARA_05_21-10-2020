import { sendXHR } from './sendXHR.js';
import { updatePanierHeader} from './updatePanierHeader.js'


let produit_id = window.location.href.match(/[^=]+$/).toString();


function afficherData(data) {

    const { name, price, description, imageUrl} = data;
    let produit       = document.querySelector('.contenu-js');
    produit.innerHTML =  `
                            <div class="jumbotron border border-primary rounded">
                            <h1 class="text-center mb-3 display-4 article-name">${name}</h1>
                            <div class="d-inline-flex flex-column flex-md-row articles">
                                <div class="flex-fill">
                                    <div class="container">
                                        <div class="modal" id="image-modal">
                                            <div class="modal-dialog modal-xl">
                                            <div class="modal-content">              
                                                <div class="modal-header">
                                                <h3 class="modal-title">${name} </h3>
                                                <button type="button" class="btn btn-danger" data-dismiss="modal">Fermez</button>
                                                </div>
                                                <img src=${imageUrl} alt="" class="img-thumbnail img-fluid mx-auto d-block">                                         
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    <a href="#" data-toggle="modal" data-target="#image-modal">
                                        <img src=${imageUrl} id="" width=600 alt="" class=" hover-image img-thumbnail img-fluid mx-auto d-block">
                                    </a>
                                </div>
                                <div class="flex-fill  text-center pl-md-4">
                                    <p class="text-left text-sm-center">${description}</p> 
                                    <div class="form-group form-inline my-1 pl-4">
                                        <label for="option"><h4>Lentilles : </h4></label>
                                        <select class="form-control ml-3 col-sm-3 options-lentilles"><!--Contenu généré dynamiquement --></select>
                                    </div>
                                    <h4 class= "my-4 pl-4 text-left ">Prix unité :  <span class="article-prix">${price/100}</span>€</h4>
                                    <div class="form-group form-inline  pl-4">
                                        <label for="quantite"><h4>Quantité : </h4></label>
                                        <select class="form-control ml-3 col-3 col-sm-3 quantite-article"><!--Contenu généré dynamiquement --></select>
                                    </div> 
                                    <h3 class="text-left text-light bg-secondary border rounded d-inline-block p-2" >Total : <span id="prix-total">${price/100}</span>€</h3>
                                </div>
                            </div>
                            <div class="d-flex flex-column flex-md-row justify-content-md-around ">
                                <a class=" my-1 btn btn-info revenir-vitrine" href="./../html/index.html">Revenir en vitrine</a>
                                <button class="btn btn-success my-1 ajoutez-panier">Ajoutez au panier</button>
                                <a class="btn btn-info my-1 aller-panier" href="./../html/panier.html">Allez au panier</a>
                            <div>
                        </div>
                        `;
}


function creationOptionLentilles(lenses) {

    let selectOptionsLentilles = document.querySelector('.options-lentilles');
    for ( let i = 0 ; i < lenses.length ; i++ ) {
        let optionLentille = document.createElement('option');
        optionLentille.setAttribute("value", lenses[i] );
        let contenuOption = document.createTextNode(lenses[i]);
        optionLentille.appendChild(contenuOption);
        selectOptionsLentilles.appendChild(optionLentille);
    }
}


function creationOptionQuantite() {
 
    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let quantiteMaxArticles = 100;
    for ( let i = 1 ; i <= quantiteMaxArticles; i++ ) {
        let optionQuantiteArticles = document.createElement('option');
        optionQuantiteArticles.setAttribute("value", i);
        let quantiteArticlesChoisie_valeur = document.createTextNode(i);
        optionQuantiteArticles.appendChild(quantiteArticlesChoisie_valeur);
        selectQuantiteArticles.appendChild(optionQuantiteArticles);
    }
}


function animationImageProduit() {

    let imageProduit = document.querySelector('.hover-image');
    imageProduit.addEventListener('mouseover', function() {
        this.style.opacity ='0.75';
        this.style.scale ='1.1';
        this.style.transition ='all 350ms';
    });
    imageProduit.addEventListener('mouseout', function() {
        this.style.opacity ='1'
        this.style.scale ='1'
    });
}


function capterOptionLentilles () {
    
    let selectOptionsLentilles = document.querySelector('.options-lentilles');
    let lentilleChoisie = selectOptionsLentilles.value;    
    selectOptionsLentilles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs des otpions lentilles
        lentilleChoisie = event.target.value;
    })
}


function capterNombreArticleChoisi() {

    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let quantiteChoisie = selectQuantiteArticles.value;
    console.log('quantité choisie = ', quantiteChoisie)
    selectQuantiteArticles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs quantite et €
        quantiteChoisie = event.target.value;
    })
}


function capterPrixTotal(price) {

    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let prixTotal = document.querySelector('#prix-total')

    selectQuantiteArticles.addEventListener('change', (event)=> {
        prixTotal.innerHTML = event.target.value * (price/100);
    });
}

console.log("localStorage.length =", localStorage.length)




function controlerButtonAllerPanier() {
    if (localStorage.length == 0 ) {
        document.querySelector('.aller-panier').style.display= "none";
    } else {
        document.querySelector('.aller-panier').style.display = "visible";
    }
}



// function alerteAjoutPanier() {}  // A completer
    

// Afficher page produit et capter les changements client
document.addEventListener("DOMContentLoaded", () => {

    sendXHR('GET', 'http://localhost:3000/api/cameras/'+produit_id)
        
        .then(data => {
            console.log(data);
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



function ajouterAuPanier(data) {

    let btnAjouterPanier = document.querySelector('.ajoutez-panier');

    btnAjouterPanier.addEventListener('click', () => {

        // capter toutes les données de l'article au "click"
        let articleName      = document.querySelector('.article-name');
        let articleID        = data._id;
        let articleImageUrl  = document.querySelector('.hover-image');
        let lentilleChoisie  = document.querySelector('.options-lentilles');
        let quantiteChoisie  = document.querySelector('.quantite-article');
        let articlePrix      = document.querySelector('.article-prix');
        let prixTotal        = document.querySelector('#prix-total')
        // let clickCount = 0;

        // creer un array qui stocke les données précédentes
        let articleChoisie = [ articleName.innerHTML, articleID, articleImageUrl.src, 
                               lentilleChoisie.value, quantiteChoisie.value, articlePrix.textContent, prixTotal.textContent];

        // creer un nom  de clef pour localStorage
        let articleChoisieKEY = articleName.innerHTML.replace(/\s/, "_")+ "_" + articleID.trim() + "_" + lentilleChoisie.value.replace(/\s/, "_");

        // stocker contenu dans la localStorage
        let articleChoisieJSON = JSON.stringify(articleChoisie);
        localStorage.setItem(articleChoisieKEY, articleChoisieJSON);

        updatePanierHeader()
        afficherData(data)
        creationOptionLentilles(data.lenses);
        creationOptionQuantite();
        capterOptionLentilles();
        capterNombreArticleChoisi();
        capterPrixTotal(data.price);
    });
}

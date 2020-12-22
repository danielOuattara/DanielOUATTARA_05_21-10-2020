import { sendXHR } from './sendXHR.js';
import { updatePanierHeader } from './updatePanierHeader.js'


let produit_id = window.location.href.match(/[^=]+$/).toString();


function afficherData(data) {

    const { _id, name, price, description, imageUrl} = data;
    let produit       = document.querySelector('.contenu-js');
    produit.innerHTML =  `
                <div class="jumbotron">
                    <h1 class="text-center mb-5 display-4 article-name">${name}</h1>
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
                            <h5 class="text-center mt-4 ">Référence Art. : <span class="article-id"> ${_id}</span>   </h5>
                        </div>
                        <div class="flex-fill  text-center pl-4">
                            <p class="text-left text-sm-center">${description}</p> 
                            <div class="form-group form-inline my-4 pl-4">
                                <label for="option"><h4>Lentilles : </h4></label>
                                <select class="form-control ml-3 col-sm-3 options-lentilles"><!--Contenu généré dynamiquement --></select>
                            </div>
                            <h4 class= "my-4 pl-4 text-left ">Prix article :  <span class="article-prix">${price/100}</span>€</h4>
                            <div class="form-group form-inline  pl-4">
                                <label for="quantite"><h4>Quantité : </h4></label>
                                <select class="form-control ml-3 col-sm-3 quantite-article"><!--Contenu généré dynamiquement --></select>
                            </div> 
                            <h4 class="pl-4 text-left">Total : <span id="prix-total">${price/100}</span>€</h4>
                        </div>
                    </div>

`;
        return produit.innerHTML;
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
        console.log(`lentilles nouvelles = ${lentilleChoisie}`)
        console.log(lentilleChoisie)
    })
    return lentilleChoisie;
}


function capterNombreArticleChoisi() {

    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let quantiteChoisie = selectQuantiteArticles.value;
    console.log('quantité choisie = ', quantiteChoisie)
    selectQuantiteArticles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs quantite et €
        quantiteChoisie = event.target.value;
        console.log('quantité choisie = ', quantiteChoisie);
    })
    return quantiteChoisie;
}


function capterPrixTotal(price) {

    let selectQuantiteArticles = document.querySelector('.quantite-article');
    // console.log(price)
    let prixTotal = document.querySelector('#prix-total')

    selectQuantiteArticles.addEventListener('change', (event)=> {
        prixTotal.innerHTML = event.target.value * (price/100);
        console.log("prix Total = ", prixTotal.innerHTML)
    });
    //return prixTotal.innerHTML;
}



// function ajouterPanier(data) {
//     // document.querySelector('.aller-panier').style.display = "visible"
//     let btnAjouterPanier = document.querySelector('.ajoutez-panier');
//     let lentilleChoisie  = document.querySelector('.options-lentilles');
//     let quantiteChoisie  = document.querySelector('.quantite-article');
//     let prixTotal        = document.querySelector('#prix-total')
//     let clickCount = 0;
    
//     // btnAjouterPanier.addEventListener('click', (event) => {
//         // let produit_id = window.location.href.match(/[^=]+$/).toString();
//         // sendXHR('GET', 'http://localhost:3000/api/cameras/'+produit_id)
//         clickCount ++;
//         console.log('clickCount = ',  clickCount)

//         let articleChoisie = [ data.name, data._id, data.imageUrl, lentilleChoisie.value, quantiteChoisie.value, data.price/100, prixTotal.textContent ];

//         console.table(articleChoisie);

//         let articleChoisieKEY = data.name.replace(/\s/, "_")+ "_" + data._id.trim() + "_" + lentilleChoisie.value.replace(/\s/, "_");
//         console.log("articleChoisieKEY =" , articleChoisieKEY)

//         if (clickCount > 1 && localStorage(articleChoisieKEY) !== undefined) {
//             console.log("Article déjà ajouté")
//         }
//          else {

//         let articleChoisieJSON = JSON.stringify(articleChoisie);
//         localStorage.setItem(articleChoisieKEY, articleChoisieJSON);

//         console.log("localStorage.length =", localStorage.length)

//         console.log(localStorage.getItem(articleChoisieKEY));

//         produit.innerHTML += 
//             ` <div class=" ajouter-panier-confirmation alert alert-success alert-dismissible fade show">
//                 <button type="button" class="close" data-dismiss="alert">&times;</button>
//                 Article <strong> ${data.name} </strong> a bien été ajouté au panier.
//             </div>
//             `

//         // $('.ajouter-panier-confirmation').modal('toggle')

//          }

//     // });
// }


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
            ajouterPanierListener();
        })
        .then(animationImageProduit)
        .then(updatePanierHeader)
});


function ajouterPanierListener() {

    let btnAjouterPanier = document.querySelector('.ajoutez-panier');

    btnAjouterPanier.addEventListener('click', () => {

        let articleName      = document.querySelector('.article-name');
        let articleID        = document.querySelector('.article-id');
        let articleImageUrl  = document.querySelector('.hover-image');
        let lentilleChoisie  = document.querySelector('.options-lentilles');
        let quantiteChoisie  = document.querySelector('.quantite-article');
        let articlePrix      = document.querySelector('.article-prix');
        let prixTotal        = document.querySelector('#prix-total')
        let clickCount = 0;

        let articleChoisie = [ articleName.innerHTML, articleID.innerHTML, articleImageUrl.src, 
            lentilleChoisie.value, quantiteChoisie.value, articlePrix.textContent, prixTotal.textContent];

        console.table(articleChoisie);
        clickCount ++;

        let articleChoisieKEY = articleName.innerHTML.replace(/\s/, "_")+ "_" + articleID.innerHTML.trim() + "_" + lentilleChoisie.value.replace(/\s/, "_");
        console.log("articleChoisieKEY =" , articleChoisieKEY)

        // if (clickCount > 1 && localStorage(articleChoisieKEY) !== undefined) {
        // console.log("Article déjà ajouté")
        // }
        // else {

        let articleChoisieJSON = JSON.stringify(articleChoisie);
        localStorage.setItem(articleChoisieKEY, articleChoisieJSON);

        console.log("localStorage.length =", localStorage.length)

        console.log(localStorage.getItem(articleChoisieKEY));

        produit.innerHTML += 
        ` <div class=" ajouter-panier-confirmation alert alert-success alert-dismissible fade show">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        Article <strong> ${articleName.innerHTML} </strong> a bien été ajouté au panier.
        </div>
        `

        updatePanierHeader()
    });







}
// window.addEventListener('load', () => {

    // let btnAjouterPanier = document.querySelector('.ajoutez-panier');

    // btnAjouterPanier.addEventListener('click', () => {

    //     let articleName      = document.querySelector('.article-name');
    //     let articleID        = document.querySelector('.article-id');
    //     let articleImageUrl  = document.querySelector('.hover-image');
    //     let lentilleChoisie  = document.querySelector('.options-lentilles');
    //     let quantiteChoisie  = document.querySelector('.quantite-article');
    //     let articlePrix      = document.querySelector('.article-prix');
    //     let prixTotal        = document.querySelector('#prix-total')
    //     let clickCount = 0;

    //     let articleChoisie = [ articleName.innerHTML, articleID.innerHTML, articleImageUrl.src, 
    //         lentilleChoisie.value, quantiteChoisie.value, articlePrix.textContent, prixTotal.textContent];

    //     console.table(articleChoisie);
    //     clickCount ++;

    //     let articleChoisieKEY = articleName.innerHTML.replace(/\s/, "_")+ "_" + articleID.innerHTML.trim() + "_" + lentilleChoisie.value.replace(/\s/, "_");
    //     console.log("articleChoisieKEY =" , articleChoisieKEY)

    //     // if (clickCount > 1 && localStorage(articleChoisieKEY) !== undefined) {
    //     // console.log("Article déjà ajouté")
    //     // }
    //     // else {

    //     let articleChoisieJSON = JSON.stringify(articleChoisie);
    //     localStorage.setItem(articleChoisieKEY, articleChoisieJSON);

    //     console.log("localStorage.length =", localStorage.length)

    //     console.log(localStorage.getItem(articleChoisieKEY));

    //     produit.innerHTML += 
    //     ` <div class=" ajouter-panier-confirmation alert alert-success alert-dismissible fade show">
    //     <button type="button" class="close" data-dismiss="alert">&times;</button>
    //     Article <strong> ${articleName.innerHTML} </strong> a bien été ajouté au panier.
    //     </div>
    //     `

    //     updatePanierHeader()
    // });
// });






// function ajouterPanier(data) {
   

//         clickCount ++;
//         console.log('clickCount = ',  clickCount)

//         let articleChoisie = [ data.name, data._id, data.imageUrl, lentilleChoisie.value, quantiteChoisie.value, data.price/100, prixTotal.textContent ];

//         console.table(articleChoisie);

//         let articleChoisieKEY = data.name.replace(/\s/, "_")+ "_" + data._id.trim() + "_" + lentilleChoisie.value.replace(/\s/, "_");
//         console.log("articleChoisieKEY =" , articleChoisieKEY)

//         if (clickCount > 1 && localStorage(articleChoisieKEY) !== undefined) {
//             console.log("Article déjà ajouté")
//         }
//          else {

//         let articleChoisieJSON = JSON.stringify(articleChoisie);
//         localStorage.setItem(articleChoisieKEY, articleChoisieJSON);

//         console.log("localStorage.length =", localStorage.length)

//         console.log(localStorage.getItem(articleChoisieKEY));

//         produit.innerHTML += 
//             ` <div class=" ajouter-panier-confirmation alert alert-success alert-dismissible fade show">
//                 <button type="button" class="close" data-dismiss="alert">&times;</button>
//                 Article <strong> ${data.name} </strong> a bien été ajouté au panier.
//             </div>
//             `

//         // $('.ajouter-panier-confirmation').modal('toggle')

//          }

//     // });
// }

















//  Back up
    // alert fadeIn/ fadeOut
    //     produit.innerHTML += ` <div class="alert alert-success" id="success-alert">
    //     <button type="button" class="close" data-dismiss="alert">x</button>
    //     <strong>Success! </strong> Product have added to your wishlist.
    //   </div>`
    //     $(document).ready(function() {
    //         $("#success-alert").hide();
    //         $("#myWish").click(function showAlert() {
    //           $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
    //             $("#success-alert").slideUp(500);
    //           });
    //         });
    //       });

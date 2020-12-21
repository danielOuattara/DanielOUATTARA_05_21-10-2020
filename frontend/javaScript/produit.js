import { sendXHR } from './sendXHR.js';
import { updatePanierHeader } from './updatePanierHeader.js'


// let quantiteChoisie = 1; 

async function __afficherData__(data) {

    const {lenses, _id, name, price, description, imageUrl} = data;
    let produit       = document.querySelector('#produit');
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
                        <h4 class= "my-5 pl-4 text-left ">Prix unité :  <span class="article-prix">${price/100}</span>€</h4>
                        <div class="form-group form-inline  pl-4">
                            <label for="quantite"><h4>Quantité : </h4></label>
                            <select class="form-control ml-3 col-sm-3 quantite-article"><!--Contenu généré dynamiquement --></select>
                        </div> 
                        <h3>Total : <span id="prix-total">${price/100}</span>€</h3>
                        <button class="btn btn-info mt-4 ajoutez-panier">Ajoutez au panier</button>
                    </div>
                </div>
                <div class="d-md-flex justify-content-between ">
                    <a class="btn btn-info mt-4 revenir-vitrine" href="./../html/index.html">Revenir en vitrine</a>
                    <a class="btn btn-info mt-4 ajoutez-panier" href="./../html/panier.html">Allez au panier</a>
                <div>
            </div>`;

    
    // Création des options lentilles:
    let selectOptionsLentilles = document.querySelector('.options-lentilles');
    let i;
    for(i = 0 ; i < lenses.length ; i++) {
        let optionLentille = document.createElement('option');
        optionLentille.setAttribute("value", lenses[i] );
        let contenuOption = document.createTextNode(lenses[i]);
        optionLentille.appendChild(contenuOption);
        selectOptionsLentilles.appendChild(optionLentille);
    }

    // Création option pour la quantité choisie pour 1 article: 
    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let quantiteMaxArticles = 100;
    for( i = 1 ; i <= quantiteMaxArticles; i++ ) {
        let optionQuantiteArticles = document.createElement('option');
        optionQuantiteArticles.setAttribute("value", i);
        let quantiteArticlesChoisie_valeur = document.createTextNode(i);
        optionQuantiteArticles.appendChild(quantiteArticlesChoisie_valeur);
        selectQuantiteArticles.appendChild(optionQuantiteArticles);
    }

    // Capter le nombre d'article choisi par un client et prix total
    let quantiteChoisie = selectQuantiteArticles.value;
    selectQuantiteArticles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs quantite et €
        quantiteChoisie = event.target.value;
        console.log('quantité choisie = ', quantiteChoisie);
        return quantiteChoisie;
    })

    //  Calcul du prix total selon quantité article choisi
    let prixTotal = document.querySelector('#prix-total')
    selectQuantiteArticles.addEventListener('change', (event)=> {
        // event.stopPropagation();
        prixTotal.innerHTML = event.target.value * price/100;
        console.log("prix Total = ", prixTotal.innerHTML)
        console.log('-------------------')
        return prixTotal.innerHTML;
    });

    // Capter le type de lentille choisie: 
    let lentilleChoisie = selectOptionsLentilles.value;    
    selectOptionsLentilles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs des otpions lentilles
        lentilleChoisie = event.target.value;
        console.log(`lentilles nouvelles = ${lentilleChoisie}`)
        console.log(lentilleChoisie)
        return lentilleChoisie;
    })
    console.log('--- Affichage Terminé : ----');
}


async function __animationImageProduit__() {

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


async function __ajouterPanier__() {

    let btnAjouterPanier = document.querySelector('.ajoutez-panier');
    let articleName      = document.querySelector('.article-name');
    let articleID        = document.querySelector('.article-id');
    let articleImageUrl  = document.querySelector('.hover-image');
    let lentilleChoisie  = document.querySelector('.options-lentilles');
    let quantiteChoisie  = document.querySelector('.quantite-article');
    let articlePrix      = document.querySelector('.article-prix');
    let prixTotal        = document.querySelector('#prix-total')
    let clickCount = 0;
    
    btnAjouterPanier.addEventListener('click', (event) => {
        clickCount ++;
        console.log('clickCount = ',  clickCount)

        // event.preventDefault();
        // event.stopPropagation();
        let articleChoisie = [ articleName.innerHTML, articleID.innerHTML, articleImageUrl.src, 
                               lentilleChoisie.value, quantiteChoisie.value, articlePrix.textContent, prixTotal.textContent
                             ];

        console.table(articleChoisie);

        let articleChoisieKEY = articleName.innerHTML.replace(/\s/, "_")+ "_" + articleID.innerHTML.trim() + "_" + lentilleChoisie.value.replace(/\s/, "_");
        console.log("articleChoisieKEY =" , articleChoisieKEY)

        if (clickCount > 1 && localStorage(articleChoisieKEY) !== undefined) {
            console.log("Article déjà ajouté")
        }
         else {

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

        // $('.ajouter-panier-confirmation').modal('toggle')

         }

    });
}

// Obtenir les données pour 1 produit 
document.addEventListener("DOMContentLoaded", () => {

    let produit_id = window.location.href.match(/[^=]+$/).toString();

    sendXHR('GET', 'http://localhost:3000/api/cameras/'+produit_id)
        .then(item =>__afficherData__(item))
        .catch(errorResponseData => {
            const error = new Error ("Error in  vitrine rendering");
            error.data = errorResponseData;
            throw error;
        })
        .then(__animationImageProduit__)
        .then(__ajouterPanier__)
        .then(updatePanierHeader)
});




// let buttonAjouterPanier = document.querySelector('.ajoutez-panier')
//     // Ajouter un article au panier
//     async function ajouterAuPanier () {
    
        
//         buttonAjouterPanier.addEventListener('click', (event) => {
//             // let clickCount = 0;
//             // console.log(buttonAjouterPanier);
//             // clickCount ++;

//             // if (clickCount > 1) {

//             //     console.log(`clickCount =  ${clickCount}`);
//                 // produit.innerHTML +=  
//                 // ` <div class="alert alert-warning alert-dismissible fade show">
//                 //     <button type="button" class="close" data-dismiss="alert">&times;</button>
//                 //     <strong>Success!</strong> This alert box could indicate a successful or positive action.
//                 //   </div>
//                 // `
//             //}
//             let identifiant = name + " | "  + lentilleChoisie;
//             let articleChoisie = [name, _id, imageUrl, lentilleChoisie, quantiteChoisie, prixTotal.textContent, price/100];
//             console.log(`articleChoisie =  ${articleChoisie}`);
//             let articleChoisieJSON = JSON.stringify(articleChoisie);
//             localStorage.setItem(identifiant, articleChoisieJSON);

//             console.log(`localStorageLength = `, localStorage.length)

//             produit.innerHTML += 
//             ` <div class="alert alert-success alert-dismissible fade show">
//                 <button type="button" class="close" data-dismiss="alert">&times;</button>
//                 Article <strong>${name}</strong> a bien été ajouté au panier.
//             </div>
//             `
//         });
//     }

// ajouterAuPanier();


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

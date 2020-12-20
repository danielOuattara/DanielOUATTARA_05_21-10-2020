import { sendXHR } from './sendXHR.js';
import { updatePanierHeader } from './updatePanierHeader.js'


//let quantiteChoisie = 1; 

async function afficherData(data) {
    const {lenses, _id, name, price, description, imageUrl } = data;
    let produit = document.querySelector('#produit');
    produit.innerHTML =  `
                <div class="jumbotron">
                <h1 class="text-center mb-5 display-4">${name}</h1>
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
                        <h5 class="text-center mt-4">Référence Art. : ${_id}</h5>
                    </div>
                    <div class="flex-fill  text-center pl-4">
                        <p class="text-left text-sm-center">${description}</p> 
                        <div class="form-group form-inline my-4 pl-4">
                            <label for="option"><h4>Lentilles : </h4></label>
                            <select class="form-control ml-3 col-sm-3 options-lentilles"><!--Contenu généré dynamiquement --></select>
                        </div>
                        <h4 class= "my-5 pl-4 text-left">Prix unité : ${price / 100}€</h4>
                        <div class="form-group form-inline  pl-4">
                            <label for="quantite"><h4>Quantité : </h4></label>
                            <select class="form-control ml-3 col-sm-3 quantite-article"><!--Contenu généré dynamiquement --></select>
                        </div> 
                        <h3>Total : <span id="prix-total">${price / 100}</span>€</h3>
                        <button class="btn btn-info mt-4 ajoutez-panier">Ajoutez au panier</button>
                    </div>
                </div>
                <div class="d-md-flex justify-content-between ">
                    <a class="btn btn-info mt-4 revenir-vitrine" href="./../html/index.html">Revenir en vitrine</a>
                    <a class="btn btn-info mt-4 ajoutez-panier" href="./../html/panier.html">Allez au panier</a>
                <div>
            </div>`;



    // ajustement des options lentilles:
    let selectOptionsLentilles = document.querySelector('.options-lentilles');
    let i;
    for(i = 0 ; i < lenses.length ; i++) {
        let optionLentille = document.createElement('option');
        optionLentille.setAttribute("value", lenses[i] );
        let contenuOption = document.createTextNode(lenses[i]);
        optionLentille.appendChild(contenuOption);
        selectOptionsLentilles.appendChild(optionLentille);
    }


    // Controle de la quantité choisie pour 1 article: 
    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let quantiteMaxArticles = 100;
    for( i = 1 ; i <= quantiteMaxArticles; i++ ) {
        let optionQuantiteArticles = document.createElement('option');
        optionQuantiteArticles.setAttribute("value", i);
        let quantiteArticlesChoisie_valeur = document.createTextNode(i);
        optionQuantiteArticles.appendChild(quantiteArticlesChoisie_valeur);
        selectQuantiteArticles.appendChild(optionQuantiteArticles);
    }

    //  Calcul du prix total selon quantité articles choisies
    let prixTotal = document.querySelector('#prix-total')
    selectQuantiteArticles.addEventListener('change', (event)=> {
        prixTotal.innerHTML = event.target.value * price/100;
    });

    // Capter le nombre d'article choisi par un client et prix total
    let quantiteChoisie = selectQuantiteArticles.value;
    console.log(`prixTotal initial  = `, prixTotal.textContent)
    selectQuantiteArticles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs quantite et €
        quantiteChoisie = event.target.value;
        console.log('qunaité choisie = ', quantiteChoisie);
    })


    // Capter le type de lentille choisie: 
    let lentilleChoisie = selectOptionsLentilles.value;    
    selectOptionsLentilles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs des otpions lentilles
        lentilleChoisie = event.target.value;
        console.log(`lentilles nouvelles = ${lentilleChoisie}`)
    })
    console.log('-------');

}



async function aminationImageProduit() {

        let imageProduit = document.querySelector('.hover-image');
        console.log(imageProduit);

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



// Obtenir les données par page produit 
document.addEventListener("DOMContentLoaded", () => {

    let produit_id = window.location.href.match(/[^=]+$/).toString();

    sendXHR('GET', 'http://localhost:3000/api/cameras/'+produit_id)
    .then(item =>afficherData(item))
    .catch(errorResponseData => {
        const error = new Error ("Error in  vitrine rendering");
        error.data = errorResponseData;
        throw error;
    })
    .then(aminationImageProduit);

});

let buttonAjouterPanier = document.querySelector('.ajoutez-panier')
    // Ajouter un article au panier
    async function ajouterAuPanier () {
    
        
        buttonAjouterPanier.addEventListener('click', (event) => {
            // let clickCount = 0;
            // console.log(buttonAjouterPanier);
            // clickCount ++;

            // if (clickCount > 1) {

            //     console.log(`clickCount =  ${clickCount}`);
                // produit.innerHTML +=  
                // ` <div class="alert alert-warning alert-dismissible fade show">
                //     <button type="button" class="close" data-dismiss="alert">&times;</button>
                //     <strong>Success!</strong> This alert box could indicate a successful or positive action.
                //   </div>
                // `
            //}
            let identifiant = name + " | "  + lentilleChoisie;
            let articleChoisie = [name, _id, imageUrl, lentilleChoisie, quantiteChoisie, prixTotal.textContent, price/100];
            console.log(`articleChoisie =  ${articleChoisie}`);
            let articleChoisieJSON = JSON.stringify(articleChoisie);
            localStorage.setItem(identifiant, articleChoisieJSON);

            console.log(`localStorageLength = `, localStorage.length)

            produit.innerHTML += 
            ` <div class="alert alert-success alert-dismissible fade show">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                Article <strong>${name}</strong> a bien été ajouté au panier.
            </div>
            `
        });
    }

ajouterAuPanier();

updatePanierHeader();

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

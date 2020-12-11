

let produit = document.querySelector('#produit');
let produit_id = window.location.href.match(/[^=]+$/).toString();

async function dataProduit() { 

    try {
        let result = await fetch('http://localhost:3000/api/cameras/'+produit_id);
        let data = await result.json();
        // console.log(` data = ${data}`)
        
        // destructurer l'object reçu pour construire les données de l'article
        // const {lenses, _id, name, price, description, imageUrl } = data;

        // return {lenses, _id, name, price, description, imageUrl }
        return data;


    } catch (error) {
        console.log(error);
    }
} 

 async function afficherData(data) {
        const {lenses, _id, name, price, description, imageUrl } = data;

        produit.innerHTML =  
                    `
                    <div class="jumbotron">
                    <h1 class="text-center mb-5 display-4">${name}</h1>

                    <div class="d-inline-flex flex-column flex-md-row articles">
                       <div class="flex-fill">

                           <div class="container">
                               <div class="modal" id="image-modal">
                                 <div class="modal-dialog modal-xl">
                                   <div class="modal-content">              
                                     <div class="modal-header">
                                       <button type="button" class="close" data-dismiss="modal">&times;</button>
                                     </div>
                                     <img src=${imageUrl} alt="" class="img-thumbnail img-fluid mx-auto d-block">                                         
                                   </div>
                                 </div>
                               </div>
                             </div>

                           <a href="#" data-toggle="modal" data-target="#image-modal">
                               <img src=${imageUrl} id="hover-image" width=600 alt="" class="img-thumbnail img-fluid mx-auto d-block">
                           </a>
                           <h5 class="text-center mt-4">Référence Art. : ${_id}</h5>
                       </div>

                       <div class="flex-fill  text-center pl-4">
                           <p class="text-left text-sm-center">${description}</p> 

                           <div class="form-group form-inline my-5 pl-4">
                               <label for="option"><h4>Lentilles : </h4></label>
                               <select class="form-control ml-3 col-sm-2 options-lentilles" id=""> 

                                 <!--Contient toutes les options de lentilles générées dynamiquement -->
                                 
                               </select>
                           </div>

                           <h4 class= "my-5 pl-4 text-left">Prix unité : ${price/100}€</h4>
                           
                           <div class="form-group form-inline  pl-4">
                               <label for="quantite"><h4>Quantité : </h4></label>
                               <select class="form-control ml-3 col-sm-2 quantite-article">

                               </select>
                           </div> 

                           <h3>Total : <span id="prix-total">${price/100}</span>€</h3>
                           <button class="btn btn-info mt-4 ajoutez-panier">Ajoutez au panier</button>
                       </div>
                   </div>

                   <div class>
                        <a class="btn btn-info mt-4 ajoutez-panier" href="./../html/index.html">Revenir en vitrine</a>
                        <a class="btn btn-info mt-4 ajoutez-panier" href="./../html/panier.html">Allez au panier</a>
                   <div>

               </div>
                    `;

    // Opacity 50% des images 
    let image_2 = document.getElementById('hover-image')
    image_2.addEventListener('mouseover', function() {
        this.style.opacity ='0.7'
    });
    image_2.addEventListener('mouseout', function() {
        this.style.opacity ='1'
    });

    // ajustement des options lentilles:

    let selectOptionsLentilles = document.querySelector('.options-lentilles');
    let i;
    for(i = 0; i < lenses.length; i++) {
        let optionLentille = document.createElement('option');
        optionLentille.setAttribute("value", lenses[i] );
         let contenuOption = document.createTextNode(lenses[i]);
        optionLentille.appendChild(contenuOption);
        selectOptionsLentilles.appendChild(optionLentille);
    }


    // Controle de la quantité choisie par article unique: 
    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let quantiteMaxArticles = 11;
      for( i = 1 ; i < quantiteMaxArticles; i++ ) {
          let quantiteArticlesChoisie = document.createElement('option');
          quantiteArticlesChoisie.setAttribute("value", i);
          let quantiteArticlesChoisie_valeur = document.createTextNode(i);
          quantiteArticlesChoisie.appendChild(quantiteArticlesChoisie_valeur);
          selectQuantiteArticles.appendChild(quantiteArticlesChoisie);


      }


    //  Calcul du prix total selon quantité articles choisies
    let prixTotal = document.querySelector('#prix-total')
    selectQuantiteArticles.addEventListener('change', (event)=> {
        prixTotal.textContent  = event.target.value * price/100;
    });
              
};


// Créer EventListener pour obtenir les données produits 
document.addEventListener("DOMContentLoaded", () => {

    dataProduit().then(item =>afficherData(item))
    
});





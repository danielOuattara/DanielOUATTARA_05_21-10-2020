

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


        //MAYDAY MAYDAY MAYDAY-------------------------------------------------

            // Voir camera :  Franck JS 105, "la seconde option" n'est pas prédéfinie

            // if (lenses[1] == null) lenses[1] = "" // --> OK , mais pas élégant: affiche vide           

      

            //regulationOption   
            // let optionArticle = document.querySelector('.option-article');
            // if (lenses[1] == null ) optionArticle[1].disabled = "true"  
        
        //----------------------------------------------------------------------

    
        console.log(lenses[0]);
        

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
                           <h4 class="text-center mt-4">Référence Art. : ${_id}</h4>
                       </div>

                       <div class="flex-fill mx-auto text-center pl-4">
                           <p>${description}</p> 

                           <div class="form-group form-inline my-5 pl-4">
                               <label for="option"><h4>Lentilles: </h4></label>
                               <select class="form-control ml-3 col-sm-2" class="option-article">
                                 <option value=${lenses[0]} > ${lenses[0]} </option>
                                 <option value=${lenses[1]} class="option-article"> ${lenses[1]} </option>
                               </select>
                           </div> 

                           <div class="form-group form-inline  pl-4">
                               <label for="quantite"><h4>Quantité : </h4></label>
                               <select class="form-control ml-3 col-sm-2 quantite-article">
                                 <option value=1> 1 </option>
                                 <option value=2> 2 </option>
                                 <option value=3> 3 </option>
                                 <option value=4> 4 </option>
                                 <option value=5> 5 </option>
                                 <option value=6> 6 </option>
                                 <option value=7> 7 </option>
                                 <option value=8> 8 </option>
                                 <option value=9> 9</option>
                                 <option value=10> 10</option>
                               </select>
                           </div> 

                           <h3>total : <span id="prix-total">${price/100}</span>€</h3>
                           <button  class="btn btn-info mt-4" href="#">Ajoutez au panier</button>
                       </div>
                   </div>
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

    //  Calcul du prix total selon quantité articles choisies
    let prixTotal = document.querySelector('#prix-total')
    let quantiteArticle = document.querySelector('.quantite-article');
    quantiteArticle.addEventListener('change', (event)=> {
        prixTotal.textContent  = event.target.value * price/100;
    });


                
};


// Créer EventListener pour obtenir les données produits 
document.addEventListener("DOMContentLoaded", () => {

    dataProduit().then(item =>afficherData(item))
    
});


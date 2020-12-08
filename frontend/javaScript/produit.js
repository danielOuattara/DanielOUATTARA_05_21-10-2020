

let produit = document.querySelector('#produit');
let prixTotal = document.querySelector('#prix-total');
let quantite = document.querySelector('#quantite');


async function dataProduit (produit_id) { 

    try {
        let result = await fetch('http://localhost:3000/api/cameras/'+produit_id);
        let data = await result.json();
        
        let donneesProduit = JSON.parse (data);
        //console.log(`donneesProduits = ${donneesProduit}`);

        // destructurer l'object reçu pour construire les données de l'article
        const {lenses, _id, name, price, description, imageUrl } = donneesProduit;
        return {lenses, _id, name, price, description, imageUrl }


    } catch (error) {
        console.log(error);
    }
    return ;
} 

  function afficherData(data) {

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
                               <img src="http://127.0.0.1:3000/images/vcam_2.jpg" width=600 alt="" class="img-thumbnail img-fluid mx-auto d-block">
                           </a>
                           <h4 class="text-center mt-4">${_id}</h4>
                       </div>

                       <div class="flex-fill mx-auto text-center pl-4">
                           <p>${description}</p> 

                           <div class="form-group form-inline my-5 pl-4">
                               <label for="option"><h4>Options : </h4></label>
                               <select class="form-control ml-3 col-sm-2" id="option">
                                 <option>${lenses[0]}</option>
                                 <option>${lenses[1]}</option>
                               </select>
                           </div> 

                           <div class="form-group form-inline  pl-4">
                               <label for="quantite"><h4>Quantité : </h4></label>
                               <select class="form-control ml-3 col-sm-2" id="quantite">
                                 <option>1</option>
                                 <option>2</option>
                                 <option>3</option>
                                 <option>4</option>
                                 <option>5</option>
                                 <option>6</option>
                                 <option>7</option>
                                 <option>8</option>
                                 <option>9</option>
                                 <option>10</option>
                               </select>
                           </div> 

                           <h3 id="prix-total">total : </h3>
                           <button  class="btn btn-info mt-4" href="#">Ajoutez au panier</button>
                       </div>
                   </div>
               </div>
                    `;
};


// Créer EventListener pour obtenir les données produits 
document.addEventListener("DOMContentLoaded", () => {

    dataProduit('5be1ed3f1c9d44000030b061')
    
    // produitVitrine = dataProduit().then(produits => afficherData(produits));

});


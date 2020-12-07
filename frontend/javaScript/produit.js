let produit = document.querySelector('#produit');
let produitVitrine =[];


async function getProductsData() {
    try {
        let result = await fetch('http://localhost:3000/api/cameras');
        let data = await result.json();
                       
        // extraire les valeurs individuelles à renseigner
        data = data.map (value => {
            const { lenses, _id, name, description, price, imageUrl } = value;
            return { lenses, _id, name, description, price, imageUrl } 
        });

        return infosProduits;

    } catch (error) {
        console.log(error);
    }
} 

async function afficherProduits(infosProduits) {

     infosProduits.forEach(article => {

        //  Afficher articles en vente

        produit.innerHTML +=  
                    `
                    <div class="jumbotron d-flex flex-column flex-md-row articles">
                       <div class="flex-fill">
                          <a href="./produit.html?id=${article._id}" >
                              <img src=${article.imageUrl} width=600 alt="oricono oricamera image ${article.name}" 
                                   class="img-thumbnail mx-auto d-block">
                          </a>
                        </div>
                        <div class="flex-fill mx-auto text-center">
                            <h2 class="mb-4 mt-4"> ${article.name} </h2>
                            <p>${article.description}</p> 
                            <h4>A partir de ${article.price/100}€</h4>
                            <a id=${article._id} class="btn btn-info mt-4" href="./produit.html?id=${article._id}">Découvrez nos modèles</a>
                        </div>
                    </div>
                    `;
    });
};

// Créer EventListener pour obtenir les données produits 
document.addEventListener("DOMContentLoaded", () => {
    
     produitVitrine = getProductsData().then(produits => afficherProduits(produits));

});


let vitrine = document.querySelector('#vitrine');
let produitVitrine =[];


async function getProductsData() {
    try {
        let result = await fetch('http://localhost:3000/api/cameras');
        let data = await result.json();
                       
        // ordonner les objets produits par prix croissant
        let infosProduits = data.sort(function(a, b) {
            return a.price - b.price
        });

        // extraire les valeurs individuelles de tous à renseigner
        infosProduits = infosProduits.map (value => {
            const { lenses, _id, name, description, price, imageUrl } = value;
            return { lenses, _id, name, description, price, imageUrl } 
        });

        return infosProduits;

    } catch (error) {
        console.log(error);
    }
} 

//  Afficher tous les articles en vente
async function afficherProduits(infosProduits) {

     infosProduits.forEach(article => {

        vitrine.innerHTML +=  
                    `
                    <div class="jumbotron d-flex flex-column flex-md-row articles">
                       <div class="flex-fill">
                          <a href="./produit.html?id=${article._id}" >
                              <img src=${article.imageUrl} width=600 alt="oricono oricamera image ${article.name}" 
                                   class="img-thumbnail mx-auto d-block">
                          </a>
                        </div>
                        <div class="flex-fill mx-auto text-center">
                            <h2 class="mb-4 mt-4 display-4"> ${article.name} </h2>
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


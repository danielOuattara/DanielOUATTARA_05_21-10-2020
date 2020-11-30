const vitrine = document.querySelector('#vitrine');

class Produits {

    async getProductsData() {
        try {
            let result = await fetch('http://localhost:3000/api/cameras');
            let data = await result.json();
            console.log('data = ', data); 
                   
            // ordonner les objets produits par prix croissant
            let infosProduits = data.sort(function(a, b) {
                return a.price - b.price
               });
            // extraire les valeurs individuelle à renseigner
            infosProduits = infosProduits.map (index => {
                const { lense, _id, name, description, price, imageUrl} = index;
                return { lense, _id, name, description, price, imageUrl}
            });
            console.log(" infosProduits = ", infosProduits);
            return infosProduits;

        } catch (error) {
            console.log(error);
        }
    } 
}

//ui classes: display product
class UI {

    afficherProduits(infosProduits) {
        let resultat = "";


         console.log("infosProduits = ", infosProduits);

        infosProduits.forEach(article => {
            resultat +=  
                        `
                        <div class="jumbotron d-flex flex-column flex-md-row articles">
                           <div class="flex-fill">
                              <a href="#">
                                  <img src=${article.imageUrl} width=600 alt="oricono oricamera image ${article.name}" 
                                       class="img-thumbnail mx-auto d-block">
                              </a>
                            </div>
                            <div class="flex-fill mx-auto text-center">
                                <h2 class="mb-4 mt-4"> ${article.name} </h2>
                                <p>${article.description}</p> 
                                <h4>A partir de ${article.price/100}€</h4>
                                <button class="btn btn-info mt-4" href="#">Découvrir nos modèles</button>
                            </div>
                        </div> 
                        `;
        });

        vitrine.innerHTML = resultat;
    };
}

// local storage 
class Storage { }

// SETTING EventListener
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const produit = new Produits();

    // get all product
    produit.getProductsData()
        .then(produits => ui.afficherProduits(produits));

});


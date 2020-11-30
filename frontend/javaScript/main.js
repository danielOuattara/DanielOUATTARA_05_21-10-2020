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
            infosProduits = infosProduits.map (value => {
                const { lenses, _id, name, description, price, imageUrl} = value;
                return { lenses, _id, name, description, price, imageUrl}
            });

            // console.log("lense[0] = ", lenses);
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
                        <!-- Afficher articles en vente-->
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
                                <button class="btn btn-info mt-4" data-toggle="modal" data-target="#myModal" >Découvrir nos modèles (modal)</button>
                            </div>
                        </div>


                        <!-- The Modal -->
                        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="modal for ${article.name} item" aria-hidden="true">
                        <div class="modal-dialog modal-lg modal-dialog-centered">
                            <div class="modal-content">

                            <!-- Modal Header -->
                            <div class="modal-header">
                                <h4 class="modal-title" id="modal-titre> Oricamera</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            <!-- Modal body -->
                            <div class="modal-body d-flex flex-column flex-md-row">

                                <div class="flex-fill">
                                <a href="#">
                                    <img src=${article.imageUrl} width=600 alt="oricono oricamera image ${article.name}" 
                                            class="img-thumbnail mx-auto d-block">
                                </a>
                                </div>
                                <div class="flex-fill mx-auto text-center">
                                    <h2 class="mb-4 mt-4"> ${article.name} </h2>
                                    <p>${article.description}</p> 
                                    <h4>${article.price/100}€</h4>
                                </div>
                            </div>


                            <form>
    
                                <div class="form-group">
                                    <label for="exampleFormControlSelect1">Modèle</label>
                                    <select class="form-control" id="exampleFormControlSelect1">
                                     <option>${article.lenses[0]}</option>
                                     <option>${article.lenses[1]}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="quantity">Quantity (between 1 and 5):</label>
                                    <input type="number" id="quantity" name="quantity" min="1" max="99">
                                </div>
                            </form>


                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Quantité</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                </select>
                            </div>












                            

                                    <!-- Modal footer -->
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Fermez</button>
                                    </div>

                                    </div>
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


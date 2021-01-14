export function afficherData(data) {

    const { name, price, description, imageUrl} = data;
    let produit       = document.querySelector('.contenu-js');
    produit.innerHTML =  `
                            <div id="bloc-article" class="jumbotron border border-primary rounded">
                                <h1 class="text-center mb-3 display-4 article-name">${name}</h1>
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
                                                        <img src=${imageUrl} alt=" oricamera ${name}, ${description}" class="img-thumbnail img-fluid mx-auto d-block"/>                                         
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="#" data-toggle="modal" data-target="#image-modal">
                                            <img src=${imageUrl} id="#" alt=" oricamera ${name}, ${description}" width=400 class=" hover-image img-thumbnail img-fluid mx-auto d-block"/>
                                        </a>
                                    </div>
                                </div>
                                
                                <div class="flex-fill text-center pl-md-4">
                                    <p class="text-left text-sm-center">${description}</p> 
                                    <div class="form-group form-inline my-1 pl-4">
                                        <label>Lentilles : </label>
                                        <select class="form-control ml-3 col-sm-3 options-lentilles"><!--Contenu généré dynamiquement --></select>
                                    </div>
                                    <h4 class= "my-4 pl-4 text-left">Prix unité :  <span class="article-prix">${price/100}</span>€</h4>
                                    <div class="form-group form-inline pl-4">
                                        <label>Quantité :</label>
                                        <select class="form-control ml-3 col-3 col-sm-3 quantite-article"><!--Contenu généré dynamiquement --></select>
                                    </div> 
                                    <h3 class=" prix-total text-left text-light bg-secondary border rounded d-inline-block p-2" >Total : <span id="prix-total">${price/100}</span>€</h3>
                                </div>

                                <div class="d-flex flex-column flex-md-row justify-content-md-around  ">
                                    <a class=" bouton-lien-produit btn m-2 py-2 revenir-vitrine bouton-decouvrir text-center" href='./../index.html'> <i class="far fa-caret-square-left"></i>&nbsp;&nbsp;Continuer mes achats </a>
                                    <button class=" bouton-lien-produit btn  m-2 py-2 ajoutez-panier bouton-decouvrir text-center"> <i class="fas fa-cart-arrow-down"></i>&nbsp;&nbsp; Ajouter au panier</button>
                                    <a class=" bouton-lien-produit btn m-2 py-2 aller-panier bouton-decouvrir text-center" href="./../html/panier.html"><i class="fas fa-shopping-basket"></i>&nbsp;&nbsp; Aller au panier </a>
                                </div>
                            </div>
    
                        `;
}


// cette fonction actualise, dans le header de toutes les pages,
// le nombre d'articles ainsi que le prix total du panier 

export async function updatePanierHeader() {
    let nombreArticlesPanier = 0;
    let montantTotalPanier = 0;

    for (let i = 0; i < localStorage.length; i++) {

        let keyArticleChoisie = localStorage.key(i);
        let articlesChoisiesJSON = localStorage.getItem(keyArticleChoisie);
        let articlesChoisies = JSON.parse(articlesChoisiesJSON);
        nombreArticlesPanier += parseFloat(articlesChoisies[4]);
        montantTotalPanier += parseFloat(articlesChoisies[4]) * parseFloat(articlesChoisies[6]);                
    }

    document.querySelector('.contenu-panier').innerHTML = nombreArticlesPanier;
    document.querySelector('.montant-panier').innerHTML = montantTotalPanier + "€"; 
}
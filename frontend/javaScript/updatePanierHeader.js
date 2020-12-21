// cette fonction actualise, dans le header de toutes les pages,
// le nombre d'articles ainsi que le prix total du panier 

export async function updatePanierHeader() {
    let nombreArticlesPanier = 0;
    let montantTotalPanier = 0;

    for (let i = 0 ; i < localStorage.length; i++) {

        let keyArticleChoisie = localStorage.key(i);
        let articlesChoisiesJSON = localStorage.getItem(keyArticleChoisie);
        let articlesChoisis = JSON.parse(articlesChoisiesJSON);

console.log(articlesChoisis)
        nombreArticlesPanier += parseFloat(articlesChoisis[4]);
        montantTotalPanier += parseFloat(articlesChoisis[6]);                
    }

    document.querySelector('.contenu-panier').innerHTML = nombreArticlesPanier;
    document.querySelector('.montant-panier').innerHTML = montantTotalPanier + "€"; 
}
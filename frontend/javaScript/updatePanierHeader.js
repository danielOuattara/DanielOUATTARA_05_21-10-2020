
export async function updatePanierHeader() {
   // localStorage.clear();
    let nombreArticlesPanier = 0;
    let montantTotalPanier = 0;

    for (let i = 0; i < localStorage.length; i++) {

        let keyArticleChoisie = localStorage.key(i);
      //  console.log(keyArticleChoisie);
        let articlesChoisiesJSON = localStorage.getItem(keyArticleChoisie);
        let articlesChoisies = JSON.parse(articlesChoisiesJSON);
        nombreArticlesPanier += parseFloat(articlesChoisies[4]);
        montantTotalPanier += parseFloat(articlesChoisies[4]) * parseFloat(articlesChoisies[6]);                
    }

    document.querySelector('.contenu-panier').innerHTML = nombreArticlesPanier;
    document.querySelector('.montant-panier').innerHTML = montantTotalPanier + "€"; 
}
// cette fonction actualise le header de toutes les pages,

export async function updatePanierHeader() {

    // udapte contenu et prix total dans le header
    let nombreArticlesPanier = 0;
    let montantTotalPanier = 0;

    for (let i = 0 ; i < localStorage.length; i++) {

        let keyArticleChoisi = localStorage.key(i);
        let articlesChoisisJSON = localStorage.getItem(keyArticleChoisi);
        let articlesChoisis = JSON.parse(articlesChoisisJSON);

        //console.log(articlesChoisis)
        nombreArticlesPanier += parseFloat(articlesChoisis[4]);
        montantTotalPanier += parseFloat(articlesChoisis[6]);                
    }

    document.querySelector('.contenu-panier').innerHTML = nombreArticlesPanier;
    document.querySelector('.montant-panier').innerHTML = montantTotalPanier + "€"; 



    // update disponibilité du lien vers panier
    let lienHrefPanier = document.querySelector('.lien-vers-panier');

    if(localStorage.length == 0 ) {
       lienHrefPanier.href = "";
       lienHrefPanier.style.cursor = "not-allowed";
    } else {
        lienHrefPanier.href = "./panier.html";
    }
}



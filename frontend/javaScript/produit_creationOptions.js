
export  function creationOptionLentilles(lenses) {

    let selectOptionsLentilles = document.querySelector('.options-lentilles');
    for ( let i = 0 ; i < lenses.length ; i++ ) {
        let optionLentille = document.createElement('option');
        optionLentille.setAttribute("value", lenses[i] );
        let contenuOption = document.createTextNode(lenses[i]);
        optionLentille.appendChild(contenuOption);
        selectOptionsLentilles.appendChild(optionLentille);
    }
}


export  function creationOptionQuantite() {
 
    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let quantiteMaxArticles = 100;
    for ( let i = 1 ; i <= quantiteMaxArticles; i++ ) {
        let optionQuantiteArticles = document.createElement('option');
        optionQuantiteArticles.setAttribute("value", i);
        let quantiteArticlesChoisie_valeur = document.createTextNode(i);
        optionQuantiteArticles.appendChild(quantiteArticlesChoisie_valeur);
        selectQuantiteArticles.appendChild(optionQuantiteArticles);
    }
}
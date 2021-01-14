export  function capterOptionLentilles () {
    
    let selectOptionsLentilles = document.querySelector('.options-lentilles');
    let lentilleChoisie = selectOptionsLentilles.value;    
    selectOptionsLentilles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs des otpions lentilles
        lentilleChoisie = event.target.value;
    })
}


export  function capterNombreArticleChoisi() {

    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let quantiteChoisie = selectQuantiteArticles.value;
    selectQuantiteArticles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs quantite et €
        quantiteChoisie = event.target.value;
    })
}


export function capterPrixTotal(price) {

    let selectQuantiteArticles = document.querySelector('.quantite-article');
    let prixTotal = document.querySelector('#prix-total')

    selectQuantiteArticles.addEventListener('change', (event)=> {
        prixTotal.innerHTML = event.target.value * (price/100);
    });
}
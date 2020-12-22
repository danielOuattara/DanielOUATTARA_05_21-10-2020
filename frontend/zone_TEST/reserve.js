// function capterNombreArticleChoisi() {

//     let selectQuantiteArticles = document.querySelector('.quantite-article');
//     let quantiteChoisie = selectQuantiteArticles.value;
//     selectQuantiteArticles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs quantite et €
//         quantiteChoisie = event.target.value;
//         //console.log('quantité choisie = ', quantiteChoisie);
//     })
// }


// function capterPrixTotal(price) {

//     let selectQuantiteArticles = document.querySelector('.quantite-article');
//     console.log(selectQuantiteArticles.value)
//     console.log(price)
//     let prixTotal = document.querySelector('#prix-total')
//     selectQuantiteArticles.addEventListener('change', (event)=> {
//         // event.stopPropagation();
//         prixTotal.innerHTML = event.target.value * (price/100);
//        // console.log("prix Total = ", prixTotal.innerHTML)
//     });
// }


// function capterOptionLentilles () {
    
//     let selectOptionsLentilles = document.querySelector('.options-lentilles');
//     let lentilleChoisie = selectOptionsLentilles.value;    
//     selectOptionsLentilles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs des otpions lentilles
//         lentilleChoisie = event.target.value;
//         console.log(`lentilles nouvelles = ${lentilleChoisie}`)
//         console.log(lentilleChoisie)
//     })
// }




// function capterChoixCLient(price) {

//     //capter option lentilles
//     let selectOptionsLentilles = document.querySelector('.options-lentilles');
//     let lentilleChoisie = selectOptionsLentilles.value;    
//     selectOptionsLentilles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs des otpions lentilles
//         lentilleChoisie = event.target.value;
//         console.log(`lentilles nouvelles = ${lentilleChoisie}`)
//         console.log(lentilleChoisie)
//     })

//     // capter nombre article
//     let selectQuantiteArticles = document.querySelector('.quantite-article');
//     let quantiteChoisie = selectQuantiteArticles.value;
//     selectQuantiteArticles.addEventListener('change', (event) => {  // Si changement alors nouvelles valeurs quantite et €
//         quantiteChoisie = event.target.value;
//         console.log('quantité choisie = ', quantiteChoisie);

//     });

//     // let selectQuantiteArticles = document.querySelector('.quantite-article');
//     console.log(selectQuantiteArticles.value)
//     console.log(price)
//     let prixTotal = document.querySelector('#prix-total')
//     selectQuantiteArticles.addEventListener('change', (event)=> {
//         // event.stopPropagation();
//         prixTotal.innerHTML = event.target.value * (price/100);
//        // console.log("prix Total = ", prixTotal.innerHTML)
//     });    
// }

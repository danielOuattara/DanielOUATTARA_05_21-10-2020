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


//------------------------------------------------------------------------------------------------

   //     produit.innerHTML += 
    //     ` <div class=" ajouter-panier-confirmation alert alert-success alert-dismissible fade show">
    //     <button type="button" class="close" data-dismiss="alert">&times;</button>
    //     Article <strong> ${articleName.innerHTML} </strong> a bien été ajouté au panier.
    //     </div>
    //     `

    //     updatePanierHeader()
    // });
// });

//  Back up
    // alert fadeIn/ fadeOut
    //     produit.innerHTML += ` <div class="alert alert-success" id="success-alert">
    //     <button type="button" class="close" data-dismiss="alert">x</button>
    //     <strong>Success! </strong> Product have added to your wishlist.
    //   </div>`
    //     $(document).ready(function() {
    //         $("#success-alert").hide();
    //         $("#myWish").click(function showAlert() {
    //           $("#success-alert").fadeTo(2000, 500).slideUp(500, function() {
    //             $("#success-alert").slideUp(500);
    //           });
    //         });
    //       });
//------------------------------------------------------------------------------------------------
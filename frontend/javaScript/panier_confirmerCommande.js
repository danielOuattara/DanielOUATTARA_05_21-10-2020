import {sendXHR}  from './sendXHR.js'

//--------------------------------------------------------------------------------
function dirigerVersPageConfirmationCommande() {
    location.replace('./../html/confirmation.html')
}


//--------------------------------------------------------------------------------
let contact;
export function creerObjetContact() {
   contact = {
      firstName:   document.querySelector('#prenom').value,
      lastName:    document.querySelector('#nom').value,
      address:     document.querySelector('#adresse').value,
      city:        document.querySelector('#ville').value,
      email:       document.querySelector('#email').value
  }
    return contact;
}


//--------------------------------------------------------------------------------
let products =[];
function creerTableauProduct() {
  for (let i = 0; i < localStorage.length; i++) {
    let articleChoisiKEY    = localStorage.key(i);
    let articleChoisiJSON   = localStorage.getItem(articleChoisiKEY);
    let articleChoisi       = JSON.parse(articleChoisiJSON);
    if (articleChoisi[4] > 1) {
      for (let j = articleChoisi[4]; j > 1; j-- ) {
        products.push(articleChoisi[1])
      }
    } 
    products.push(articleChoisi[1])
  }
  return products; 
}


 //--------------------------------------------------------------------------------
function capterDataCommande() {
    let prixTotal= 0;
    document.querySelectorAll('.prix-total').forEach(item => prixTotal += parseInt(item.innerHTML))
    // console.log(prixTotal);
    localStorage.setItem('prix-total', prixTotal);
  }
  

//--------------------------------------------------------------------------------
 export  function confirmerCommande() {
      let btnConfirmationCommandeOui = document.querySelector('.confirmer-commande-oui')
      btnConfirmationCommandeOui.addEventListener('click', function(event) {
        creerObjetContact();
        creerTableauProduct();
        sendXHR('POST','http://localhost:3000/api/cameras/order' ,{contact, products})
          .then( responseData => localStorage.setItem('commande-id', responseData.orderId))
          .then(capterDataCommande)
          .then(dirigerVersPageConfirmationCommande);
      })
  }


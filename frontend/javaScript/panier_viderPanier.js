import { updatePanierHeader } from './updatePanierHeader.js'


//--------------------------------------------------------------------------------
export function viderPanier() {

    let videurPanier = document.querySelector('.vider-panier-ok');
    videurPanier.addEventListener('click', () => {
      localStorage.clear();
      updatePanierHeader();
      videurPanier.href = "./../index.html";
    });
 }
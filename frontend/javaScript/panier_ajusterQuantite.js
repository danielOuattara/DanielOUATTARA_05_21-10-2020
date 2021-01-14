import { updatePanierHeader } from './updatePanierHeader.js'
import { updateAffichagePanier } from './panier_updateAfficherPanier.js'


//--------------------------------------------------------------------------------
 export function ajusterQuantite() {
    if( localStorage.length !== 0) {
      let gestionQuantiteArticle = document.querySelectorAll('.gestion-quantite-article'); 
  
      gestionQuantiteArticle.forEach( item => {
        let reduire = item.querySelector('.fa-minus-square');
        reduire.addEventListener('click', function(event) {  
  
          if (item.querySelector('.quantite-choisie').innerHTML == 1 ) { // 1- suppression
            this.setAttribute("data-toggle","modal");
            this.setAttribute("data-target","#supprimer-article-modal")
            let supprimerArticleOui = document.querySelector('.supprimer-article-ok');
  
            supprimerArticleOui.addEventListener('click', function() {
              let articleChoisieKEY = localStorage.key(reduire.dataset.id);
              localStorage.removeItem(articleChoisieKEY);
              item.parentElement.parentElement.remove();
              updatePanierHeader();
              if (localStorage.length == 0) {
                window.location.replace("./../index.html")
              }
            });
   
          } else { //1-  reduction
            item.querySelector('.quantite-choisie').innerHTML -- ; 
            updateAffichagePanier(event.target.dataset.id, item.querySelector('.quantite-choisie'), item.querySelector('.prix-total'));   
          }  
          updatePanierHeader(); 
  
        });
  
        let augmenter = item.querySelector('.fa-plus-square');  // 2- augmentation
  
        augmenter.addEventListener('click', function(event) {
          item.querySelector('.quantite-choisie').innerHTML ++;
          updateAffichagePanier(event.target.dataset.id, item.querySelector('.quantite-choisie'), item.querySelector('.prix-total'));
          updatePanierHeader(); 
          
       })
      });
    }
    
  }
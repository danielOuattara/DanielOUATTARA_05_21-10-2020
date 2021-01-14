
import { updatePanierHeader } from './updatePanierHeader.js'


//--------------------------------------------------------------------------------
export function supprimerArticlePanier() {

    if (localStorage.length !== 0) {
  
        let supprimerArticleOk = document.querySelector('.supprimer-article-ok');
        let supprimerArticle = document.querySelectorAll('.supprimer-article');
  
        supprimerArticle.forEach ( item => {
  
          item.addEventListener('click', function() {
  
            supprimerArticleOk.addEventListener('click', () => {
              let articleChoisieKEY = localStorage.key(item.dataset.id);
              localStorage.removeItem(articleChoisieKEY);
              item.parentElement.parentElement.remove();
              updatePanierHeader();
  
              if (localStorage.length == 0) {
                window.location.replace("./../index.html")
              }
            });
          });
        });
    }
  }
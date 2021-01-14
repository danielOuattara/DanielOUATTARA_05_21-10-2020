
//--------------------------------------------------------------------------------
 export function updateAffichagePanier( IdArticle, nouvelleQteChoisie, nouveauPrixTotal) {   
            let articleChoisieKEY  = localStorage.key(IdArticle); 
            let articleChoisieJSON = localStorage.getItem(articleChoisieKEY);          
            let articleChoisie     = JSON.parse(articleChoisieJSON);
            articleChoisie[4]      = nouvelleQteChoisie.innerHTML;          
            articleChoisie[6]      =  parseFloat(articleChoisie[4]) * parseFloat (articleChoisie[5]);
            nouveauPrixTotal.innerHTML          = articleChoisie[6];
            articleChoisieJSON     = JSON.stringify(articleChoisie);
            localStorage.setItem(articleChoisieKEY, articleChoisieJSON);  
        }

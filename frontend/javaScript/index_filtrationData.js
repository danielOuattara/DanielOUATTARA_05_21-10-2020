 import {updatePanierHeader} from './updatePanierHeader.js'
 import {sendXHR}            from './sendXHR.js'
 import {afficherVitrine}    from './index.js'
 import {imageAnimation}     from './animationImage.js'
 
 // Filtrer des articles affichés.
//  let optionFiltre = document.querySelector('#filtre');

 export function requeteFiltration(element) {
    element.addEventListener('change', (event) =>  {  
        vitrine.innerHTML = "";
        sendXHR('GET', 'http://localhost:3000/api/cameras')
        .then( responseData => {
            
            switch (event.target.value) {
    
                case "prixCroissant":
                    responseData.sort(function(a, b) {  
                        return a.price - b.price;  
                    });
                break;
    
                case "prixDecroissant":
                    responseData.sort(function(a, b) {  
                        return b.price - a.price;  
                    });
                break;
    
                case "nomCroissant":  
                    responseData.sort(function(a, b) {  
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;} 
                    });
                break;
    
                case "nomDecroissant":
                    responseData.sort(function(a, b) {  
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;} 
                    });
                break;
            }
            return responseData;
        })
        .then(infoProduits => afficherVitrine(infoProduits))
        .then(imageAnimation);
    }); 
}    
 
 updatePanierHeader();
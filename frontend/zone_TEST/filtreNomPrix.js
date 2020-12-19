function filtrePrix() {
    let infosProduits = responseData.sort(function(a, b) {  
        return a.price - b.price; 
    })
}


function filtreNomCroissant() {
    let  infosProduits = responseData.sort(function(a, b) {
        if (a.type.toLowerCase() < b.type.toLowerCase()) {return -1;}
        if (a.type.toLowerCase() > b.type.toLowerCase()) {return 1;}
    return 0;
  });
} 

function filtreNomDeCroissant() {
    let  infosProduits = responseData.sort(function(a, b) {
        if (a.type.toLowerCase() < b.type.toLowerCase()) {return 1;}
        if (a.type.toLowerCase() > b.type.toLowerCase()) {return -1;}
    return 0;
  });
} 


function filtre() {
    let optionFiltre = document.querySelector('#filtre')
    switch( optionFiltre.value) {

        case 'filtreNom':
            filtreNom(infosProduits);
            break;

        case 'filtrePrix':
            filtrePrix(infosProduits);
            break;
    }
    return infoProduits;
}





//----------------------------------------------------------------------


function filtreAffichage() {
    let optionFiltre = document.querySelector('#filtre');

    optionFiltre.addEventListener('change', (event) => {
    
        if( event.target.value == "filtreNom") {
            let  infosProduits = responseData.sort(function(a, b) {
                if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;} 
            })
        } else if (event.target.value == "filtrePrix") {

            let infosProduits = responseData.sort(function(a, b) {  
            return a.price - b.price  // ordonner les articles par prix croissant
            });
        }
    })
}




//---------------------------------------------------------------------------- 




    let infosProduits = [];
    let optionFiltre = document.querySelector('#filtre');
    optionFiltre.addEventListener('change', (event) => {

        let infosProduits;

        console.log(event.target.value) // OK
        switch (event.target.value) {

            case "nomCroissant":
                infosProduits = responseData.sort(function(a, b) {  
                    return a.price - b.price  // ordonner les articles par prix croissant  
                })

                break;

            case "nomDecroissant":
                infosProduits = responseData.sort(function(a, b) {  
                    return b.price - a.price  // ordonner les articles par prix décroissant 
                })

                break;

            case "prixCroissant":
                infosProduits = responseData.sort(function(a, b) {  // ordonner les articles par nom croissant
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;} 
                })

                break;

            case "prixDecroissant":
                infosProduits = responseData.sort(function(a, b) {  // ordonner les articles par nom décroissant
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return 1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return -1;} 
                })

                break;
            
        }

        return infosProduits;

// ------------------------------------------------------------------------------------------------



if (result == "nomCroissant") {
    responseData = responseData.sort(function(a, b) {  
        return a.price - b.price  // ordonner les articles par prix croissant  
    });

} else if (result == "nomDecroissant") {
    responseData = responseData.sort(function(a, b) {  
        return a.price - b.price  // ordonner les articles par prix croissant  
    });

} else if (result == "prixCroissant") {
    responseData = responseData.sort(function(a, b) {  
        return a.price - b.price  // ordonner les articles par prix croissant  
    });

} else if (result == "prixDecroissant") {
    responseData = responseData.sort(function(a, b) {  
        return a.price - b.price  // ordonner les articles par prix croissant  
      });
   }
});
return responseData;
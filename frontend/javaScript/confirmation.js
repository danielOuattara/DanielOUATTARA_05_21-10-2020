
function allerVersBoutique() {
    let boutonVersBoutique = document.getElementById('bouton-vers-boutique');
    boutonVersBoutique.addEventListener('click', function() {
        localStorage.clear();
        location.replace('./../index.html');
    });
}



function allerVersNavigation() {
    let boutonVersNavigation = document.getElementById('bouton-vers-navigation');
    boutonVersNavigation.addEventListener('click', function() {
        localStorage.clear();
        location.replace("https://www.google.com/");
    })
}



let limiteDeTemps = 30;
let compteurTemps = document.getElementById('compteur-temps');
var decompte = setInterval(compteARebours, 1000);

function compteARebours() {
    if (limiteDeTemps == -1) {
        clearTimeout(decompte);
        location.replace('./../index.html');
        localStorage.clear();
    } else {
    compteurTemps.innerHTML = limiteDeTemps + ' secondes';
    if(limiteDeTemps < 2) {
        compteurTemps.innerHTML = limiteDeTemps + ' seconde';

    }
    limiteDeTemps--;
    }
}


function afficherDonneesComande() {
    let referencePrixTotal = document.getElementById('prix-total');
    let referenceOrderdId = document.getElementById('commande-id');

    referencePrixTotal.innerHTML = localStorage.getItem('prix-total');
    referenceOrderdId.innerHTML = localStorage.getItem('commande-id');
}


window.addEventListener("load", () => {  

    allerVersBoutique();
    allerVersNavigation();
    compteARebours();
    afficherDonneesComande();
  });
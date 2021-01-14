
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


window.addEventListener("load", () => {  
    let referencePrixTotal = document.getElementById('prix-total');
    let referenceOrderdId = document.getElementById('commande-id');

    referencePrixTotal.innerHTML = localStorage.getItem('prix-total');
    referenceOrderdId.innerHTML = localStorage.getItem('commande-id');

    setTimeout(function() {
        location.replace('./../index.html');
        localStorage.clear();
    }, 30000)


    allerVersBoutique();
    allerVersNavigation();
  
  });
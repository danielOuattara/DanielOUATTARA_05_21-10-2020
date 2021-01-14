


// Animer & styliser les images produit 'mouseover'
 export function imageAnimation() {  
    let imageAffiche = document.querySelectorAll('img');
    for(let i = 0 ; i < imageAffiche.length ; i++) {
        imageAffiche[i].addEventListener('mouseover', function() {
            this.style.opacity ='0.75';
            this.style.scale ='1.1';
            this.style.transition ='all 350ms';
        });
        imageAffiche[i].addEventListener('mouseout', function() {
            this.style.opacity ='1'
            this.style.scale ='1'
        });
    }
}

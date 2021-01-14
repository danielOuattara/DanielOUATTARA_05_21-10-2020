 

 //--------------------------------------------------------------------------------
 export function validerFormulaireCommande() {

    let form = document.querySelector('.needs-validation');
    form.addEventListener('submit', function(event) {
      
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();  
      }
      form.classList.add('was-validated');
  
      if(form.checkValidity()) {
        let btnConfirmationCommande = document.querySelector('.confirmation-commande');
        btnConfirmationCommande.setAttribute("data-toggle", "modal")
        btnConfirmationCommande.setAttribute("data-target", "#confirmer-commande-modal")
        event.preventDefault();
      }
    });
  }
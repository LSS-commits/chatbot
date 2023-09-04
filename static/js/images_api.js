/* Pour toggle le bouton d'appel à l'action de la barre de navigation et faire apparaître le formulaire images */
const imgForm = document.getElementById("imgForm");
const btnToggleIn = document.getElementById("btnToggleIn");
const btnToggleOut = document.getElementById("btnToggleOut");

// afficher le formulaire
function toggleFormIn(){
    imgForm.style.display = "flex";
    btnToggleOut.style.display = "block";
    btnToggleIn.style.display = "none";
}
// cacher le formulaire
function toggleFormOut(){
    imgForm.style.display = "none";
    btnToggleOut.style.display = "none";
    btnToggleIn.style.display = "block";
}
btnToggleIn.addEventListener("click", toggleFormIn);
btnToggleOut.addEventListener("click", toggleFormOut);


/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessageImg() {

    // pour récupérer l'entrée utilisateur 
    const imgMessage = document.getElementById('userInputImg').value;
    const responseAreaText = document.getElementById('modalBodyText');
    const imgArea = document.getElementById('modalBodyImg');

    // pour afficher les erreurs
    const errorUserImg = document.getElementById('errorUserImg');
    const errorAPIImg = document.getElementById('errorAPIImg');

    // vider le champ utilisateur
    document.getElementById('userInputImg').value = '';

    // vider la modale
    responseAreaText.innerHTML = "";
    imgArea.innerHTML = "";    

    // réinitialiser les containers d'erreurs
    errorUserImg.classList.remove('show-error-img');
    errorUserImg.innerHTML = '';
    errorAPIImg.classList.remove('show-error-img');
    errorAPIImg.innerHTML = '';

    // Animation d'attente de réponse
    const loadingDotsImg = document.querySelector('#loadingDotsImg');
    loadingDotsImg.style.display = "inline-block";

    // le message envoyé respecte la limite de 60 caractères
    if (imgMessage.length <= 60){
        /* envoyer les données du formulaire à la route Flask */
        fetch('/postDataImage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: imgMessage })
        })

        /* récupérer la réponse de l'API depuis l'endpoint et mettre à jour le HTML avec les résultats */
        .then(response => response.json())
        .then(data => {
            url = Object.values(data);
            // cachez l'animation "..."
            loadingDotsImg.style.display = "none"; 
            // affichage en fonction de la réponse de l'API
            if (url[0] === "Message utilisateur vide") {
                // message envoyé était vide
                errorUserImg.classList.add('show-error-img');
                errorUserImg.innerHTML = "<span>Veuillez remplir le champ</span>";
            }else if(url[0] === "Erreur API"){
                // erreur API
                errorAPIImg.classList.add('show-error-img');
                errorAPIImg.innerHTML = "<span>Une erreur s'est produite.<br>Veuillez rafraîchir la page ou réessayer plus tard.</span>";
            }else{
                // réponse OK
                responseAreaText.innerHTML = `<p><strong>Voici votre "` + imgMessage + `":</strong></p>`;
                imgArea.innerHTML = `<img class="rounded" src="` + url[0] + `" alt="image générée">`;  
            }
        });
    }else{
        // message envoyé contient plus de 60 caractères
        errorUserImg.classList.add('show-error-img');
        errorUserImg.innerHTML = "<span>60 caractères maximum</span>";
    }
}

/* Pour envoyer le message, clic sur le bouton */
const sendButtonImg = document.getElementById("sendButtonImg");

sendButtonImg.addEventListener("click", sendMessageImg)

// TODO: ajouter bouton télécharger + limite de caractere 0/60
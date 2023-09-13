/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessageImg() {

    // pour récupérer l'entrée utilisateur 
    const imgMessage = document.getElementById('userInputImg').value;
    const responseAreaText = document.getElementById('modalBodyText');
    const imgArea = document.getElementById('modalBodyImg');

    // pour afficher les erreurs
    const errorUserImg = document.getElementById('errorUserImg');
    const errorAPIImg = document.getElementById('errorAPIImg');

    // pour indiquer comment télécharger l'image
    const modalBodyDownload = document.getElementById("modalBodyDownload");

    // vider le champ utilisateur
    document.getElementById('userInputImg').value = '';
    // réinitialiser le compteur
    counter.innerText = "0/60";
    
    // vider l'élément
    modalBodyDownload.innerText = '';

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
            // accéder à l'url
            url = Object.values(data);
            // cacher l'animation d'attente "..."
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

                // pour télécharger l'image
                modalBodyDownload.innerText = "Clic droit pour sauvegarder l'image";

                // pour télécharger l'image
                modalBodyDownload.innerText = "Clic droit pour sauvegarder l'image";
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

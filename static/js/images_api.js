/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessageImg() {

    // pour récupérer l'entrée utilisateur 
    const imgMessage = document.getElementById('userInputImg').value;
    const responseAreaImg = document.getElementById('modalBody');
    const imgArea = document.getElementById('modalBodyImg');

    // pour afficher les erreurs
    const errorUserImg = document.getElementById('errorUserImg');
    const errorAPIImg = document.getElementById('errorAPIImg');

    // vider le champ utilisateur
    document.getElementById('userInputImg').value = '';

    // réinitialiser les containers d'erreurs
    errorUserImg.classList.remove('show-error');
    errorUserImg.innerHTML = '';
    errorAPIImg.classList.remove('show-error');
    errorAPIImg.innerHTML = '';


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
        // affichage en fonction de la réponse de l'API
        if (data.message === "Message utilisateur vide") {
            // message envoyé était vide
            errorUserImg.classList.add('show-error');
            errorUserImg.innerHTML = "<span>Veuillez remplir le champ</span>";
        }else if(data.message === "Erreur API"){
            // erreur API
            errorAPIImg.classList.add('show-error');
            errorAPIImg.innerHTML = "<span>Une erreur s'est produite. Veuillez réessayer plus tard.</span>";
        }else{
            // réponse OK
            url = Object.values(data);
            responseAreaImg.innerHTML += `<p><strong>Voici votre "` + imgMessage + `":</strong></p>`
            imgArea.innerHTML += `<img src="` + url[0] + `" alt="img créée">`;    
        }
    });
}

/* Pour envoyer le message, clic sur le bouton ou presser la touche Entrée du clavier */
const sendButtonImg = document.getElementById("sendButtonImg");
const userInputImg = document.getElementById("userInputImg");

function handleEventImg(e){
    // si l'événement est un clic
    if(e.type === "click"){
        sendMessageImg();
    }
    // si l'utilisateur presse la touche Entrée du clavier
    if(e.keyCode === 13){
        sendMessageImg();
    }
}

if (sendButtonImg) {
    sendButtonImg.addEventListener("click", handleEventImg);
}
if (userInputImg) {
    userInputImg.addEventListener("keyup", handleEventImg);
}


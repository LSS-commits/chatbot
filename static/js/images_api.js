/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessageImg() {

    // pour récupérer l'entrée utilisateur 
    const message = document.getElementById('userInputImg').value;
    const responseArea = document.getElementById('modalBody');
    const imgArea = document.getElementById('modalBodyImg');
    
    // pour afficher les erreurs
    const errorUser = document.getElementById('errorUser');
    const errorAPI = document.getElementById('errorAPI');

    // vider le champ utilisateur
    document.getElementById('userInput').value = '';

    // réinitialiser les containers d'erreurs
    errorUser.classList.remove('show-error');
    errorUser.innerHTML = '';
    errorAPI.classList.remove('show-error');
    errorAPI.innerHTML = '';


    /* si le message envoyé n'est pas vide ou ne contient pas que des espaces (\s => espaces, tabs, new lines) */
    if (message.length > 0 && !message.replace(/\s/g, '').length == 0) {
        // afficher la requête envoyée
        responseArea.innerHTML += '<p><strong>Vous :</strong> ' + message + '</p>';
    }

    /* envoyer les données du formulaire à la route Flask */
    fetch('/postDataChatbot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })

    /* récupérer la réponse de l'API depuis l'endpoint et mettre à jour le HTML avec les résultats */
    .then(response => response.json())
    .then(data => {
        // affichage en fonction de la réponse de l'API
        if (data.message === "Message utilisateur vide") {
            // message envoyé était vide
            errorUser.classList.add('show-error');
            errorUser.innerHTML = "<span>Veuillez remplir le champ</span>";
        }else if(data.message === "Erreur API"){
            // erreur API
            errorAPI.classList.add('show-error');
            errorAPI.innerHTML = "<span>Une erreur s'est produite. Veuillez réessayer plus tard.</span>";
        }else{
            // réponse OK
            responseArea.innerHTML += '<p><strong>Chatbot :</strong> ' + data.message + '</p>';    
        }
    });
}

/* Pour envoyer le message, clic sur le bouton ou presser la touche Entrée du clavier */
const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");

function handleEvent(e){
    // si l'événement est un clic
    if(e.type === "click"){
        sendMessage();
    }
    // si l'utilisateur presse la touche Entrée du clavier
    if(e.keyCode === 13){
        sendMessage();
    }
}

if (sendButton) {
    sendButton.addEventListener("click", handleEvent);
}
if (userInput) {
    userInput.addEventListener("keyup", handleEvent);
}


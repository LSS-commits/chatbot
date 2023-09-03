/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessage() {
    // récupérer l'entrée utilisateur et l'afficher
    const message = document.getElementById('userInput').value;
    const responseArea = document.getElementById('responseArea');
    const errorContainer = document.getElementById('errorContainer');

    // vider le champ
    document.getElementById('userInput').value = '';


    // validation du formulaire
    if (message.length !== 0) {

        errorContainer.classList.remove('show-error');
        errorContainer.innerHTML = '';

        // errorContainer.classList.add('hide-error');
        // errorContainer.style.display = 'none';


        // afficher la requête envoyée
        responseArea.innerHTML += '<p><strong>Vous :</strong> ' + message + '</p>';

        /* envoyer les données du formulaire à la route Flask */
        fetch('/postData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message })
        })

        /* récupérer la réponse de l'API depuis l'endpoint et mettre à jour le HTML avec les résultats */
        .then(response => response.json())
        .then(data => {
            responseArea.innerHTML += '<p><strong>Chatbot :</strong> ' + data.message + '</p>';    
        });

    } else {
        // si le champ était vide
        errorContainer.classList.add('show-error');
        // errorContainer.classList.remove('hide-error');

        errorContainer.innerHTML = '<span>Veuillez remplir le champ</span>';
    }

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


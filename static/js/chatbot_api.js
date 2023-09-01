/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessage() {
    // récupérer l'entrée utilisateur et l'afficher
    var message = document.getElementById('userInput').value;
    var responseArea = document.getElementById('responseArea');

    document.getElementById('userInput').value = '';
    responseArea.innerHTML += '<p><strong>Utilisateur:</strong> ' + message + '</p>';

    // TODO: validation du formulaire, pas d'input vide
    
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
        responseArea.innerHTML += '<p><strong>Chatbot:</strong> ' + data.message + '</p>';    
    });
}

/* Pour envoyer le message, clic sur le bouton ou presser la touche Entrée du clavier */
const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");

function handleEvent(e){
    // si l'événement est un clic
    if(e.type === "click"){
        console.log("click"); 
        sendMessage();
    }
    // si l'utilisateur presse la touche Entrée du clavier
    if(e.keyCode === 13){
        console.log("enter key pressed"); 
        sendMessage();
    }
}

if (sendButton) {
    sendButton.addEventListener("click", handleEvent);
}
if (userInput) {
    userInput.addEventListener("keyup", handleEvent);
}


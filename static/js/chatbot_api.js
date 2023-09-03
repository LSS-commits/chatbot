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
        var answerNumber = 1
        var btnNumber = 1
        responseArea.innerHTML += '<p class="answerNumber '+ answerNumber +'"><strong>Chatbot:</strong> ' + data.message + '</p> <button class="btnNumber '+ btnNumber +'">Copy</button>';    
        console.log(responseArea.innerHTML)
        // Copy to clipboard
        function myFunction(answerId, btnId) {
            btnId = "1" 
            var btnCopy = document.getElementById(btnId);
            console.log(btnCopy)
    //   var copyEl = document.getElementById(answerId);
    
        //   if (answerId === btnId) {
        //     btnCopy.addEventListener("click", function () {
        //       console.log(btnCopy);
        //     });
            // Récupérer le contenu de la div
            // var copyText = document.getElementById("copyChatbotAnswer").innerText;
            // console.log(copyEl);
            // console.log(copyText)
        //   }
        
        // Copier le contenu dans le presse-papiers
        // navigator.clipboard.writeText(copyText)
        //     .then(() => {
        //         alert("Texte copié avec succès !");
        //     })
        //     .catch(err => {
        //         console.error("Erreur lors de la copie du texte: ", err);
        //     });
        }
        myFunction()
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


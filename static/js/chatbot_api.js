/* Pour envoyer le message, clic sur le bouton ou presser la touche Entrée du clavier */
const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");
const loadingDots = document.getElementById("loadingDots");

// incrémenteur de réponses
var answerNumber = 0

/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessage() {
    // récupérer l'entrée utilisateur et l'afficher
    var message = document.getElementById('userInput').value;
    var responseArea = document.getElementById('responseArea');

    document.getElementById('userInput').value = '';
    responseArea.innerHTML += '<p><strong>Utilisateur:</strong> ' + message + '</p>';

    // TODO: validation du formulaire, pas d'input vide
    sendButton.style.display="none";
    loadingDots.style.display="block";

    
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
        answerNumber += 1;
        responseArea.innerHTML += '<p id="answerNumber'+ answerNumber +'" class="chatbotAnswer"><strong>Chatbot:</strong> ' + data.message + '</p><button class="btnCopy" id="btnNumber'+ answerNumber +'"><i id="clipboardIcon" class="fa-regular fa-clipboard"></i></button>';  
        
        // Remplacer btn par loadingDots
        sendButton.style.display="block";
        loadingDots.style.display="none";
        
        // copier dans le presse-papiers
        var btnEl = document.getElementById("btnNumber" + answerNumber);
        var answerEl = document.getElementById("answerNumber" + answerNumber);
        btnEl.addEventListener('click', function (event) {
            if (event.target != undefined) {
                var copyText = answerEl.innerText;
                navigator.clipboard.writeText(copyText)
                .then(() => {
                    btnEl.innerHTML = 'Copié avec succès <i id="clipboardIcon" class="fa-solid fa-clipboard-check"></i>'
                })
                .catch(err => {
                    // TODO: faire validation erreur
                    console.error("Erreur lors de la copie du texte: ", err);
                });
            }
        })
    });
    
}


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


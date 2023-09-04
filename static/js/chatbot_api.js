/* Pour envoyer le message, clic sur le bouton ou presser la touche Entrée du clavier */
const sendButton = document.getElementById("sendButton");
const userInput = document.getElementById("userInput");
const loadingDots = document.getElementById("loadingDots");

// incrémenteur de réponses
var answerNumber = 0

/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessage() {
    // pour récupérer l'entrée utilisateur et l'afficher
    const message = document.getElementById('userInput').value;
    const responseArea = document.getElementById('responseArea');

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


    // réinitialiser les containers d'erreurs
    errorUser.classList.remove('show-error');
    errorUser.innerHTML = '';
    errorAPI.classList.remove('show-error');
    errorAPI.innerHTML = '';

    /* si le message envoyé n'est pas vide ou ne contient pas que des espaces (\s => espaces, tabs, new lines) */
    if (message.length > 0 && !message.replace(/\s/g, '').length == 0) {
        // afficher la requête envoyée
        responseArea.innerHTML += '<p><strong>Vous :</strong> ' + message + '</p>';

        // remplacer le bouton envoyer par l'animation d'attente
        sendButton.style.display="none";
        loadingDots.style.display="block";
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
            errorAPI.innerHTML = "<span>Une erreur s'est produite.<br>Veuillez rafraîchir la page ou réessayer plus tard.</span>";
        }else{
            // réponse OK
            // incrémenter le compteur pour générer des ids uniques (p et button liés)
            answerNumber += 1;

            responseArea.innerHTML += '<p id="answerNumber'+ answerNumber +'" class="chatbotAnswer"><strong>Chatbot:</strong> <span class="messageContent">' + data.message + '</span></p><button class="btnCopy" id="btnNumber'+ answerNumber +'"><i id="clipboardIcon" class="fa-regular fa-clipboard"></i></button>';  
            
            // Remettre le bouton envoyer et enlever l'animation d'attente
            sendButton.style.display="block";
            loadingDots.style.display="none";
            
            // pour copier les réponses dans le presse-papiers
            var btnEl = document.getElementById("btnNumber" + answerNumber);
            var answerEl = document.getElementById(
              "answerNumber" + answerNumber
            );
            btnEl.addEventListener("click", function (event) {
              if (event.target != undefined) {
                var messageContent =
                  answerEl.querySelector(".messageContent").innerText;
                navigator.clipboard
                  .writeText(messageContent)
                  .then(() => {
                    btnEl.innerHTML =
                      'Copié avec succès <i id="clipboardIcon" class="fa-solid fa-clipboard-check"></i>';
                  })
                  .catch((err) => {
                    console.error("Erreur lors de la copie du texte: ", err);
                  });
              }
            });
        }
    });
}

/* Pour envoyer le message, clic sur le bouton ou presser la touche Entrée du clavier */
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



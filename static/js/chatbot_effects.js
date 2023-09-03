function displayMessageWordByWord(message, containerElem) {
    const words = message.split(' ');
    let delay = 0;

    words.forEach(word => {
        const wordElem = document.createElement("span");
        wordElem.classList.add("word");
        containerElem.appendChild(wordElem); 

        // Divisez chaque mot en lettres
        const letters = word.split('');
        let letterIndex = 0;

        const displayLetterInterval = setInterval(() => {
            if (letterIndex < letters.length) {
                wordElem.textContent += letters[letterIndex] + (letterIndex === letters.length - 1 ? " " : ""); 
                wordElem.classList.add("visible");
                letterIndex++;
            } else {
                clearInterval(displayLetterInterval);
            }
        }, 100);  // Affichez chaque lettre tous les 100ms

        delay += (word.length + 1) * 100;  // Incrémentez le délai en fonction du nombre de lettres
    });
}
document.addEventListener("DOMContentLoaded", function() {
    // Références aux éléments
    const scrollArrow = document.getElementById("scrollArrow");
    const responseArea = document.getElementById("responseArea");

    // Fonction pour vérifier la position de défilement
    function checkScrollPosition() {
        // Si l'utilisateur est près du bas de la zone de réponse (avec une tolérance de 5 pixels)
        if (responseArea.scrollHeight - responseArea.scrollTop <= responseArea.clientHeight + 5) {
            scrollArrow.classList.add("hidden"); // Cache la flèche
        } else {
            scrollArrow.classList.remove("hidden"); // Affiche la flèche
        }
    }

    // Lorsque l'utilisateur fait défiler la zone de réponse, vérifiez sa position
    responseArea.addEventListener("scroll", checkScrollPosition);

    // Lorsque l'utilisateur clique sur la flèche, faites défiler la zone de réponse vers le bas
    scrollArrow.addEventListener("click", function() {
        responseArea.scrollTop = responseArea.scrollHeight;
    });

    // Au chargement, vérifiez la position de défilement initiale
    checkScrollPosition();
});

// Création de l'élément du message du bot
const botMessageElem = document.createElement("div");
botMessageElem.classList.add("message", "bot-message");

// Création du bouton
const copyBtn = document.createElement("button");
copyBtn.innerHTML = 'Copier';
copyBtn.classList.add("copy-btn");
botMessageElem.appendChild(copyBtn); // Ajout du bouton à l'élément du message

// Ajout de l'écouteur d'événements au bouton
copyBtn.addEventListener("click", function(e) {
    e.stopPropagation(); // Empêchez tout autre événement

    navigator.clipboard.writeText(data.message)
        .then(function() {
            console.log('Text successfully copied to clipboard!');
        })
        .catch(function(err) {
            console.error('Could not copy text: ', err);
        });
});

// Création de l'élément de texte pour le message
const messageTextElem = document.createElement("span");
messageTextElem.textContent = data.message;
botMessageElem.appendChild(messageTextElem); // Ajout du texte à l'élément du message

// Ajout de l'élément complet du message à la zone de réponse
responseArea.appendChild(botMessageElem);


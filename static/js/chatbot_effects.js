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
    const responseArea = document.getElementById("responseArea");
    const scrollArrow = document.getElementById("scrollArrow");

    function checkScrollPosition() {
        // Vérifiez si l'utilisateur est au bas de la zone de réponse avec une marge d'erreur de 5 pixels
        if ((responseArea.scrollHeight - responseArea.scrollTop - responseArea.clientHeight) < 5) {
            scrollArrow.classList.add("hidden");
        } 
        // Si la zone de réponse est défilable (i.e. il y a plus de contenu que ce qui peut être affiché)
        else if (responseArea.scrollHeight > responseArea.clientHeight) {
            scrollArrow.classList.remove("hidden");
        }
    }

    // Lorsque l'utilisateur fait défiler la zone de réponse, vérifiez sa position
    responseArea.addEventListener("scroll", checkScrollPosition);

    // Lorsque l'utilisateur clique sur la flèche, faites défiler la zone de réponse vers le bas
    scrollArrow.addEventListener("click", function() {
        responseArea.scrollTop = responseArea.scrollHeight;
        // Après avoir défilé jusqu'au bas, vérifiez à nouveau la position pour cacher la flèche
        checkScrollPosition();
    });

    // Au chargement, vérifiez la position de défilement initiale
    checkScrollPosition();
});




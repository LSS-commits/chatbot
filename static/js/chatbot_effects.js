// function displayMessageWordByWord(message, containerElem) {
//   const words = message.split(" ");
//   let delay = 0;

//   words.forEach((word) => {
//     const wordElem = document.createElement("span");
//     wordElem.classList.add("word");
//     containerElem.appendChild(wordElem);

//     // Divisez chaque mot en lettres
//     const letters = word.split("");
//     let letterIndex = 0;

//     const displayLetterInterval = setInterval(() => {
//       if (letterIndex < letters.length) {
//         wordElem.textContent +=
//           letters[letterIndex] +
//           (letterIndex === letters.length - 1 ? " " : "");
//         wordElem.classList.add("visible");
//         letterIndex++;
//       } else {
//         clearInterval(displayLetterInterval);
//       }
//     }, 100); // Affichez chaque lettre tous les 100ms

//     delay += (word.length + 1) * 100; // Incrémentez le délai en fonction du nombre de lettres
//   });
// }

// Flèche de scroll vers le bas
document.addEventListener("DOMContentLoaded", function () {
  const responseArea = document.getElementById("responseArea");
  const scrollArrow = document.getElementById("scrollArrow");

  function checkScrollPosition() {
    // Vérifiez si l'utilisateur est au bas de la zone de réponse avec une marge d'erreur de 5 pixels
    if (
      responseArea.scrollHeight -
        responseArea.scrollTop -
        responseArea.clientHeight <
      5
    ) {
      scrollArrow.classList.add("hidden");
    }
    // Si la zone de réponse est défilable
    else if (responseArea.scrollHeight > responseArea.clientHeight) {
      scrollArrow.classList.remove("hidden");
    }
  }
  // Fait défiler la zone de réponse, vérifiez sa position
  responseArea.addEventListener("scroll", checkScrollPosition);
  // Clique sur la flèche, faites défiler la zone de réponse vers le bas
  scrollArrow.addEventListener("click", function () {
    responseArea.scrollTo({
      top: responseArea.scrollHeight,
      behavior: "smooth",
    });
    setTimeout(checkScrollPosition, 500);
  });
  // Au chargement, vérifiez la position de défilement initiale
  checkScrollPosition();
});

// Effet page d'accueil présentation
const text = "Je suis un assistant intelligent conçu pour vous aider à trouver des réponses à vos questions. Je peux aider avec des informations,assister à la rédaction, et participer à des discussions sur divers sujets. Je suis capable de comprendre et fournir des réponses précises et pertinentes.";
const splitText = text.split("");
const containerText = document.querySelector('.lead');
let showLetters = "";
let counter = 0;
let randomSpeed = 100;

function typeEffect() {
    let currentLetter = splitText[counter];
    showLetters += currentLetter;
    containerText.innerHTML = showLetters + '<span class="cursor"></span>';
    counter++;

    if(counter > splitText.length - 1){
        setTimeout(() => {
            // Attend 10 secondes avant de réinitialiser le message
            showLetters = "";
            counter = 0;
            containerText.innerHTML = '<span class="cursor"></span>';
            typeEffect();
        }, 10000); // 10 secondes
        return;
    }

    setTimeout(typeEffect, randomSpeed);
}

typeEffect();




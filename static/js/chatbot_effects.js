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
const text =
  "Je suis un assistant intelligent conçu pour vous aider à trouver des réponses à vos questions. Je peux aider avec des informations, assister à la rédaction, et participer à des discussions sur divers sujets. Je suis capable de comprendre et fournir des réponses précises et pertinentes.";
const splitText = text.split("");
const containerText = document.querySelector(".lead");
let showLetters = "";
let counter = 0;
//RandomSpeed a 50 au lieu de 100 (plus rapide)
let randomSpeed = 50;

function typeEffect() {
  let currentLetter = splitText[counter];
  showLetters += currentLetter;
  containerText.innerHTML = showLetters + '<span class="cursor"></span>';
  counter++;

  if (counter > splitText.length - 1) {
    // Si le message est entièrement affiché, arrêtez la fonction
    return;
  }

  setTimeout(typeEffect, randomSpeed);
}

typeEffect();

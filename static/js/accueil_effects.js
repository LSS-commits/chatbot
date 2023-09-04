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
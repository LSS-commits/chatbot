// Effet page d'accueil présentation
const containerText = document.querySelector('.presentation-text');
const homeImg = document.querySelector('.presentationImgContainer');
const homeTitle = document.querySelector('.presentation-title');
const homeBtn = document.querySelector('.start-btn');
const footer = document.querySelector('.custom-footer');


const text =
  "Je suis un assistant intelligent conçu pour vous aider à trouver des réponses à vos questions. Je peux aider avec des informations, assister à la rédaction, et participer à des discussions sur divers sujets. Je suis capable de comprendre et fournir des réponses précises et pertinentes.";
const splitText = text.split("");
let showLetters = "";
let counter = 0;
// randomSpeed (10 rapide => 100 lent)
let randomSpeed = 25;

function typeEffect() {
  // seul le texte est affiché
  homeImg.style.opacity = 0;
  homeTitle.style.opacity = 0;
  homeBtn.style.opacity = 0;
  footer.style.opacity = 0;
  
  let currentLetter = splitText[counter];
  showLetters += currentLetter;
  containerText.innerHTML = showLetters + '<span class="cursor"></span>';
  counter++;

  if (counter > splitText.length - 1) {

    // Si le message est entièrement affiché, afficher tous les éléments en fade in et arrêter la fonction
    setTimeout(() => {
      homeImg.classList.add("fadeInAnimation");
      homeTitle.classList.add("fadeInAnimation");
      homeBtn.classList.add("fadeInAnimation");
      footer.classList.add("fadeInAnimation");

      homeImg.style.opacity = 1;
      homeTitle.style.opacity = 1;
      homeBtn.style.opacity = 1;
      footer.style.opacity = 1;
    }, 700);

    return;
  }

  setTimeout(typeEffect, randomSpeed);
}

typeEffect();
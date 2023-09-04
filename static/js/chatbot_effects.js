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
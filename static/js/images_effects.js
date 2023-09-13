/* Pour toggle le bouton d'appel à l'action de la barre de navigation et faire apparaître le formulaire images */
const imgForm = document.getElementById("imgForm");
const btnToggleIn = document.getElementById("btnToggleIn");
const btnToggleOut = document.getElementById("btnToggleOut");

// afficher le formulaire
function toggleFormIn(){
    imgForm.style.display = "flex";
    btnToggleOut.style.display = "block";
    btnToggleIn.style.display = "none";
}
// cacher le formulaire
function toggleFormOut(){
    imgForm.style.display = "none";
    btnToggleOut.style.display = "none";
    btnToggleIn.style.display = "block";
}
btnToggleIn.addEventListener("click", toggleFormIn);
btnToggleOut.addEventListener("click", toggleFormOut);

// container du compteur de caractères
const counter = document.getElementById('charCount');

// modale limite 0/60
document.getElementById('userInputImg').addEventListener('input', function(e) {
    var charCount = e.target.value.length;
    counter.innerText = `${charCount}/60`;
    // changer l'opacité du compteur lorsqu'on dépasse 50 caractères
    if (charCount > 50) {
        counter.style.opacity = "1";
    }else{
        counter.style.opacity = "0";
    }
});
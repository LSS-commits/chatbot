/* Pour récupérer des données d'une API en utilisant Fetch API */
async function getData(url = "") {

    const response = await fetch(url, {
        method: "GET",
        referrerPolicy: "no-referrer"
    });
    return response.json();
}
  
const modalBodyJoke = document.getElementById("modalBodyJoke");
const modalBodyAdvice = document.getElementById("modalBodyAdvice");

// API pour générer des blagues aléatoirement (anglais)
getData("https://official-joke-api.appspot.com/random_joke").then(data => {
    // TODO: ajouter des try catch pour gérer les erreurs de fetch
    data = Object.values(data);
    // console.log("Random joke: " + data[1] + " " + data[2]);
    if (modalBodyJoke) {
        modalBodyJoke.innerHTML = "Juste pour rire : " + data[1] + " " + data[2];
    }
    
})

// API pour donner des conseils (anglais)
getData("https://api.adviceslip.com/advice").then(data => {
    // TODO: ajouter des try catch pour gérer les erreurs de fetch
    // console.log("Random advice: " + data.slip.advice);
    if (modalBodyAdvice) {
        modalBodyAdvice.innerHTML = "Si ça peut aider : " + data.slip.advice;
    }
})
  
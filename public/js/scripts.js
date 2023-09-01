/* Pour écupérer des données d'une API en utilisant Fetch API */
async function getData(url = "") {

    const response = await fetch(url, {
        method: "GET",
        referrerPolicy: "no-referrer"
    });
    return response.json();
}
  
// API pour générer des blagues aléatoirement
getData("https://official-joke-api.appspot.com/random_joke").then(data => {
    console.log(data);
})

// API pour donner des conseils
getData("https://api.adviceslip.com/advice").then(data => {
    console.log("Random advice: " + data.slip.advice);
})
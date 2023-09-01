/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessage() {
    // récupérer l'entrée utilisateur et l'afficher
    var message = document.getElementById('userInput').value;
    var responseArea = document.getElementById('image');

    document.getElementById('userInput').value = '';

    /* envoyer les données du formulaire à la route Flask */
    fetch('/postData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    /* récupérer la réponse de l'API depuis l'endpoint et mettre à jour le HTML avec les résultats */
    .then(response => response.json())
    .then(data => {  
        console.log();   
        url = Object.values(data)  
        responseArea.innerHTML += `<p><strong>Voici votre "` + message + `":</strong></p>
        <img src="` + url[0] + `" alt="img créée">
    `;
    });
}
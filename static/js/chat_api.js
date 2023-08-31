/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessage() {
    // récupérer l'entrée utilisateur et l'afficher
    var message = document.getElementById('userInput').value;
    document.getElementById('userInput').value = '';
    document.getElementById('chatbox').innerHTML += '<p><strong>Utilisateur:</strong> ' + message + '</p>';

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
        document.getElementById('chatbox').innerHTML += '<p><strong>Chatbot:</strong> ' + data.message + '</p>';    
    });
}
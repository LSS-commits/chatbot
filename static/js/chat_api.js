/* Pour gérer le traitement des données envoyées et reçues du chatbot */
function sendMessage() {
    // récupérer l'entrée utilisateur et l'afficher
    var message = document.getElementById('userInput').value;
    document.getElementById('userInput').value = '';
    document.getElementById('chatbox').innerHTML += '<p><strong>Utilisateur:</strong> ' + message + '</p>';

    // récupérer la réponse de l'API depuis l'endpoint et l'afficher
    fetch('/postData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('chatbox').innerHTML += '<p><strong>Chatbot:</strong> ' + data.message + '</p>';    
    });
}
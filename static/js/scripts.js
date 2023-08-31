function sendMessage() {
    let userInput = document.getElementById("userInput").value;

    // if (userInput.trim() === "") {
    //     alert("Veuillez saisir un message.");
    //     return;
    // }

    fetch("/get_chatbot_response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
    })
        
    .then(response => {
        if (!response.ok) {
            console.error("Network response was not ok. Status:", response.status);
            throw new Error("La réponse du réseau n'était pas ok.");
        }
        return response.json();
    })
    
    .then(data => {
        let responseArea = document.getElementById("responseArea");

        // User's message
        let userMessageElement = document.createElement("p");
        userMessageElement.textContent = `Vous: ${userInput}`;
        responseArea.appendChild(userMessageElement);

        // Chatbot's response
        let botMessageElement = document.createElement("p");
        botMessageElement.textContent = `ChatBot: ${data.response}`;
        responseArea.appendChild(botMessageElement);

        // Clear the input
        document.getElementById("userInput").value = "";

        // Scroll to the latest message
        responseArea.scrollTop = responseArea.scrollHeight;
    })
    .catch(error => {
        console.error("Il y a un problème avec l'opération fetch:", error.message);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Références aux éléments
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
    const responseArea = document.getElementById("responseArea");

    sendButton.addEventListener("click", function() {
        const userMessage = userInput.value;

        const userMessageElem = document.createElement("div");
        userMessageElem.textContent = userMessage;
        userMessageElem.classList.add("message", "user-message");
        responseArea.appendChild(userMessageElem);

        userInput.value = "";

        fetch('/postData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            const botMessageElem = document.createElement("div");
            botMessageElem.classList.add("message", "bot-message");
            responseArea.appendChild(botMessageElem);
            
            displayMessageWordByWord(data.message, botMessageElem);
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
    });

    function displayMessageWordByWord(message, containerElem) {
        const words = message.split(' ');
        let delay = 0;

        words.forEach(word => {
            setTimeout(() => {
                const wordElem = document.createElement("span");
                wordElem.textContent = word + " ";
                wordElem.classList.add("word");
                containerElem.appendChild(wordElem); // Change to append to containerElem

                setTimeout(() => {
                    wordElem.classList.add("visible");
                }, 50);
            }, delay);
            
            delay += 300;
        });
    }
});




const text = "Voici mon portfolio illustré, mes projets sont réalisés en HTML, CSS, JS, PHP, SQL, et Python"
const splitText = text.split("")
const containerText = document.querySelector('p')
let showLetters = ""
let counter = 0
let randomSpeed = 100

setInterval(function(){
    let curentLetter = splitText[counter]
    showLetters += curentLetter
    containerText.innerText = showLetters
    counter++

    if(counter > splitText.length - 1){
        counter = 0
        showLetters = ""
    }
}, randomSpeed)


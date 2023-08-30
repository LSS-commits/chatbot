
function sendMessage() {
    let userInput = document.getElementById("userInput").value;
    fetch('/get_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: userInput})
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("responseArea").innerText = data.response;
    })
    // .catch(error => console.error('Error:', error));
}




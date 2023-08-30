# from browser import document, alert, window

# def echo(event):
#     # alert(document["userInput"].value)
#     echo(document["userInput"].value)

# document["sendButton"].bind("click", echo)

# def getInput(prompt_text= "Coucou hibou"):
#     return window.prompt(prompt_text)

# value = getInput("Comment tu vas")
# print(value)
import os
from flask import Flask, request, jsonify
import openai


openai.api_key = os.getenv('API_KEY')

app = Flask(__name__)

@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json['message']
    messages = [
        {"role": "system", "content": "You are an intelligent assistant."},
        {"role": "user", "content": user_message}
    ]
    response = openai.Completion.create(
        model="gpt-3.5-turbo", 
        messages=messages
    )
    chatGPT_response = response.choices[0].message['content']
    return jsonify({"response": chatGPT_response})

if __name__ == "__main__":
    app.run(debug=True)

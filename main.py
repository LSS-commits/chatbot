from flask import Flask, render_template, request, jsonify
import openai
import os

# Configuration et initialisation de l'application Flask
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')


@app.route('/get_response', methods=['POST'])
def get_response():
    user_message = request.json.get('message', '')
    
    messages = [
        {"role": "system", "content": "You are an intelligent assistant."},
        {"role": "user", "content": user_message}
    ]
    
    try:
        response = openai.Completion.create(
            model="gpt-3.5-turbo", 
            messages=messages
        )
        chatGPT_response = response.choices[0].message['content']
        return jsonify({"response": chatGPT_response})
    
    except Exception as e:
        print("Error:", str(e))  # Log the error in the terminal
        return jsonify({"response": f"Error: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True)

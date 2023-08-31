import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
import openai

# Load environment variables from .env file
load_dotenv()

# Load API key from environment variable
openai.api_key = os.getenv('API_KEY')
if not openai.api_key:
    raise ValueError("No OpenAI API key found. Ensure you've set it in your environment variables or in a .env file.")

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html')

@app.route('/chatbot', methods=['GET'])
def chatbot_endpoint():
    return render_template('chatbot.html')

@app.route('/get_chatbot_response', methods=['POST'])
def get_chatbot_response():
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

    except openai.error.OpenAIError as oaie:
        print("OpenAI error:", oaie)  # Detailed error from OpenAI
        return jsonify({"response": "There was an error processing your request. Please try again later."}), 500

    except Exception as e:
        print("General error:", str(e))  # General error
        return jsonify({"response": "An unexpected error occurred. Please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True)

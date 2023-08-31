# Dépendances
from flask import Flask, request, render_template 
import openai

# pour utiliser les variables d'environnement
import os
from dotenv import load_dotenv
load_dotenv()

# pour ouvrir le navigateur
import webbrowser
from threading import Timer

# configuration de la clé d'API
openai.api_key = os.getenv('API_KEY')


# création de l'instance de l'app 
app = Flask(__name__)

# Routes
# # définition de la route d'affichage de l'URL principale
@app.route('/', methods=["GET"])
def index():
    return render_template('index.html')


# TEST ROUTE
# @app.route('/app/<text>')
# def test(text):
#     return render_template('chatbot.html', txt=text)

# définition de la route pour le point de terminaison du chatbot où les demandes POST seront envoyées
@app.route('/postData', methods=["POST"])
def postData():
    data = request.get_json()
    message = data['message']
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=message,
        max_tokens=50,
        n=1,
        stop=None,
        temperature=0.7
    )
    # TODO: comprendre pourquoi la réponse est tronquée
    reply = response.choices[0].text.strip()
    return {'message': reply}

# définition de la route d'affichage de l'interface du chatbot
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')
    
# ouvrir le navigateur lorsque le serveur est lancé
def open_browser():
    webbrowser.open_new("http://127.0.0.1:5000")

# démarrer l'app
if __name__ == '__main__':
    # ouvrir le navig après 1 seconde
    Timer(1, open_browser).start()

    # définir host et port si besoin
    app.run()

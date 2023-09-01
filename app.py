# Dépendances
from flask import Flask, request, render_template 
import openai

# pour utiliser les variables d'environnement
import os
from dotenv import load_dotenv

# pour ouvrir le navigateur
import webbrowser
from threading import Timer

# charger les variables d'environnement
load_dotenv()

# configuration de la clé d'API
openai.api_key = os.getenv('API_KEY')
if not openai.api_key:
    raise ValueError("Aucune clé API n'a été trouvée. Assurez-vous de l'avoir définie dans vos variables d'environnement.")


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

# définition de la route pour le point de terminaison du chatbot où les demandes POST seront envoyées (soumission du formulaire)
@app.route('/postData', methods=["POST"])
def postData():
    # entrée de l'utilisateur
    # TODO: si le message est vide
    data = request.get_json()
    userMessage = data['message']

    # TODO: donner la possibilité à l'utilisateur de définir role et content du chatbot pour des réponses sur des thématiques spécifiques ?
    messages = [ {'role': 'system', 'content': 'You are intelligent assistant'}]

    if userMessage:
        messages.append(
            {'role': 'user', 'content': userMessage},
        )
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", 
            messages=messages,
            temperature=0.7
        )

    # réponse de l'API
    reply = response.choices[0].message.content
    messages.append(
        {'role': 'assistant', 'content': reply},
    )
    # retourner le message au client (navigateur) pour l'afficher
    return { 'message': reply }
    

# définition de la route d'affichage de l'interface du chatbot
@app.route('/chatbot')
def chatbot():
    return render_template('chatbot.html')
    
# ouvrir le navigateur lorsque le serveur est lancé
def open_browser():
    webbrowser.open_new("http://127.0.0.1:5000")

# démarrer l'app
if __name__ == '__main__':
    # ouvrir le navigateur après 1 seconde
    Timer(1, open_browser).start()

    # définir host et port si besoin
    app.run()

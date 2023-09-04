# Dépendances
from flask import Flask, request, render_template 
import openai

# pour utiliser les variables d'environnement
import os
from dotenv import load_dotenv

# pour ouvrir le navigateur
import webbrowser
from threading import Timer

# pour le logging (DEBUG et ERROR) de l'API
import logging

# Configuration de base du logging (obtenir des infos de debug de l'API)
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')


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


# définition de la route pour le point de terminaison du chatbot, où les demandes POST seront envoyées (soumission du formulaire)
@app.route('/postDataChatbot', methods=["POST"])
def postDataChatbot():
    try:
        # entrée de l'utilisateur
        data = request.get_json()
        userMessage = data['message']

        # l'entrée utilisateur n'est pas vide ou ne contient pas que des espaces
        if userMessage != '' and len(userMessage) != 0 and userMessage.isspace() == False:
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
        else:
            # si le champ est vide ou ne contient que des espaces
            print("Message utilisateur vide")
            return {'message': "Message utilisateur vide"}

    except Exception as e:
        # erreur API
        logging.error("Une erreur s'est produite: %s", e)
        return {'message': "Erreur API"}

# définition de la route pour le point de terminaison de la génération d'images, où les demandes POST seront envoyées (soumission du formulaire)
@app.route('/postDataImage', methods=["POST"])
def postDataImage():
    try:
        # entrée de l'utilisateur
        data = request.get_json()
        userMessage = data['message']

        # l'entrée utilisateur n'est pas vide ou ne contient pas que des espaces
        if userMessage != '' and len(userMessage) != 0 and userMessage.isspace() == False:
            if userMessage:
                image = openai.Image.create(
                    prompt = userMessage,
                    n = 1,
                    size = "256x256"
                )

            # réponse de l'API
            replyImg = image.data[0].url

            # retourner le message au client (navigateur) pour l'afficher
            return { 'image': replyImg }
        else:
            # si le champ est vide ou ne contient que des espaces
            print("Message utilisateur vide")
            return {'message': "Message utilisateur vide"}

    except Exception as e:
        # erreur API
        logging.error("Une erreur s'est produite: %s", e)
        return {'message': "Erreur API"}

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

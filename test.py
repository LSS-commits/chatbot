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
@app.route('/test', methods=["GET"])
def test():
    return render_template('test.html')


@app.route('/postData', methods=["POST"])
def postData():
    # entrée de l'utilisateur
    # TODO: si le message est vide
    data = request.get_json()
    userMessage = data['message']

    if userMessage:
        image = openai.Image.create(
          prompt=userMessage,
          n=1,
          size="512x512"
        )

    # réponse de l'API
    replyImg = image.data[0].url

    # retourner le message au client (navigateur) pour l'afficher
    return { 'image': replyImg }
    

# ouvrir le navigateur lorsque le serveur est lancé
def open_browser():
    webbrowser.open_new("http://127.0.0.1:5000")

# démarrer l'app
if __name__ == '__main__':
    # ouvrir le navigateur après 1 seconde
    Timer(1, open_browser).start()

    # définir host et port si besoin
    app.run()

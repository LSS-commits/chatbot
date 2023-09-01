# CONNEXION A L'API
import openai

# pour utiliser les variables d'environnement
import os
from dotenv import load_dotenv
load_dotenv()



openai.api_key = os.getenv('API_KEY')

# Role help to distinguish the different speaker's role
# Content represent the message from the specified role
messages = [ {'role':'system', 'content':'You are intelligent assistant'}]


while True:
    query = input("🤔 : ")
    if query:
        messages.append(
            # ajouter (answer in french) pour que le bot réponde en français par défaut ?
            # ou ajouter une condition et un bouton language dans la barre de navigation ?
            {'role':'user', 'content': query},
        )
        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages
        )
    reply = chat.choices[0].message.content
    print(f"Chatbot : {reply}")
    messages.append(
        {'role':'assistant', 'content': reply}, 
    )


import os
from dotenv import load_dotenv

load_dotenv()

import openai
openai.api_key = os.getenv('API_KEY')

# Role help to distinguish the different speaker's role
# Content represent the message from the specified role
messages = [ {'role':'system', 'content':'You are intelligent assistant'}]


while True:
    query = input("User : ")
    if query:
        messages.append(
            {'role':'user', 'content': query},
        )
        chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages
        )
    reply = chat.choices[0].message.content
    print(f"ChatGPT: {reply}")
    messages.append(
       {'role':'assistant', 'content': reply}, 
    )


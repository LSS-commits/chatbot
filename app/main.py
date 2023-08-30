import os
# from browser import document, alert
# from dotenv import load_dotenv
from flask import Flask, request, jsonify

# load_dotenv()

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



# Role help to distinguish the different speaker's role
# Content represent the message from the specified role
# messages = [ {'role':'system', 'content':'You are intelligent assistant'}]

# alert("hello")

# while True:
#     query = input("User : ")
#     if query:
#         messages.append(
#             {'role':'user', 'content': query},
#         )
#         chat = openai.ChatCompletion.create(
#             model="gpt-3.5-turbo", messages=messages
#         )
#     reply = chat.choices[0].message.content
#     def echo(event):
#         response= f"ChatGPT: {reply}"
#         document["responseArea"].text=response
   
#     document["sendButton"].bind("click", echo)
#     # print(f"ChatGPT: {reply}")
#     messages.append(
#        {'role':'assistant', 'content': reply}, 
#     )




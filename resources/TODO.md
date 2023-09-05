=> Hilel
- finir le style de la page chatbot OK
- style du scroller sur la chatbox OK


/* test scrollbar FIREFOX */
.test-div {
    max-height: 150px;
    overflow-y: auto;
    padding: 10px;
    scrollbar-width: thin;
    scrollbar-color: #888 #f0f2f5;
    scroll-behavior: smooth;
}

- permettre à l'utilisateur de copier-coller la réponse ? OK
- responsive
- test animation texte accueil
- ajouter un compteur de caractères sur les champs ++
- animation texte accueil fadein ++
- mettre un champ textarea au lien d'un input ? ++
=> champ textarea avec limite de taille + scroll + pas de limite de caractères


=> lss
- gestion des erreurs côté client OK
 et serveur => si le champ est vide ou ne contient que des espaces + erreurs API OK
- Images de openai 
=> ajouter génération d'image via prompt dans la navbar, check branche Hilel
- limite de caractères à 60 HTML OK, 
JS OK, 
TODO: côté serveur 
<i class="fa-regular fa-image"></i> + animation beat ou bounce OK

- TODO: permettre de télécharger l'image => 
https://stackoverflow.com/questions/30694433/how-to-give-browser-save-image-as-option-to-button

- enlever chgt de fond sur btn primary et forcer la couleur sur l'état actif OK

- récupérer code Hilel sur branche lss
- ajouter loadingDots dans modale
- check validation clipboard (retirer le console.error)
- retirer "chatbot :" de la réponse copiée
- placer la responseArea au niveau du début de la nouvelle réponse ++
- ajouter un compteur de caractères sur les champs ++


FIN DU PROJET
- séparer les fonctions dans des fichiers modules pour plus de clarté ++
- nettoyer le projet des fichiers inutiles
- compléter le README

- ajouter la possibilité pour l'utilisateur de choisir un rôle pour le chatbot afin d'avoir des réponses sur des thèmes spécifiques ? PEUT ETRE DANS LA V2 DU PROJET

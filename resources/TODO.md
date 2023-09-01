- finir le style de la page chatbot
- style du scroller sur la chatbox
- limiter le nombre de caractères dans l'input / mettre un champ textarea au lien d'un input ?
=> champ textarea avec limite de taille + scroll + pas de limite de caractères

/* test scrollbar FIREFOX */
.test-div {
    max-height: 150px;
    overflow-y: auto;
    padding: 10px;
    scrollbar-width: thin;
    scrollbar-color: #888 #f0f2f5;
    scroll-behavior: smooth;
}


- permettre à l'utilisateur de copier-coller la réponse ? OUI
- validation du formulaire côté client et serveur => si le champ est vide, pas d'envoi
- ajouter la possibilité pour l'utilisateur de choisir un rôle pour le chatbot afin d'avoir des réponses sur des thèmes spécifiques ?
- ajouter la gestion des erreurs
- API random => Robohash (il faut l'installer avec pip)
- message d'accueil dans le chatbot ?
- responsive
- nettoyer le projet des fichiers inutiles
- compléter le README
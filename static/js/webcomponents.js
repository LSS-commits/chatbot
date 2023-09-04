/* COMPOSANTS HTML (WEBCOMPONENTS) */
class MyModal extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- Modale centrée verticalement -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
<<<<<<< HEAD
                            <h1 class="modal-title fs-5" id="exampleModalLabel">La vie est "random" 🎲</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="modalBodyJoke"></div>
                        <div class="modal-body" id="modalBodyAdvice"></div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
=======
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Les résultats peuvent être surprenants... 😨</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="modalBody">
                            <div class="modal-body-text" id="modalBodyImg"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">Télécharger <i class="fa-solid fa-download" aria-hidden="true"></i></button>
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Fermer</button>
>>>>>>> lss
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}


class MyNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <header>
                <nav class="navbar navbar-expand-lg">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">
                            <img src="/static/assets/picto_rose.png" alt="logo chatbot navbar" class="nav-logo">
                        </a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <i class="fa-solid fa-ellipsis-vertical"></i>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
<<<<<<< HEAD
                                <li class="nav-item">
                                    <!-- Bouton de la modale -->
                                        <i class="fa-solid fa-robot" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                                </li>
                                <li class="nav-item">
                                    <i class="fa-solid fa-circle-half-stroke"></i>
=======
                                <li class="input-area-img">
                                    <!-- Formulaire du générateur d'images -->
                                    <h5>Img IA</h5>
                                    <span>Générez une image avec du texte</span>
                                    <input type="text" id="userInputImg" placeholder="Décrivez votre image..." maxlength="60" required>
                                    <!-- Bouton d'envoi et de la modale -->
                                    <button id="sendButtonImg" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-regular fa-image" aria-hidden="true"></i></button>
                                </li>
                                <li class="nav-item">
                                    <!-- Bouton d'appel à l'action -->
                                    <i class="fa-solid fa-robot fa-bounce"></i>
>>>>>>> lss
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <my-modal></my-modal>
        `;
    }
}


class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="container">
            <footer class="py-3 mt-4 mb-2">
                <a href="/" class="mb-3 me-2 mb-md-0 text-decoration-none lh-1 footerLogo">
                    <img src="/static/assets/picto_rose.png" alt="logo chatbot footer" width="30" height="24" class="rounded">
                </a>
                <span class="mb-3 mb-md-0">©2023 Chatbot by LSS&Hiloul - Tous droits réservés.</span>
                
                <ul class="mb-3 mb-md-0">
                    <li><a class=" href="#"><i class="fa-brands fa-discord"></i></a></li>
                    <li><a class=" href="#"><i class="fa-brands fa-github"></i></a></li>
                    <li><a class=" href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
                </ul>
            </footer>
        </div>
        `;
    }
}


customElements.define('my-modal', MyModal);
customElements.define('my-nav', MyNav);
customElements.define('my-footer', MyFooter);
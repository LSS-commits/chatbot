/* COMPOSANTS HTML (WEBCOMPONENTS) */
class MyNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/index.html">
                        <img src="/public/assets/picto_rose.png" alt="logo chatbot navbar" class="nav-logo">
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                            <li class="nav-item">
                                <i class="fa-solid fa-circle-half-stroke"></i>
                            </li>
                            <li class="nav-item">
                                <i class="fa-solid fa-robot"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        `;
    }
}

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="container">
            <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div class="col-md-4 d-flex align-items-center">
                    <a href="/index.html" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                        <img src="/public/assets/picto_rose.png" alt="logo chatbot footer" width="30" height="24" class="rounded">
                    </a>
                    <span class="mb-3 mb-md-0 text-dark">© 2023 Chatbot, Inc</span>
                </div>

                <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li class="ms-3"><a class="text-dark" href="#"><i class="fa-brands fa-discord"></i></a></li>
                    <li class="ms-3"><a class="text-dark" href="#"><i class="fa-brands fa-github"></i></a></li>
                    <li class="ms-3"><a class="text-dark" href="#"><i class="fa-brands fa-x-twitter"></i></a></li>
                </ul>
            </footer>
        </div>
        `;
    }
}

customElements.define('my-nav', MyNav);
customElements.define('my-footer', MyFooter);
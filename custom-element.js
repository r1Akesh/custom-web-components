const template = document.createElement('template');
template.innerHTML = `
    <style>
        h5 {
            margin:0;
        }
        .d-flex {
            display:flex;
        }
        .justify-content-center {
            justify-content: center;
        }
        .justify-content-between {
            justify-content: space-between;
        }
        .align-center {
            align-items:center;
        }
        .tile-content {
            max-width: 360px;
            min-width: 360px;
            border: 1px solid #9e9e9e3d;
            align-self: start;
            margin: 10px 15px;
            cursor:pointer
        }
        .tile-container{
            height: 11vh
        }
        .tile-logo-container {
            flex-basis: 20%;
            align-items: center;
        }
        .tile-logo {
            height: 45px;
            width: 45px;
            background: #03a9f4;
            color: white;
            border-radius: 4px;
            align-items: center;
        }
        .tile-metadata {
            flex-basis: 80%;
        }
        .bg-blue {
            background: #2196f3;
        }
        .tile-sub-description {
            font-size: 11px;
            color: #808080bf;
            margin-top: 0.5%;
        }
    </style>
    <article class="tile-content">
        <div class="tile-container d-flex">
            <div class="tile-logo-container d-flex justify-content-center">
                <div class="tile-logo d-flex justify-content-center">MG</div>
            </div>
            <div class="tile-metadata d-flex justify-content-between align-center">
                <div class="tile-description">
                    <h5 class="tile-title"></h5>
                    <p class="tile-sub-description"></p>
                </div>
                <div class="tile-navigator">T</div>
            </div>
        </div>

    </article>
`
class TileElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.tileTitle = this.shadowRoot.querySelector('.tile-title');
        this.tileSubDescription = this.shadowRoot.querySelector('.tile-sub-description');
        this.tileLogoEleRef = this.shadowRoot.querySelector('.tile-logo');
        this.tileCard = this.shadowRoot.querySelector('article');
        this.render();
    }

    get tileName() {
        return this.getAttribute('tileName');
    }

    get tileDescription() {
        return this.getAttribute('tileDescription');
    }

    get tileLogo() {
        return this.getAttribute('tileLogo');
    }
    

    static get observedAttributes() {
        return ['tileName','tileDescription'];
    }

    attributeChangedCallback(name,oldValue, newValue) {

    }

    render() {
        if(!this.hasAttribute('tabIndex')){
            this.tileCard.setAttribute('tabIndex',0)
        }
        this.tileTitle.innerText = this.tileName;
        this.tileSubDescription.innerText = this.tileDescription;
        this.tileLogoEleRef.innerText = this.tileLogo;
    }
}

window.customElements.define('tile-card', TileElement);

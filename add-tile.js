const addNewTileTemplate = document.createElement('template');
addNewTileTemplate.innerHTML = `
    <style>
    h5{margin:0}
    .modal {
        display: none; 
        position: fixed; 
        z-index: 1; 
        padding-top: 100px; 
        left: 0;
        top: 0;
        width: 100%; 
        height: 100%; 
        overflow: auto; 
        background-color: rgba(0,0,0,0.4); 
    }
    .modal-content {
        position: relative;
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
        -webkit-animation-name: animatetop;
        -webkit-animation-duration: 0.4s;
        animation-name: animatetop;
        animation-duration: 0.4s
    }
    .modal-header {
        padding: 2px 16px;
        background-color: #9e9e9eb0;
        color: white;
        display:flex;
        justify-content: space-between;
        align-items:center;
    }
    .modal-body {padding: 2px 16px; margin: 20px 2px}
    .close {
        color: white;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }
    .showNewTileModal {
        height: 30px;
        width: 70px;
        color: #2196f3;
        background: white;
        border: 1px solid #8080803b;
    }
    .newTileControls {
        display:flex;
        justify-content: space-between;
    }
    </style>
    <button class="showNewTileModal" type="button">Add new</button>
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Add New Tile</h3>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="newTileControls">
                    <input type="text" id="tileName" placeholder="Tile Name">
                    <input type="text" id="tileDescription" placeholder="Tile description">
                    <input type="text" id="tileLogo" placeholder="Tile Logo text">
                    <button type="button" id="addNewTileToList">Add</button>
                </div>
            </div>
        </div>
    </div>

`
class AddTile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(addNewTileTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.newTileName = this.shadowRoot.querySelector('#tileName');
        this.newTileDescription = this.shadowRoot.querySelector('#tileDescription');
        this.newTileLogo = this.shadowRoot.querySelector('#tileLogo');
        this.modal = this.shadowRoot.querySelector('.modal');
        this.shadowRoot.querySelector('.showNewTileModal').addEventListener('click',this.showModal.bind(this));
        this.shadowRoot.querySelector('.close').addEventListener('click',this.closeModal.bind(this));
        this.shadowRoot.querySelector('#addNewTileToList').addEventListener('click', this.emitNewTileData.bind(this));
    }

    emitNewTileData() {
        const newTileData = {
            tileName:this.newTileName.value,
            tileDescription:this.newTileDescription.value,
            tileLogo: this.newTileLogo.value
        }
        this.dispatchEvent(new CustomEvent("onNewTileAdd", {detail: newTileData}));// creating custom event to emit new tile data.
        this.closeModal();
    }

    showModal() {
        this.modalVisible = true;
        this.modal.style.display = 'block';
    }
    closeModal() {
        this.modalVisible = false;
        this.modal.style.display = 'none';
    }
}
window.customElements.define('add-tile', AddTile);


window.onload = function () {
    availableTiles = [];
    dragEleSource = null;
    fetchData();
    containerEleRef = document.getElementById('available-tiles');
    newTileModalRef = document.querySelector('add-tile');
    searchInputRef = document.querySelector('.searchText');
    newTileModalRef.addEventListener('onNewTileAdd', (e) => {
        this.addNewTile(e.detail);
    }, false);

    searchInputRef.addEventListener('keyup',(e) => {
        this.filterResults(e.target.value); // further delay can be added using throttling.
    }, false)

}

function filterResults(searchText) {
    let filteredResult = this.availableTiles.filter((tile) => tile.tileName.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
    renderElements(filteredResult);
}

function fetchData() {
    fetch('./tiles.json').then(response => response.json()).then(response => {
        this.availableTiles = response;
        renderElements(response);
    });
}

function addNewTile(newTileData) {
    newTileData['id'] = this.availableTiles.length + 1;
    availableTiles.push(newTileData);
    renderElements(availableTiles);
}

function renderElements(tilesToBeRendered) {
    this.containerEleRef.innerHTML = '';
    tilesToBeRendered.forEach((ele, index) => {
        let component = document.createElement('tile-card');
        component.setAttribute('tileName', ele.tileName);
        component.setAttribute('tileDescription', ele.tileDescription);
        component.setAttribute('tileLogo', ele.tileLogo);
        component.setAttribute('id', (index + 1));

        component.setAttribute('draggable', true);
        addeventListeners(component);
        this.containerEleRef.appendChild(component);
    });
}

function addeventListeners(component) {
    component.addEventListener('dragstart', handleDragStart);
    component.addEventListener('dragover', handleDragOver);
   // component.addEventListener('dragenter', handleDragEnter); // to add dotted border CSS for drag enter
   // component.addEventListener('dragleave', handleDragLeave);
  //  component.addEventListener('dragend', handleDragEnd);
    component.addEventListener('drop', handleDrop);
}

/* Drag and drop utils starts here */

function handleDragStart(ev) {
    console.log(ev);
    dragEleSource = this;
    ev.dataTransfer.setData('text/html', this.outerHTML);
    ev.dataTransfer.dropEffect = "move";
}

function handleDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    /* const data = ev.dataTransfer.getData("application/my-app");
     ev.target.insertAdjacentElement('beforebegin',document.getElementById(data)); */

    if (dragEleSource != this) {
        this.parentNode.removeChild(dragEleSource);
        var dropHTML = ev.dataTransfer.getData('text/html');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        var dropElem = this.previousSibling;
        addeventListeners(dropElem);
    }

}

function handleDragOver(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
}

/* Drag and Drop utlis ends here. */

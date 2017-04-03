'use strict';

let dynamicControllerFile = document.createElement('script');
dynamicControllerFile.src = './js/Classes/DynamicController.js';
document.head.appendChild(dynamicControllerFile);
let cellFile = document.createElement('script');
cellFile.src = './js/Classes/Cell.js';
document.head.appendChild(cellFile);
let materialFile = document.createElement('script');
materialFile.src = './js/Classes/Material.js';
document.head.appendChild(materialFile);
let controlPanelControllerFile = document.createElement('script');
controlPanelControllerFile.src = './js/Classes/ControlPanelController.js';
document.head.appendChild(controlPanelControllerFile);

let dynamicController;
let controlPanelController;

function changeDataSize(newValue){
    const board = document.getElementById('board');
    board.setAttribute('data-size', newValue);
}
function changeRefreshRate(newValue){
    const board = document.getElementById('board');
    board.setAttribute('data-refresh', newValue);
}

function changeMaterialQuantity(newValue){
    const board = document.getElementById('board');
    board.setAttribute('data-materials', newValue);
}

function loadScript() {
    const board = document.getElementById('board');
    const controlPanelStatsDiv = document.getElementById('stats-shower');
    const refreshTime = board.getAttribute('data-refresh');
    const cellSize = 500 / board.getAttribute('data-size');
    let materials = [];
    const materialQuantity = board.getAttribute('data-materials');
    for (let i = 0; i < materialQuantity; i++){
        const material = new Material(
            '#' + Math.floor(Math.random() * 16777215).toString(16),
            Math.ceil(Math.random() * materialQuantity),
            Math.random() >= 0.5
        );
        materials[materials.length] = material;
    }
    if (dynamicController !== undefined) {
        clearInterval(dynamicController.dynamic);
    }

    controlPanelController = new ControlPanelController(controlPanelStatsDiv, materials);
    dynamicController = new DynamicController(board, materials, controlPanelController, refreshTime, cellSize);
}

window.onload = loadScript;
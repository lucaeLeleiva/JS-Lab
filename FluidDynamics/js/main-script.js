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

function loadScript() {
    const board = document.getElementById('board');
    const controlPanelStatsDiv = document.getElementById('stats-shower');
    const refreshTime = 100;
    const cellSize = 3;
    let materials = [];
    const materialQuantity = 10;
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
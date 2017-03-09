let dynamicControllerFile = document.createElement('script');
dynamicControllerFile.src = './js/Classes/DynamicController.js';
document.head.appendChild(dynamicControllerFile);
let cellFile = document.createElement('script');
cellFile.src = './js/Classes/Cell.js';
document.head.appendChild(cellFile);
let materialFile = document.createElement('script');
materialFile.src = './js/Classes/Material.js';
document.head.appendChild(materialFile);

let dynamicController;

function loadScript() {
    const board = document.getElementById('board');
    const refreshTime = 500;
    const cellSize = '3px';
    const material1 = new Material('red', 0, false);
    const material2 = new Material('blue', Math.ceil(Math.random() * 10), true);
    const material3 = new Material('green', Math.ceil(Math.random() * 10), true);
    const material4 = new Material('yellow', Math.ceil(Math.random() * 10), true);
    const material5 = new Material('orange', Math.ceil(Math.random() * 10), true);
    const material6 = new Material('pink', Math.ceil(Math.random() * 10), true);
    const material7 = new Material('black', Math.ceil(Math.random() * 10), true);
    const material8 = new Material('violet', Math.ceil(Math.random() * 10), true);
    const materials = [material1, material2, material3, material4, material5, material6, material7, material8, ];
    if (dynamicController !== undefined) {
        clearInterval(dynamicController.dynamic);
    }

    dynamicController = new DynamicController(board, materials, refreshTime, cellSize);
}

window.onload = loadScript;
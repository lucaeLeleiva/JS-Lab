'use strict';

class ControlPanelController {
    constructor(controlPanelStatsDiv, materials) {
        this.materials = materials;
        this.controlPanelStatsDiv = controlPanelStatsDiv;
        this.instatiateDiv();
    }
    instatiateDiv() {
        while (this.controlPanelStatsDiv.firstChild){
            this.controlPanelStatsDiv.removeChild(this.controlPanelStatsDiv.firstChild);
        }
        for (let i = 0; i < this.materials.length; i++) {
            let pre = document.createElement('pre');
            let colorName = document.createElement('span');
            colorName.style.width = '10px';
            colorName.style.height = '10px';
            colorName.style.margin = '0px';
            colorName.style.display = 'block';
            colorName.style.float = 'left';
            colorName.style.backgroundColor = this.materials[i].color;
            colorName.classList.add('color-name');
            let color = document.createElement('span');
            color.innerHTML = 'Color';
            color.appendChild(colorName);

            let densityNumber = document.createElement('span');
            densityNumber.innerHTML = this.materials[i].density;
            densityNumber.classList.add('density-number');
            let density = document.createElement('span');
            density.innerHTML = ' Densidad: ';
            density.appendChild(densityNumber);

            let moveableContent = document.createElement('span');
            moveableContent.innerHTML = this.materials[i].moveable;
            moveableContent.classList.add('moveable-content');
            let moveable = document.createElement('span');
            moveable.innerHTML = ' \t Es movible: ';
            moveable.appendChild(moveableContent);

            let contenedor = document.createElement('div');

            pre.appendChild(color);
            pre.appendChild(density);
            pre.appendChild(moveable);
            contenedor.appendChild(pre);
            this.controlPanelStatsDiv.appendChild(contenedor);
        }
        /*this.material.forEach(function(element) {
            let pre = document.createElement('pre');
            let colorName = document.createElement('span');
            colorName.style.width = '10px';
            colorName.style.height = '10px';
            colorName.style.margin = '0px';
            colorName.style.display = 'block';
            colorName.style.float = 'left';
            colorName.style.backgroundColor = element.color;
            colorName.classList.add('color-name');
            let color = document.createElement('span');
            color.innerHTML = 'Color';
            color.appendChild(colorName);

            let densityNumber = document.createElement('span');
            densityNumber.innerHTML = element.density;
            densityNumber.classList.add('density-number');
            let density = document.createElement('span');
            density.innerHTML = ' Densidad: ';
            density.appendChild(densityNumber);

            let moveableContent = document.createElement('span');
            moveableContent.innerHTML = element.moveable;
            moveableContent.classList.add('moveable-content');
            let moveable = document.createElement('span');
            moveable.innerHTML = ' \t Es movible: ';
            moveable.appendChild(moveableContent);

            let contenedor = document.createElement('div');

            pre.appendChild(color);
            pre.appendChild(density);
            pre.appendChild(moveable);
            contenedor.appendChild(pre);
            this.controlPanelStatsDiv.appendChild(contenedor);
        }, this);*/
    }
    updateMaterialShowingStats() {
        for (let i = 0; i < this.controlPanelStatsDiv.childNodes.length; i++) {
            for (let j = 0; j < this.materials.length; j++){
                if (this.controlPanelStatsDiv.children[i].children[0].children[0].children[0].style.backgroundColor === this.materials[j].color) {
                    this.controlPanelStatsDiv.children[i].children[0].children[1].children[0].innerHTML = this.materials[j].density;
                    this.controlPanelStatsDiv.children[i].children[0].children[2].children[0].innerHTML = this.materials[j].moveable;
                }
            }
            /*this.material.forEach(function(element) {
                if (this.controlPanelStatsDiv.children[i].children[0].children[0].children[0].style.backgroundColor === element.color) {
                    this.controlPanelStatsDiv.children[i].children[0].children[1].children[0].innerHTML = element.density;
                    this.controlPanelStatsDiv.children[i].children[0].children[2].children[0].innerHTML = element.moveable;
                }
            }, this);*/
        }
    }
}
'use strict';

class ControlPanelController {
    constructor(controlPanelStatsDiv, material) {
        this.material = material;
        this.controlPanelStatsDiv = controlPanelStatsDiv;
        this.instatiateDiv();
    }
    instatiateDiv() {
        while (this.controlPanelStatsDiv.firstChild){
            this.controlPanelStatsDiv.removeChild(this.controlPanelStatsDiv.firstChild);
        }
        this.material.forEach(function(element) {
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
        }, this);
    }
    updateMaterialShowingStats() {
        const childrenLength = this.controlPanelStatsDiv.childNodes.length;
        for (let i = 0; i < childrenLength; i++) {

            this.material.forEach(function(element) {
                //console.log(element.color);
                if (this.controlPanelStatsDiv.children[i].children[0].children[0].children[0].style.backgroundColor === element.color) {
                    this.controlPanelStatsDiv.children[i].children[0].children[1].children[0].innerHTML = element.density;
                    this.controlPanelStatsDiv.children[i].children[0].children[2].children[0].innerHTML = element.moveable;
                }
            }, this);
        }
    }
}
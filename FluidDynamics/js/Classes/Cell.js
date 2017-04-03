'use strict';

class Cell {
    constructor(x, y, material, size) {
        this.size = size;
        this.coordinates = {
            'x': x,
            'y': y,
        };
        this.material = material;
    }
    dom() {
        let dom = document.createElement('span');
        dom.style.backgroundColor = this.material.color;
        this.material.color = dom.style.backgroundColor;
        dom.style.margin = '0px';
        dom.style.float = 'left';
        dom.style.display = 'block';
        dom.style.width = this.size + 'px';
        dom.style.height = this.size + 'px';
        dom.id = this.coordinates.x + '-' + this.coordinates.y;
        return dom;
    }
    changeMaterial(material) {
        this.material = material;
        this.dom.style.backgroundColor = material.color;
    }
    checkSurrounding(boardArray) {
        let arrayToReturn = [
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ];
        let hasMoves = false;
        for(let i = 0; i < arrayToReturn.length; i++){
            for(let j = 0; j < arrayToReturn[i].length; j++){
                const coordinateX = this.coordinates.x;
                const coordinateY = this.coordinates.y;
                if (boardArray[coordinateX + (i - 1)] !== undefined &&
                    boardArray[coordinateX + (i - 1)][coordinateY + (j - 1)] !== undefined) {
                    let neigthbour = boardArray[coordinateX + (i - 1)][coordinateY + (j - 1)];
                    if (neigthbour.material !== this.material && neigthbour.material.moveable) {
                        if ((i - 1) < 0) {
                            if (this.material.isDenser(neigthbour.material) === true) {
                                arrayToReturn[i][j] = true;
                                hasMoves = true;
                            }
                        } else if ((i - 1) > 0) {
                            if (this.material.isDenser(neigthbour.material) === false) {
                                arrayToReturn[i][j] = true;
                                hasMoves = true;
                            }
                        } else {
                            arrayToReturn[i][j] = true;
                            hasMoves = true;
                        }

                    }
                }
            }
        }
        if(hasMoves === true){
            return arrayToReturn;
        }else{
            return false;
        }
        
    }
}
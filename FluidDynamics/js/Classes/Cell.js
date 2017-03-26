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
        
        let arrayToReturn = {
            '-1': { '-1': false, '0': false, '+1': false, },
            '0': { '-1': false, '+1': false, },
            '+1': { '-1': false, '0': false, '+1': false, },
        };
        let hasMoves = false;
        for (let[row, value] of Object.entries(arrayToReturn)) {
            for (let [column, innerValue] of Object.entries(arrayToReturn[row])) {
                const coordinateX = this.coordinates.x;
                const coordinateY = this.coordinates.y;
                if (boardArray[coordinateX + parseInt(row)] !== undefined &&
                    boardArray[coordinateX + parseInt(row)][coordinateY + parseInt(column)] !== undefined) {
                    let neigthbour = boardArray[coordinateX + parseInt(row)][coordinateY + parseInt(column)];
                    if (neigthbour.material !== this.material && neigthbour.material.moveable) {
                        if (parseInt(row) < 0) {
                            if (this.material.isDenser(neigthbour.material) === true) {
                                arrayToReturn[row][column] = true;
                                hasMoves = true;
                            }
                        } else if (parseInt(row) > 0) {
                            if (this.material.isDenser(neigthbour.material) === false) {
                                arrayToReturn[row][column] = true;
                                hasMoves = true;
                            }
                        } else {
                            arrayToReturn[row][column] = true;
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
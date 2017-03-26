'use strict';

class DynamicController {
    constructor(board, materials, controlPanel, refreshTime, cellSize) {
        this.boardArray = [];
        this.board = board;
        this.materials = materials;
        this.refreshTime = refreshTime;
        this.cellSize = cellSize;
        this.dynamic = null;
        this.controlPanel = controlPanel;
        this.fillBoard();
    }
    fillBoard() {
        while (this.board.firstChild) {
            this.board.removeChild(this.board.firstChild);
        }
        const size = this.board.getAttribute('data-size');
        this.board.style.width = ((size * this.cellSize) + 'px');
        this.board.style.margin = '0px';
        this.board.style.float = 'left';
        for (let i = 0; i < size; i++) {
            this.boardArray[i] = [];
            const row = document.createElement('div');
            row.style.margin = '0px';
            row.style.width = ((size * this.cellSize)+'px');
            row.style.height = this.cellSize+'px';
            for (let j = 0; j < size; j++) {
                const index = Math.floor(Math.random() * this.materials.length);
                const material = this.materials[index];
                const cell = new Cell(i, j, material, this.cellSize);
                row.appendChild(cell.dom());
                this.boardArray[i][j] = cell;
            }
            this.board.appendChild(row);
        }
        this.startDynamic();
    }
    startDynamic() {
        if (this.dynamic === null) {
            this.controlPanel.updateMaterialShowingStats();
            this.dynamic = setInterval(this.continueDynamic, this.refreshTime, this);
        }
    }
    redrawBoard(dynamic) {
        const boardArrayLength = dynamic.boardArray.length;
        for (let i = 0; i < boardArrayLength; i++) {
            const boardArrayRowLength = dynamic.boardArray[i].length;
            for (let j = 0; j < boardArrayRowLength; j++) {
                if (dynamic.board.children[i].children[j].style.backgroundColor !== dynamic.boardArray[i][j].material.color){
                    dynamic.board.children[i].children[j].style.backgroundColor = dynamic.boardArray[i][j].material.color;
                }
            }
        }
    }
    pauseDynamic() {
        clearInterval(this.dynamic);
        this.dynamic = null;
    }
    continueDynamic(dynamic) {
        const performance1 = performance.now();
        const boardArrayLength = dynamic.boardArray.length;
        for (let i = 0; i < boardArrayLength; i+=2) {
            const boardArrayRowLength = dynamic.boardArray[i].length;
            for (let j = 0; j < boardArrayRowLength; j+=2) {
                const cell = dynamic.boardArray[i][j];
                const material = cell.material;
                if (material.moveable) {
                    let posibleMoves = [
                        [],
                        [],
                        [],
                    ];
                    const neightbours = cell.checkSurrounding(dynamic.boardArray);
                    if (neightbours !== false){
                        let hasPosibleMoves = false;
                        for (let [key, value] of Object.entries(neightbours)) {
                            for (let [innerKey, innerValue] of Object.entries(neightbours[key])) {
                                if (neightbours[key][innerKey] === true) {
                                    if (parseInt(key) === -1) {
                                        posibleMoves[0][posibleMoves[0].length] = [key, innerKey];
                                        //posibleMoves[0].push();
                                    } else if (parseInt(key) === 1) {
                                        posibleMoves[1][posibleMoves[1].length] = [key, innerKey];
                                        //posibleMoves[1].push([key, innerKey]);
                                    } else if (parseInt(key) === 0) {
                                        posibleMoves[2][posibleMoves[2].length] = [key, innerKey];
                                        //posibleMoves[2].push([key, innerKey]);
                                    }
                                    hasPosibleMoves = true;

                                }
                            }
                        }
                        if (hasPosibleMoves === true) {
                            for (let k = 0; k < posibleMoves.length; k++) {
                                if (posibleMoves[k].length > 0) {
                                    const move = posibleMoves[k][Math.floor(Math.random() * posibleMoves[k].length)];
                                    const aux = material;
                                    cell.material = dynamic.boardArray[i + parseInt(move[0])][j + parseInt(move[1])].material;
                                    dynamic.boardArray[i + parseInt(move[0])][j + parseInt(move[1])].material = aux;
                                    break;
                                }
                            }
                        }
                    }
                }
                const chance = Math.random();
                if (chance >= 0.99999) {
                    material.density += 1;
                    dynamic.controlPanel.updateMaterialShowingStats();
                }
                if (chance <= 0.00001) {
                    material.density -= 1;
                    dynamic.controlPanel.updateMaterialShowingStats();
                }
                if (chance <= 0.50001 && chance >= 0.49999) {
                    material.moveable = !material.moveable;
                    dynamic.controlPanel.updateMaterialShowingStats();
                }

            }
        }
        dynamic.redrawBoard(dynamic);
        const performance2 = performance.now();
        console.log('loopTime: ' + (performance2 - performance1));
    }
}

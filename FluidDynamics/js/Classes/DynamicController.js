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
        for (let i = 0; i < dynamic.boardArray.length; i++) {
            for (let j = 0; j < dynamic.boardArray[i].length; j++) {
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
        for (let i = 0; i < dynamic.boardArray.length; i+=2) {
            for (let j = 0; j < dynamic.boardArray[i].length; j+=2) {
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
                        for (let k = 0; k < neightbours.length; k++) {
                            for (let l = 0; l < neightbours[k].length; l++) {
                                if (neightbours[k][l] === true) {
                                    if ((k-1) === -1) {
                                        posibleMoves[0][posibleMoves[0].length] = [k, l];
                                    } else if ((k - 1) === 1) {
                                        posibleMoves[1][posibleMoves[1].length] = [k, l];
                                    } else if ((k - 1) === 0) {
                                        posibleMoves[2][posibleMoves[2].length] = [k, l];
                                    }
                                    hasPosibleMoves = true;
                                }
                            }
                        }
                        if (hasPosibleMoves === true) {
                            for (let m = 0; m < posibleMoves.length; m++) {
                                if (posibleMoves[m].length > 0) {
                                    const move = posibleMoves[m][Math.floor(Math.random() * posibleMoves[m].length)];
                                    const aux = material;
                                    cell.material = dynamic.boardArray[i + (move[0]-1)][j + (move[1]-1)].material;
                                    dynamic.boardArray[i + (move[0]-1)][j + (move[1]-1)].material = aux;
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

class DynamicController {
    constructor(board, materials, refreshTime, cellSize) {
        this.boardArray = [];
        this.board = board;
        this.materials = materials;
        this.refreshTime = refreshTime;
        this.cellSize = cellSize;
        this.dynamic = null;
        this.fillBoard();
    }
    fillBoard() {
        while (this.board.firstChild) {
            this.board.removeChild(this.board.firstChild);
        }
        const size = this.board.getAttribute('data-size');
        for (let i = 0; i < size; i++) {
            this.boardArray[i] = [];
            let row = document.createElement('div');
            row.style.margin = '0px';
            row.style.width = '100%';
            row.style.height = this.cellSize;
            for (let j = 0; j < size; j++) {
                let index = Math.floor(Math.random() * this.materials.length);
                let material = this.materials[index];
                let id = i + '-' + j;
                let cell = new Cell(id, material.color, this.cellSize);
                row.appendChild(cell.dom);
                this.boardArray[i][j] = material;
            }
            this.board.appendChild(row);
        }

        this.startDynamic();
    }
    startDynamic() {
        if (this.dynamic === null) {
            this.dynamic = setInterval(this.continueDynamic, this.refreshTime, this);
        }
    }
    redrawBoard(dynamic) {

        for (let i = 0; i < dynamic.boardArray.length; i++) {
            for (let j = 0; j < dynamic.boardArray[i].length; j++) {
                let id = i + '-' + j;
                let cell = document.getElementById(id);
                let material = dynamic.boardArray[i][j];
                cell.style.backgroundColor = material.color;
            }
        }
    }
    pauseDynamic() {
        clearInterval(this.dynamic);
        this.dynamic = null;
    }
    continueDynamic(dynamic) {
        for (let i = 0; i < dynamic.boardArray.length; i++) {
            for (let j = 0; j < dynamic.boardArray[i].length; j++) {
                if (dynamic.boardArray[i][j].moveable) {
                    let posibleMoves = [
                        [],
                        [],
                        [],
                    ];
                    let neightbours = dynamic.boardArray[i][j].checkSurrounding(dynamic.boardArray, i, j);
                    for (let [key, value] of Object.entries(neightbours)) {
                        for (let [innerKey, innerValue] of Object.entries(neightbours[key])) {
                            if (neightbours[key][innerKey] === true) {
                                if (parseInt(key) == -1) {
                                    posibleMoves[0].push([key, innerKey]);
                                } else if (parseInt(key) == 1) {
                                    posibleMoves[1].push([key, innerKey]);
                                } else if (parseInt(key) == 0) {
                                    posibleMoves[2].push([key, innerKey]);
                                }

                            }
                        }
                    }
                    for (let k = 0; k < posibleMoves.length; k++) {
                        if (posibleMoves[k].length > 0) {
                            let move = posibleMoves[k][Math.floor(Math.random() * posibleMoves[k].length)];
                            const aux = dynamic.boardArray[i][j];
                            dynamic.boardArray[i][j] = dynamic.boardArray[i + parseInt(move[0])][j + parseInt(move[1])];
                            dynamic.boardArray[i + parseInt(move[0])][j + parseInt(move[1])] = aux;
                            break;
                        }
                    }

                }
                let chance = Math.random();
                if (chance >= 0.99999) {
                    dynamic.boardArray[i][j].density += 1;
                    console.log(dynamic.boardArray[i][j].color + '\t' + dynamic.boardArray[i][j].density);
                }
                if (chance <= 0.00001) {
                    dynamic.boardArray[i][j].density -= 1;
                    console.log(dynamic.boardArray[i][j].color + '\t' + dynamic.boardArray[i][j].density);
                }
                if (chance <= 0.50001 && chance >= 0.49999) {
                    dynamic.boardArray[i][j].moveable = !dynamic.boardArray[i][j].moveable;
                    console.log(dynamic.boardArray[i][j].color + '\t' + dynamic.boardArray[i][j].moveable);
                }

            }
        }
        dynamic.redrawBoard(dynamic);
    }
}
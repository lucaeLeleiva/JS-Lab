class DynamicController {
    constructor(board, materials, refreshTime, cellSize) {
        this.boardArray = [];
        this.board = board;
        this.materials = materials;
        this.refreshTime = refreshTime;
        this.cellSize = cellSize;
        this.stable = false;
        this.dynamic;
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

        this.dynamic = setInterval(this.continueDynamic, this.refreshTime, this);
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
    }
    continueDynamic(dynamic) {
        /*if (dynamic.stable === true) {
            console.log("Estable");
            clearInterval(dynamic.dynamic);
        } else {*/
        dynamic.stable = true;
        for (let i = 0; i < dynamic.boardArray.length; i++) {
            if (dynamic.boardArray[i - 1] !== undefined) {
                for (let j = 0; j < dynamic.boardArray[i].length; j++) {
                    if (dynamic.boardArray[i][j].moveable) {
                        if (dynamic.boardArray[i - 1][j].isDenser(dynamic.boardArray[i][j]) && dynamic.boardArray[i - 1][j].moveable) {
                            dynamic.stable = false;
                            const aux = dynamic.boardArray[i][j];
                            dynamic.boardArray[i][j] = dynamic.boardArray[i - 1][j];
                            dynamic.boardArray[i - 1][j] = aux;

                        } else if (dynamic.boardArray[i - 1][j - 1] !== undefined && dynamic.boardArray[i - 1][j + 1] !== undefined) {
                            let preferencialFall = Math.ceil(Math.random() * 2);
                            if (preferencialFall == 2) {
                                if (dynamic.boardArray[i - 1][j - 1].isDenser(dynamic.boardArray[i][j]) && dynamic.boardArray[i - 1][j - 1].moveable) {
                                    dynamic.stable = false;
                                    const aux = dynamic.boardArray[i][j];
                                    dynamic.boardArray[i][j] = dynamic.boardArray[i - 1][j - 1];
                                    dynamic.boardArray[i - 1][j - 1] = aux;

                                }
                            } else if (preferencialFall == 1) {
                                if (dynamic.boardArray[i - 1][j + 1].isDenser(dynamic.boardArray[i][j]) && dynamic.boardArray[i - 1][j + 1].moveable) {
                                    dynamic.stable = false;
                                    const aux = dynamic.boardArray[i][j];
                                    dynamic.boardArray[i][j] = dynamic.boardArray[i - 1][j + 1];
                                    dynamic.boardArray[i - 1][j + 1] = aux;

                                }
                            }
                        } else if (dynamic.boardArray[i - 1][j - 1] !== undefined) {
                            if (dynamic.boardArray[i - 1][j - 1].isDenser(dynamic.boardArray[i][j]) && dynamic.boardArray[i - 1][j - 1].moveable) {
                                dynamic.stable = false;
                                const aux = dynamic.boardArray[i][j];
                                dynamic.boardArray[i][j] = dynamic.boardArray[i - 1][j - 1];
                                dynamic.boardArray[i - 1][j - 1] = aux;

                            }
                        } else if (dynamic.boardArray[i - 1][j + 1] !== undefined) {
                            if (dynamic.boardArray[i - 1][j + 1].isDenser(dynamic.boardArray[i][j]) && dynamic.boardArray[i - 1][j + 1].moveable) {
                                dynamic.stable = false;
                                const aux = dynamic.boardArray[i][j];
                                dynamic.boardArray[i][j] = dynamic.boardArray[i - 1][j + 1];
                                dynamic.boardArray[i - 1][j + 1] = aux;

                            }
                        }
                    }
                    let chance = Math.random();
                    if (chance >= 0.99999) {
                        dynamic.boardArray[i][j].density += 10;
                        console.log(dynamic.boardArray[i][j].color + '\t' + dynamic.boardArray[i][j].density);
                    }
                    if (chance <= 0.00001) {
                        dynamic.boardArray[i][j].density -= 10;
                        console.log(dynamic.boardArray[i][j].color + '\t' + dynamic.boardArray[i][j].density);
                    }
                    if (chance <= 0.50001 && chance >= 0.49999) {
                        dynamic.boardArray[i][j].moveable = !dynamic.boardArray[i][j].moveable;
                        console.log(dynamic.boardArray[i][j].color + '\t' + dynamic.boardArray[i][j].moveable);
                    }
                }

            }

        }
        dynamic.redrawBoard(dynamic);
    }
}
class Cell {
    constructor(id, color, size) {
        this.dom = document.createElement('span');
        this.dom.style.backgroundColor = color;
        this.dom.style.margin = '0px';
        this.dom.style.float = 'left';
        this.dom.style.display = 'block';
        this.dom.style.width = size;
        this.dom.style.height = size;
        this.dom.id = id;
    }
    changeColor(color) {
        this.dom.style.backgroundColor = color;
    }
}
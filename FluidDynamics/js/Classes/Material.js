class Material {
    constructor(color, density, moveable) {
        this.color = color;
        this.density = density;
        this.moveable = moveable;
    }
    isDenser(material) {
        if (this.density > material.density) {
            return true;
        } else {
            return false;
        }
    }
}
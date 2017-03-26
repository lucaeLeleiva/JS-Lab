'use strict';

class Material {
    constructor(color, density, moveable) {
        this.color = color;
        this.density = density;
        this.moveable = moveable;
    }
    isDenser(material) {
        if (this.density > material.density) {
            return true;
        } else if ((this.density < material.density)) {
            return false;
        } else {
            return undefined;
        }
    }
}
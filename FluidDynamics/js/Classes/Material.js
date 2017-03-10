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
    checkSurrounding(boardArray, coordinateX, coordinateY) {
        let arrayToReturn = {
            '-1': { '-1': false, '0': false, '+1': false, },
            '0': { '-1': false, '+1': false, },
            '+1': { '-1': false, '0': false, '+1': false, },
        }
        for (let [key, value] of Object.entries(arrayToReturn)) {
            for (let [innerKey, innerValue] of Object.entries(arrayToReturn[key])) {
                if (boardArray[coordinateX + parseInt(key)] !== undefined && boardArray[coordinateX + parseInt(key)][coordinateY + parseInt(innerKey)] !== undefined) {
                    let neigthbour = boardArray[coordinateX + parseInt(key)][coordinateY + parseInt(innerKey)];
                    if (neigthbour.moveable) {
                        if (parseInt(key) < 0) {
                            if (boardArray[coordinateX][coordinateY].isDenser(neigthbour) === true) {
                                arrayToReturn[key][innerKey] = true;
                            }
                        } else if (parseInt(key) > 0) {
                            if (boardArray[coordinateX][coordinateY].isDenser(neigthbour) === false || boardArray[coordinateX][coordinateY].isDenser(neigthbour) === undefined) {
                                arrayToReturn[key][innerKey] = true;
                            }
                        } else {
                            arrayToReturn[key][innerKey] = true;
                        }

                    }
                }
            }
        }
        return arrayToReturn;
    }
}
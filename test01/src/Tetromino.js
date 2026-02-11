import { SHAPES, COLORS } from './constants.js';

export class Tetromino {
    constructor(type) {
        this.type = type;
        this.shape = SHAPES[type];
        this.color = COLORS[type];
        this.rotation = 0;
    }

    rotate(direction = 1) {
        // direction: 1 for clockwise, -1 for counter-clockwise
        this.rotation = (this.rotation + direction + 4) % 4;
    }

    getRotation() {
        return this.rotation;
    }

    getShape() {
        return this.shape[this.rotation];
    }

    clone() {
        const clone = new Tetromino(this.type);
        clone.rotation = this.rotation;
        return clone;
    }
}

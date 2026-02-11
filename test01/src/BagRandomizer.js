import { TETROMINOS } from './constants.js';

export class BagRandomizer {
    constructor() {
        this.bag = [];
        this.refillBag();
    }

    refillBag() {
        // Create a new bag with all 7 tetrominos
        const newBag = [...TETROMINOS];

        // Fisher-Yates shuffle
        for (let i = newBag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newBag[i], newBag[j]] = [newBag[j], newBag[i]];
        }

        this.bag.push(...newBag);
    }

    next() {
        if (this.bag.length === 0) {
            this.refillBag();
        }
        return this.bag.shift();
    }

    peek(count = 5) {
        // Ensure we have enough pieces
        while (this.bag.length < count) {
            this.refillBag();
        }
        return this.bag.slice(0, count);
    }
}

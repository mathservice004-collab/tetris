import { BOARD_WIDTH, BOARD_HEIGHT } from './constants.js';

export class Board {
    constructor() {
        this.grid = this.createEmptyGrid();
    }

    createEmptyGrid() {
        return Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(null));
    }

    isValid(piece, x, y, rotation) {
        const shape = piece.shape[rotation];

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const newX = x + col;
                    const newY = y + row;

                    // Check boundaries
                    if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
                        return false;
                    }

                    // Check collision (allow negative Y for spawning)
                    if (newY >= 0 && this.grid[newY][newX] !== null) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    place(piece, x, y, rotation) {
        const shape = piece.shape[rotation];

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const newY = y + row;
                    if (newY >= 0) {
                        this.grid[newY][x + col] = piece.type;
                    }
                }
            }
        }
    }

    clearLines() {
        let linesCleared = 0;
        const linesToClear = [];

        // Find full lines
        for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
            if (this.grid[y].every(cell => cell !== null)) {
                linesToClear.push(y);
            }
        }

        // Remove full lines and add empty ones at top
        linesToClear.forEach(lineY => {
            this.grid.splice(lineY, 1);
            this.grid.unshift(Array(BOARD_WIDTH).fill(null));
            linesCleared++;
        });

        return linesCleared;
    }

    reset() {
        this.grid = this.createEmptyGrid();
    }

    getGrid() {
        return this.grid;
    }
}

import { Board } from './Board.js';
import { Tetromino } from './Tetromino.js';
import { BagRandomizer } from './BagRandomizer.js';
import { tryRotate } from './SRS.js';
import {
    BOARD_WIDTH,
    GRAVITY_FRAMES,
    LOCK_DELAY_FRAMES,
    SCORE_VALUES,
    LINES_PER_LEVEL,
    DAS_FRAMES,
    ARR_FRAMES,
    SOFT_DROP_FRAMES
} from './constants.js';

export class GameEngine {
    constructor() {
        this.board = new Board();
        this.bag = new BagRandomizer();
        this.reset();
    }

    reset() {
        this.board.reset();
        this.bag = new BagRandomizer();

        this.currentPiece = new Tetromino(this.bag.next());
        this.x = Math.floor(BOARD_WIDTH / 2) - 2;
        this.y = -1;

        this.heldPiece = null;
        this.canHold = true;

        this.score = 0;
        this.lines = 0;
        this.level = 1;
        this.gameOver = false;

        this.gravityCounter = 0;
        this.lockDelayCounter = 0;
        this.isLocking = false;

        this.lastLineClearWasTetris = false;

        // Input state
        this.keys = {};
        this.dasCounter = {};
        this.arrCounter = {};
    }

    getNextPieces() {
        return this.bag.peek(5);
    }

    update() {
        if (this.gameOver) return;

        // Handle gravity
        const gravityFrames = this.getGravityFrames();
        this.gravityCounter++;

        if (this.gravityCounter >= gravityFrames) {
            this.gravityCounter = 0;
            this.moveDown();
        }

        // Handle lock delay
        if (this.isLocking) {
            this.lockDelayCounter++;
            if (this.lockDelayCounter >= LOCK_DELAY_FRAMES) {
                this.lockPiece();
            }
        }
    }

    getGravityFrames() {
        const level = Math.min(this.level, GRAVITY_FRAMES.length);
        return GRAVITY_FRAMES[level - 1];
    }

    moveLeft() {
        if (this.board.isValid(this.currentPiece, this.x - 1, this.y, this.currentPiece.rotation)) {
            this.x--;
            this.resetLockDelay();
            return true;
        }
        return false;
    }

    moveRight() {
        if (this.board.isValid(this.currentPiece, this.x + 1, this.y, this.currentPiece.rotation)) {
            this.x++;
            this.resetLockDelay();
            return true;
        }
        return false;
    }

    moveDown() {
        if (this.board.isValid(this.currentPiece, this.x, this.y + 1, this.currentPiece.rotation)) {
            this.y++;
            this.isLocking = false;
            this.lockDelayCounter = 0;
            return true;
        } else {
            // Can't move down, start lock delay
            if (!this.isLocking) {
                this.isLocking = true;
                this.lockDelayCounter = 0;
            }
            return false;
        }
    }

    softDrop() {
        if (this.moveDown()) {
            this.score += SCORE_VALUES.SOFT_DROP;
            return true;
        }
        return false;
    }

    hardDrop() {
        let dropDistance = 0;
        while (this.board.isValid(this.currentPiece, this.x, this.y + 1, this.currentPiece.rotation)) {
            this.y++;
            dropDistance++;
        }
        this.score += dropDistance * SCORE_VALUES.HARD_DROP;
        this.lockPiece();
    }

    rotate(direction = 1) {
        const result = tryRotate(this.board, this.currentPiece, this.x, this.y, direction);
        if (result.success) {
            this.currentPiece.rotation = result.rotation;
            this.x = result.x;
            this.y = result.y;
            this.resetLockDelay();
            return true;
        }
        return false;
    }

    hold() {
        if (!this.canHold) return false;

        const currentType = this.currentPiece.type;

        if (this.heldPiece === null) {
            this.heldPiece = currentType;
            this.spawnNewPiece();
        } else {
            this.currentPiece = new Tetromino(this.heldPiece);
            this.heldPiece = currentType;
            this.x = Math.floor(BOARD_WIDTH / 2) - 2;
            this.y = -1;
        }

        this.canHold = false;
        this.resetLockDelay();
        return true;
    }

    lockPiece() {
        this.board.place(this.currentPiece, this.x, this.y, this.currentPiece.rotation);

        const linesCleared = this.board.clearLines();
        this.updateScore(linesCleared);

        this.canHold = true;
        this.isLocking = false;
        this.lockDelayCounter = 0;

        this.spawnNewPiece();
    }

    spawnNewPiece() {
        this.currentPiece = new Tetromino(this.bag.next());
        this.x = Math.floor(BOARD_WIDTH / 2) - 2;
        this.y = -1;
        this.gravityCounter = 0;

        // Check game over
        if (!this.board.isValid(this.currentPiece, this.x, this.y, this.currentPiece.rotation)) {
            this.gameOver = true;
        }
    }

    updateScore(linesCleared) {
        if (linesCleared === 0) {
            this.lastLineClearWasTetris = false;
            return;
        }

        this.lines += linesCleared;

        let points = 0;
        switch (linesCleared) {
            case 1: points = SCORE_VALUES.SINGLE; break;
            case 2: points = SCORE_VALUES.DOUBLE; break;
            case 3: points = SCORE_VALUES.TRIPLE; break;
            case 4: points = SCORE_VALUES.TETRIS; break;
        }

        // Back-to-back bonus (50% more points)
        if (linesCleared === 4 && this.lastLineClearWasTetris) {
            points = Math.floor(points * 1.5);
        }

        points *= this.level;
        this.score += points;

        this.lastLineClearWasTetris = (linesCleared === 4);

        // Level up
        const newLevel = Math.floor(this.lines / LINES_PER_LEVEL) + 1;
        if (newLevel > this.level) {
            this.level = newLevel;
        }
    }

    resetLockDelay() {
        if (this.isLocking) {
            this.lockDelayCounter = 0;
        }
    }

    getGhostY() {
        let ghostY = this.y;
        while (this.board.isValid(this.currentPiece, this.x, ghostY + 1, this.currentPiece.rotation)) {
            ghostY++;
        }
        return ghostY;
    }

    getState() {
        return {
            board: this.board.getGrid(),
            currentPiece: this.currentPiece,
            x: this.x,
            y: this.y,
            ghostY: this.getGhostY(),
            heldPiece: this.heldPiece,
            nextPieces: this.getNextPieces(),
            score: this.score,
            lines: this.lines,
            level: this.level,
            gameOver: this.gameOver
        };
    }

    // Input handling with DAS/ARR
    handleInput(key, pressed) {
        if (pressed) {
            this.keys[key] = true;
            this.dasCounter[key] = 0;
            this.arrCounter[key] = 0;

            // Immediate action on key press
            switch (key) {
                case 'ArrowLeft':
                    this.moveLeft();
                    break;
                case 'ArrowRight':
                    this.moveRight();
                    break;
                case 'ArrowDown':
                    this.softDrop();
                    break;
                case ' ':
                case 'Space':
                    this.hardDrop();
                    break;
                case 'z':
                case 'Z':
                    this.rotate(-1);
                    break;
                case 'x':
                case 'X':
                    this.rotate(1);
                    break;
                case 'c':
                case 'C':
                    this.hold();
                    break;
            }
        } else {
            this.keys[key] = false;
            delete this.dasCounter[key];
            delete this.arrCounter[key];
        }
    }

    processHeldKeys() {
        // Process DAS/ARR for held keys
        for (const key in this.keys) {
            if (!this.keys[key]) continue;

            this.dasCounter[key] = (this.dasCounter[key] || 0) + 1;

            if (this.dasCounter[key] > DAS_FRAMES) {
                this.arrCounter[key] = (this.arrCounter[key] || 0) + 1;

                if (this.arrCounter[key] >= ARR_FRAMES) {
                    this.arrCounter[key] = 0;

                    switch (key) {
                        case 'ArrowLeft':
                            this.moveLeft();
                            break;
                        case 'ArrowRight':
                            this.moveRight();
                            break;
                        case 'ArrowDown':
                            this.softDrop();
                            break;
                    }
                }
            }
        }
    }
}

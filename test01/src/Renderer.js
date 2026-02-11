import { BLOCK_SIZE, BOARD_WIDTH, BOARD_HEIGHT, COLORS, SHAPES } from './constants.js';

export class Renderer {
    constructor(gameCanvas, nextCanvas, holdCanvas) {
        this.gameCtx = gameCanvas.getContext('2d');
        this.nextCtx = nextCanvas.getContext('2d');
        this.holdCtx = holdCanvas.getContext('2d');

        this.gameCanvas = gameCanvas;
        this.nextCanvas = nextCanvas;
        this.holdCanvas = holdCanvas;

        // Animation state
        this.lineClearAnimation = null;
    }

    render(gameState) {
        this.renderGame(gameState);
        this.renderNext(gameState.nextPieces);
        this.renderHold(gameState.heldPiece);
    }

    renderGame(state) {
        const ctx = this.gameCtx;
        const { board, currentPiece, x, y, ghostY } = state;

        // Clear canvas
        ctx.fillStyle = COLORS.EMPTY;
        ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

        // Draw grid (subtle)
        this.drawGrid(ctx);

        // Draw placed blocks
        for (let row = 0; row < BOARD_HEIGHT; row++) {
            for (let col = 0; col < BOARD_WIDTH; col++) {
                if (board[row][col]) {
                    this.drawBlock(ctx, col, row, COLORS[board[row][col]]);
                }
            }
        }

        // Draw ghost piece
        if (currentPiece && ghostY !== y) {
            this.drawPiece(ctx, currentPiece, x, ghostY, COLORS.GHOST, true);
        }

        // Draw current piece
        if (currentPiece) {
            this.drawPiece(ctx, currentPiece, x, y, currentPiece.color, false);
        }
    }

    drawGrid(ctx) {
        ctx.strokeStyle = COLORS.GRID;
        ctx.lineWidth = 1;

        for (let row = 0; row <= BOARD_HEIGHT; row++) {
            ctx.beginPath();
            ctx.moveTo(0, row * BLOCK_SIZE);
            ctx.lineTo(BOARD_WIDTH * BLOCK_SIZE, row * BLOCK_SIZE);
            ctx.stroke();
        }

        for (let col = 0; col <= BOARD_WIDTH; col++) {
            ctx.beginPath();
            ctx.moveTo(col * BLOCK_SIZE, 0);
            ctx.lineTo(col * BLOCK_SIZE, BOARD_HEIGHT * BLOCK_SIZE);
            ctx.stroke();
        }
    }

    drawBlock(ctx, x, y, color, isGhost = false) {
        const px = x * BLOCK_SIZE;
        const py = y * BLOCK_SIZE;

        if (isGhost) {
            ctx.fillStyle = color;
            ctx.fillRect(px + 2, py + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(px + 2, py + 2, BLOCK_SIZE - 4, BLOCK_SIZE - 4);
        } else {
            // Main block
            ctx.fillStyle = color;
            ctx.fillRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);

            // Subtle inner shadow for depth
            const gradient = ctx.createLinearGradient(px, py, px, py + BLOCK_SIZE);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
            ctx.fillStyle = gradient;
            ctx.fillRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);

            // Border
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(px + 1, py + 1, BLOCK_SIZE - 2, BLOCK_SIZE - 2);
        }
    }

    drawPiece(ctx, piece, x, y, color, isGhost) {
        const shape = piece.getShape();

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const drawY = y + row;
                    if (drawY >= 0) {  // Don't draw above the board
                        this.drawBlock(ctx, x + col, drawY, color, isGhost);
                    }
                }
            }
        }
    }

    renderNext(nextPieces) {
        const ctx = this.nextCtx;
        ctx.fillStyle = COLORS.EMPTY;
        ctx.fillRect(0, 0, this.nextCanvas.width, this.nextCanvas.height);

        const previewSize = 20;  // Smaller blocks for preview
        const spacing = 80;

        nextPieces.forEach((pieceType, index) => {
            const shape = SHAPES[pieceType][0];  // Always show initial rotation
            const color = COLORS[pieceType];
            const offsetY = index * spacing;

            // Center the piece
            let minCol = 4, maxCol = 0;
            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    if (shape[row][col]) {
                        minCol = Math.min(minCol, col);
                        maxCol = Math.max(maxCol, col);
                    }
                }
            }
            const width = (maxCol - minCol + 1) * previewSize;
            const startX = (this.nextCanvas.width - width) / 2;

            for (let row = 0; row < shape.length; row++) {
                for (let col = 0; col < shape[row].length; col++) {
                    if (shape[row][col]) {
                        const px = startX + (col - minCol) * previewSize;
                        const py = offsetY + 10 + row * previewSize;

                        ctx.fillStyle = color;
                        ctx.fillRect(px, py, previewSize - 2, previewSize - 2);

                        // Subtle shadow
                        const gradient = ctx.createLinearGradient(px, py, px, py + previewSize);
                        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
                        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
                        ctx.fillStyle = gradient;
                        ctx.fillRect(px, py, previewSize - 2, previewSize - 2);
                    }
                }
            }
        });
    }

    renderHold(heldPieceType) {
        const ctx = this.holdCtx;
        ctx.fillStyle = COLORS.EMPTY;
        ctx.fillRect(0, 0, this.holdCanvas.width, this.holdCanvas.height);

        if (!heldPieceType) return;

        const shape = SHAPES[heldPieceType][0];
        const color = COLORS[heldPieceType];
        const previewSize = 20;

        // Center the piece
        let minCol = 4, maxCol = 0;
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    minCol = Math.min(minCol, col);
                    maxCol = Math.max(maxCol, col);
                }
            }
        }
        const width = (maxCol - minCol + 1) * previewSize;
        const startX = (this.holdCanvas.width - width) / 2;

        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col]) {
                    const px = startX + (col - minCol) * previewSize;
                    const py = 30 + row * previewSize;

                    ctx.fillStyle = color;
                    ctx.fillRect(px, py, previewSize - 2, previewSize - 2);

                    // Subtle shadow
                    const gradient = ctx.createLinearGradient(px, py, px, py + previewSize);
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
                    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
                    ctx.fillStyle = gradient;
                    ctx.fillRect(px, py, previewSize - 2, previewSize - 2);
                }
            }
        }
    }
}

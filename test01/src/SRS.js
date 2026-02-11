// Super Rotation System (SRS) implementation
// Wall kick offsets for each rotation transition

const WALL_KICK_OFFSETS = {
    // JLSTZ pieces
    JLSTZ: {
        '0->1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
        '1->0': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
        '1->2': [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
        '2->1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
        '2->3': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
        '3->2': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
        '3->0': [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
        '0->3': [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
    },
    // I piece
    I: {
        '0->1': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
        '1->0': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
        '1->2': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
        '2->1': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
        '2->3': [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
        '3->2': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
        '3->0': [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
        '0->3': [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]]
    },
    // O piece (no wall kicks)
    O: {
        '0->1': [[0, 0]],
        '1->0': [[0, 0]],
        '1->2': [[0, 0]],
        '2->1': [[0, 0]],
        '2->3': [[0, 0]],
        '3->2': [[0, 0]],
        '3->0': [[0, 0]],
        '0->3': [[0, 0]]
    }
};

export function getWallKickOffsets(pieceType, fromRotation, toRotation) {
    const key = `${fromRotation}->${toRotation}`;

    if (pieceType === 'I') {
        return WALL_KICK_OFFSETS.I[key] || [[0, 0]];
    } else if (pieceType === 'O') {
        return WALL_KICK_OFFSETS.O[key] || [[0, 0]];
    } else {
        return WALL_KICK_OFFSETS.JLSTZ[key] || [[0, 0]];
    }
}

export function tryRotate(board, piece, x, y, direction) {
    const currentRotation = piece.rotation;
    const newRotation = (currentRotation + direction + 4) % 4;
    const offsets = getWallKickOffsets(piece.type, currentRotation, newRotation);

    // Create a test piece with new rotation
    const testPiece = piece.clone();
    testPiece.rotation = newRotation;

    // Try each wall kick offset
    for (const [offsetX, offsetY] of offsets) {
        const testX = x + offsetX;
        const testY = y + offsetY;

        if (board.isValid(testPiece, testX, testY, newRotation)) {
            return {
                success: true,
                rotation: newRotation,
                x: testX,
                y: testY
            };
        }
    }

    return { success: false };
}

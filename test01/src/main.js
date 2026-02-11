import { GameEngine } from './GameEngine.js';
import { Renderer } from './Renderer.js';
import { FRAME_TIME } from './constants.js';

class Game {
    constructor() {
        this.engine = new GameEngine();
        this.renderer = null;
        this.isRunning = false;
        this.isPaused = false;
        this.lastFrameTime = 0;
        this.animationId = null;

        this.highScore = this.loadHighScore();

        this.init();
    }

    init() {
        // Get canvas elements
        const gameCanvas = document.getElementById('game-canvas');
        const nextCanvas = document.getElementById('next-canvas');
        const holdCanvas = document.getElementById('hold-canvas');

        this.renderer = new Renderer(gameCanvas, nextCanvas, holdCanvas);

        // Bind UI elements
        this.startBtn = document.getElementById('start-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.resumeBtn = document.getElementById('resume-btn');

        this.startScreen = document.getElementById('start-screen');
        this.gameOverScreen = document.getElementById('game-over');
        this.pauseScreen = document.getElementById('pause-screen');

        this.scoreEl = document.getElementById('score');
        this.levelEl = document.getElementById('level');
        this.linesEl = document.getElementById('lines');
        this.finalScoreEl = document.getElementById('final-score');
        this.highScoreEl = document.getElementById('high-score');

        // Event listeners
        this.startBtn.addEventListener('click', () => this.startGame());
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.resumeBtn.addEventListener('click', () => this.togglePause());

        // Keyboard listeners
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Initial render
        this.updateUI();
        this.highScoreEl.textContent = this.highScore;
    }

    startGame() {
        this.startScreen.classList.add('hidden');
        this.engine.reset();
        this.isRunning = true;
        this.isPaused = false;
        this.lastFrameTime = performance.now();
        this.gameLoop(this.lastFrameTime);
    }

    restartGame() {
        this.gameOverScreen.classList.add('hidden');
        this.startGame();
    }

    togglePause() {
        if (!this.isRunning || this.engine.gameOver) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            this.pauseScreen.classList.remove('hidden');
        } else {
            this.pauseScreen.classList.add('hidden');
            this.lastFrameTime = performance.now();
            this.gameLoop(this.lastFrameTime);
        }
    }

    gameLoop(currentTime) {
        if (!this.isRunning || this.isPaused) return;

        const deltaTime = currentTime - this.lastFrameTime;

        if (deltaTime >= FRAME_TIME) {
            this.lastFrameTime = currentTime - (deltaTime % FRAME_TIME);

            // Update game
            this.engine.processHeldKeys();
            this.engine.update();

            // Render
            const state = this.engine.getState();
            this.renderer.render(state);
            this.updateUI();

            // Check game over
            if (state.gameOver) {
                this.endGame();
                return;
            }
        }

        this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
    }

    updateUI() {
        const state = this.engine.getState();
        this.scoreEl.textContent = state.score;
        this.levelEl.textContent = state.level;
        this.linesEl.textContent = state.lines;
    }

    endGame() {
        this.isRunning = false;
        const finalScore = this.engine.score;

        if (finalScore > this.highScore) {
            this.highScore = finalScore;
            this.saveHighScore(this.highScore);
        }

        this.finalScoreEl.textContent = finalScore;
        this.highScoreEl.textContent = this.highScore;
        this.gameOverScreen.classList.remove('hidden');
    }

    handleKeyDown(e) {
        if (!this.isRunning) return;

        // Pause toggle
        if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') {
            e.preventDefault();
            this.togglePause();
            return;
        }

        if (this.isPaused) return;

        // Prevent default for game keys
        if (['ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp', ' ', 'z', 'x', 'c', 'Z', 'X', 'C'].includes(e.key)) {
            e.preventDefault();
        }

        this.engine.handleInput(e.key, true);
    }

    handleKeyUp(e) {
        if (!this.isRunning || this.isPaused) return;

        this.engine.handleInput(e.key, false);
    }

    loadHighScore() {
        try {
            const saved = localStorage.getItem('tetris_high_score');
            return saved ? parseInt(saved, 10) : 0;
        } catch (e) {
            return 0;
        }
    }

    saveHighScore(score) {
        try {
            localStorage.setItem('tetris_high_score', score.toString());
        } catch (e) {
            console.error('Failed to save high score', e);
        }
    }
}

// Start the game when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Game());
} else {
    new Game();
}

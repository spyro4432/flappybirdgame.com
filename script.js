// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 400;
canvas.height = 600;

// Define some constants
const GRAVITY = 0.2;
const FLAP_SPEED = 5;
const PIPE_WIDTH = 80;
const PIPE_GAP = 150;
const BIRD_SIZE = 30;

// Define some variables
let birdX = canvas.width / 2;
let birdY = canvas.height / 2;
let birdVel = 0;
let pipeX = canvas.width;
let pipeY = Math.random() * (canvas.height - PIPE_GAP);
let score = 0;
let gameOver = false;

// Main game loop
function update() {
    // Update bird position
    birdY += birdVel;
    birdVel += GRAVITY;

    // Check for collision with pipes
    if (pipeX < birdX + BIRD_SIZE &&
        pipeX + PIPE_WIDTH > birdX &&
        (pipeY > birdY + BIRD_SIZE || pipeY + PIPE_GAP < birdY)) {
        gameOver = true;
    }

    // Check for collision with ground
    if (birdY + BIRD_SIZE > canvas.height) {
        gameOver = true;
    }

    // Update pipe position
    pipeX -= 2;

    // Check if pipe has moved off screen
    if (pipeX < -PIPE_WIDTH) {
        pipeX = canvas.width;
        pipeY = Math.random() * (canvas.height - PIPE_GAP);
        score++;
    }

    // Draw everything
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    ctx.fillStyle = 'blue';
    ctx.fillRect(pipeX, 0, PIPE_WIDTH, pipeY);
    ctx.fillRect(pipeX, pipeY + PIPE_GAP, PIPE_WIDTH, canvas.height - (pipeY + PIPE_GAP));
    ctx.fillStyle = 'red';
    ctx.fillRect(birdX, birdY, BIRD_SIZE, BIRD_SIZE);
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Score: ' + score, 10, 10);

    // Check for game over
    if (gameOver) {
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    } else {
        requestAnimationFrame(update);
    }
}

// Handle user input
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        birdVel = -FLAP_SPEED;
    }
});

// Start the game
update();
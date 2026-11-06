// ===== GAME SETUP =====
const canvas =
  document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const tileCount = canvas.width / gridSize;
const scoreElement = document.getElementById("score");
const infoElement = document.getElementById("info");
const restartButton = document.getElementById("restartButton");

// ===== INITIAL STATE =====
let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];
let direction = { x: 1, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;
let gameLoop;

// ===== DRAWING =====
const drawGame = () => {
  scoreElement.textContent = score;

  ctx.clearRect(0, 0,
    canvas.width, canvas.height);

  ctx.fillStyle = "red";
  ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize, gridSize
  );

  ctx.fillStyle = "black";
  for (const segment of snake) {
    ctx.fillRect(
      segment.x * gridSize,
      segment.y * gridSize,
      gridSize, gridSize
    );
  }
};

drawGame();

// ===================================
// BUILD THE GAME FROM HERE
// ===================================
//
// Use your custom agent in VS Code Chat 
// to guide your work through each step. 
// Commit regularly.
//
// Step 1: Movement (game loop)
// Step 2: Keyboard controls (arrow keys)
// Step 3: Eating and growing
// Step 4: Game over
// Step 5: Improvements
//
// ===================================

// Step 1: Movement (game loop), Step 3: Eating and growing, Step 4: Game over
const updateGame = () => {
  // Move the snake by adding a new head based on the current direction
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };
  const ateFood = newHead.x === food.x && newHead.y === food.y;

  const hitWall = 
    newHead.x < 0 || 
    newHead.x >= tileCount || 
    newHead.y < 0 || 
    newHead.y >= tileCount;

  // Check for collision with the boundaries of the canvas
    if (hitWall) {
    clearInterval(gameLoop);
    infoElement.textContent = "Game over! Press F5 to restart.";
    return;
  }

  // Check for collision with itself
  const hitSelf = snake.some(segment => 
    segment.x === newHead.x && segment.y === newHead.y);
  if (hitSelf) {
    clearInterval(gameLoop);
    infoElement.textContent = "Game over! Press F5 to restart.";
    return;
  }

  snake.unshift(newHead);

  if (ateFood) {
    score++;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreElement.textContent = highScore;
    }

    placeFood();
  } else {
    snake.pop(); // Remove the last segment of the snake to maintain its length
  }

  drawGame();
};

// Set up the game loop to update every 100 milliseconds
gameLoop = setInterval(updateGame, 100);

// Generate new food position
const placeFood = () => {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  }
};

// Step 2: Keyboard controls (arrow keys)
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

// Step 5: Improvements
// Improvement 1:  Restart game state and loop
const restartGame = () => {
  // Reset game state
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  ];
  direction = { x: 1, y: 0 };
  score = 0;
  placeFood();
  infoElement.textContent = "";
  
  // Restart the game loop
  clearInterval(gameLoop);
  drawGame();
  gameLoop = setInterval(updateGame, 100);
};

// Add event listener to the restart button
restartButton.addEventListener("click", restartGame);

// Improvement 2: Pause and Resume functionality
let isPaused = false;

const togglePause = () => {
  if (isPaused) {
    gameLoop = setInterval(updateGame, 100);
    infoElement.textContent = "";
  } else {
    clearInterval(gameLoop);
    infoElement.textContent = "Game paused. Press 'P' to resume.";
  }
  isPaused = !isPaused;
};

// Add event listener for the 'P' key to toggle pause/resume
document.addEventListener("keydown", (event) => {
  if (event.key === "p" || event.key === "P") {
    togglePause();
  }
});

// Improvement 3: Save high score using localStorage and display it
const highScoreElement = document.getElementById("highScore");
let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreElement.textContent = highScore;

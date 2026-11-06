// ===== GAME SETUP =====
const canvas =
  document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// ===== INITIAL STATE =====
let snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];
let direction = { x: 1, y: 0 };
let food = { x: 15, y: 15 };
let score = 0;

// ===== DRAWING =====
const drawGame = () => {
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

// Step 1: Movement (game loop)
const updateGame = () => {
  // Move the snake by adding a new head based on the current direction
  const newHead = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
  };
  snake.unshift(newHead);

  // Remove the last segment of the snake to maintain its length
  snake.pop();

  drawGame();
};

// Set up the game loop to update every 100 milliseconds
setInterval(updateGame, 100);

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



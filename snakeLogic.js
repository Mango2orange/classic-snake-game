export const GRID_SIZE = 20;

export function createInitialState() {
  return {
    snake: [{ x: 10, y: 10 }],
    direction: { x: 1, y: 0 },
    food: randomFood(),
    score: 0,
    gameOver: false
  };
}

function randomFood() {
  return {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE)
  };
}

export function moveSnake(state) {
  const head = state.snake[0];
  const newHead = {
    x: head.x + state.direction.x,
    y: head.y + state.direction.y
  };

  const newSnake = [newHead, ...state.snake];

  let newFood = state.food;
  let newScore = state.score;

  if (newHead.x === state.food.x && newHead.y === state.food.y) {
    newFood = randomFood();
    newScore += 1;
  } else {
    newSnake.pop();
  }

  return {
    ...state,
    snake: newSnake,
    food: newFood,
    score: newScore
  };
}

export function checkCollision(state) {
  const head = state.snake[0];

  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= GRID_SIZE ||
    head.y >= GRID_SIZE
  ) {
    return true;
  }

  for (let i = 1; i < state.snake.length; i++) {
    if (head.x === state.snake[i].x && head.y === state.snake[i].y) {
      return true;
    }
  }

  return false;
}
# classic-snake-game
small interactive snake game
To implement the **classic Snake game in your repo**, follow this **simple structured approach** so it stays minimal and reusable with the existing project.

---

## 1️⃣ Find the Right Place in the Repo

First inspect the project structure.

Look for folders like:

```
src/
  pages/
  components/
  routes/
  views/
```

Add the game where small interactive features live.

Example:

```
src/
  components/
      SnakeGame/
          SnakeGame.js
          snakeLogic.js
          SnakeGame.css
```

Or if your repo uses pages:

```
src/pages/snake.jsx
```

---

# 2️⃣ Core Game Logic (Deterministic)

Create a logic file.

**snakeLogic.js**

```javascript
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
```

---

# 3️⃣ UI Rendering

**SnakeGame.js**

```javascript
import React, { useState, useEffect } from "react";
import { createInitialState, moveSnake, checkCollision, GRID_SIZE } from "./snakeLogic";
import "./SnakeGame.css";

export default function SnakeGame() {
  const [state, setState] = useState(createInitialState());

  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.gameOver) return prev;

        const next = moveSnake(prev);

        if (checkCollision(next)) {
          return { ...next, gameOver: true };
        }

        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKey = e => {
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 }
      };

      if (map[e.key]) {
        setState(prev => ({ ...prev, direction: map[e.key] }));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const restart = () => setState(createInitialState());

  return (
    <div className="snake-container">
      <h2>Score: {state.score}</h2>

      <div className="grid">
        {[...Array(GRID_SIZE * GRID_SIZE)].map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);

          const isSnake = state.snake.some(s => s.x === x && s.y === y);
          const isFood = state.food.x === x && state.food.y === y;

          return (
            <div
              key={i}
              className={`cell ${isSnake ? "snake" : ""} ${isFood ? "food" : ""}`}
            />
          );
        })}
      </div>

      {state.gameOver && (
        <div>
          <p>Game Over</p>
          <button onClick={restart}>Restart</button>
        </div>
      )}
    </div>
  );
}
```

---

# 4️⃣ Minimal Styling

**SnakeGame.css**

```css
.snake-container {
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(20, 20px);
  gap: 2px;
  justify-content: center;
}

.cell {
  width: 20px;
  height: 20px;
  background: #eee;
}

.snake {
  background: green;
}

.food {
  background: red;
}
```

---

# 5️⃣ Optional Tests (if repo uses Jest)

```
tests/snakeLogic.test.js
```

Test cases:

* snake moves correctly
* snake grows when eating
* wall collision
* self collision
* food placement inside grid

---

# 6️⃣ Run Instructions

Example:

```
npm install
npm run dev
```

Then navigate to:

```
http://localhost:3000/snake
```

or where the route is added.

---

# 7️⃣ Manual Verification Checklist

✔ Snake moves with **Arrow Keys / WASD**
✔ Food appears randomly
✔ Snake **grows after eating food**
✔ Score increments correctly
✔ Snake **dies on wall collision**
✔ Snake **dies on self collision**
✔ **Game Over message appears**
✔ **Restart button resets game**

---

💡 **Pro Tip (important if submitting this to GitHub):**

Add a README section:

```
Features
- Classic Snake gameplay
- Keyboard controls
- Score tracking
- Game restart
```

---

If you want, I can also show you:

* 🔹 **A 120-line ultra-clean Snake implementation (interview ready)**
* 🔹 **How to push this game to GitHub as a portfolio project**
* 🔹 **How to make it playable on mobile**.

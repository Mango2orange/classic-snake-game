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
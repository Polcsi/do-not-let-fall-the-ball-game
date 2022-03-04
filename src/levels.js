import Brick from "./brick.js";

export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 80 * brickIndex,
          y: 24 * rowIndex + 80,
        };
        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}

function generateRandomLevel() {
  let level = [];
  for (let i = 0; i < Math.floor(Math.random() * 12) + 5; i++) {
    let bricks = [];
    for (let j = 0; j < 10; j++) {
      bricks = [...bricks, Math.floor(Math.random() * 2)];
    }
    level = [...level, bricks];
  }
  return level;
}

export const randomLevel = generateRandomLevel();

import StandardBrick from "./oneHitBrick.js";
import HarderBrick from "./twoHitBrick.js";

export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        let position = {
          x: 80 * brickIndex,
          y: 24 * rowIndex + 80,
        };
        bricks.push(
          new StandardBrick(
            game,
            position,
            document.getElementById("img_brick")
          )
        );
      }
      if (brick === 2) {
        let position = {
          x: 80 * brickIndex,
          y: 24 * rowIndex + 80,
        };
        bricks.push(
          new HarderBrick(
            game,
            position,
            document.getElementById("img_brick_harder")
          )
        );
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
      bricks = [...bricks, Math.floor(Math.random() * 3)];
    }
    level = [...level, bricks];
  }
  return level;
}

export const randomLevel = generateRandomLevel();

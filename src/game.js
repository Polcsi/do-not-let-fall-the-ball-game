import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Brick from "./brick.js";
import Ball from "./ball.js";
import BoostBall from "./boostBall.js";
import BoostPaddle from "./boostPaddle.js";
import GrowPaddle from "./growPaddle.js";
import Computer from "./computer.js";
import { buildLevel, randomLevel } from "./levels.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
};

export default class Game {
  static completedLeveles = 0;
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.boostBall = new BoostBall(
      this,
      document.getElementById("img_boostBall")
    );
    this.boostPaddle = new BoostPaddle(
      this,
      document.getElementById("img_boostPaddle")
    );
    this.growPaddle = new GrowPaddle(
      this,
      document.getElementById("img_growPaddle")
    );
    this.gameObjects = [];
    this.gameState = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this, this.paddle);
    this.lives = 1;
    this.completedLevelesElement = document.getElementById("completedLevels");

    new InputHandler(this.paddle, this);
    new Computer(this.paddle, this.ball);
  }

  start() {
    if (this.gameState !== GAMESTATE.MENU) return;
    this.gameState = GAMESTATE.RUNNING;
    let bricks = buildLevel(this, randomLevel);
    this.gameObjects = [
      this.ball,
      this.paddle,
      this.boostBall,
      this.boostPaddle,
      this.growPaddle,
      ...bricks,
    ];
  }

  update(deltaTime) {
    if (this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;
    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    )
      return;
    this.gameObjects.forEach((object) => {
      object.update(deltaTime);
    });
    this.gameObjects = this.gameObjects.filter(
      (object) => !object.markedForDeletion
    );
    let notBricks = this.gameObjects.filter(
      (object) => !(object instanceof Brick)
    );
    if (this.gameObjects.length === notBricks.length) {
      let bricks = buildLevel(this, randomLevel);
      this.gameObjects = [
        this.ball,
        this.paddle,
        new BoostBall(this, document.getElementById("img_boostBall")),
        new BoostPaddle(this, document.getElementById("img_boostPaddle")),
        new GrowPaddle(this, document.getElementById("img_growPaddle")),
        ...bricks,
      ];
      Game.completedLeveles++;
      this.completedLevelesElement.innerText = Game.completedLeveles;
    }
  }

  draw(ctx) {
    this.gameObjects.forEach((object) => {
      object.draw(ctx);
    });

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gameState == GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }
}

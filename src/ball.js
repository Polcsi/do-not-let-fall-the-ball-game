import { detectCollision } from "./collisionDetection.js";
import Computer from "./computer.js";

export default class Ball {
  constructor(game, paddle) {
    this.image = document.getElementById("img_ball");
    this.speed = { x: 3, y: 3 };
    this.size = 18;
    this.position = {
      x: game.gameWidth / 2,
      y: game.gameHeight - this.size - 40,
    };

    this.game = game;
    this.paddle = paddle;

    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    new Computer(this.paddle, this);

    // wall on left or right
    if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    // wall on top
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }
    // bottom of the game
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
    }
    if (detectCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}

import { detectCollision } from "./collisionDetection.js";

export default class Brick {
  static brokenBricks = 0;
  constructor(game, position) {
    this.image = document.getElementById("img_brick");
    this.game = game;

    this.position = position;
    this.width = 80;
    this.height = 24;

    this.element = document.getElementById("brickCount");
    this.markedForDeletion = false;
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      Brick.brokenBricks++;
      this.element.innerText = Brick.brokenBricks;
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

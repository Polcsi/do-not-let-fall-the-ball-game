import { detectCollision } from "./collisionDetection.js";

export default class Brick {
  static brokenBricks = 0;
  constructor(game, position, img) {
    this.game = game;
    this.img = img;

    this.position = position;
    this.width = 80;
    this.height = 24;

    this.element = document.getElementById("brickCount");
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.numberOfHits++;
      if (this.numberOfHits === this.hitsRequired) {
        Brick.brokenBricks++;
        this.element.innerText = Brick.brokenBricks;
        this.markedForDeletion = true;
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

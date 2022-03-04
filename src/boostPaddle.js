import PowerUp from "./powerUp.js";
import { detectCollision } from "./collisionDetection.js";

export default class BoostPaddle extends PowerUp {
  constructor(game, image) {
    super(game, image);
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.paddle.maxSpeed = 20;
      setTimeout(() => {
        this.game.paddle.maxSpeed = 5;
      }, 15000);
      this.markedForDeletion = true;
    }
  }
}

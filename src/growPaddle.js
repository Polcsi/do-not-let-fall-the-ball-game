import PowerUp from "./powerUp.js";
import { detectCollision } from "./collisionDetection.js";

export default class GrowPaddle extends PowerUp {
  constructor(game, image) {
    super(game, image);
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.paddle.width = 220;
      setTimeout(() => {
        this.game.paddle.width = 150;
      }, 15000);
      this.markedForDeletion = true;
    }
  }
}

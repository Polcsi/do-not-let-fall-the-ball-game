import PowerUp from "./powerUp.js";
import { detectCollision } from "./collisionDetection.js";

export default class BoostBall extends PowerUp {
  constructor(game, image) {
    super(game, image);
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      this.game.ball.speed.y = 5;
      this.game.ball.speed.x = 5;
      setTimeout(() => {
        this.game.ball.speed.y = 3;
        this.game.ball.speed.x = 3;
      }, 15000);
      this.markedForDeletion = true;
    }
  }
}

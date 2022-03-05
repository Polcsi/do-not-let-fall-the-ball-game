import PowerUp from "./powerUp.js";
import { detectCollision } from "./collisionDetection.js";

export default class BoostBall extends PowerUp {
  constructor(game, image) {
    super(game, image);
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      if (this.game.ball.speed.y > 0) {
        this.game.ball.speed.y = 5;
      }
      if (this.game.ball.speed.y < 0) {
        this.game.ball.speed.y = -5;
      }
      if (this.game.ball.speed.x > 0) {
        this.game.ball.speed.x = 5;
      }
      if (this.game.ball.speed.x < 0) {
        this.game.ball.speed.x = -5;
      }
      setTimeout(() => {
        if (this.game.ball.speed.y > 0) {
          this.game.ball.speed.y = 3;
        }
        if (this.game.ball.speed.y < 0) {
          this.game.ball.speed.y = -3;
        }
        if (this.game.ball.speed.x > 0) {
          this.game.ball.speed.x = 3;
        }
        if (this.game.ball.speed.x < 0) {
          this.game.ball.speed.x = -3;
        }
      }, 15000);
      this.markedForDeletion = true;
    }
  }
}

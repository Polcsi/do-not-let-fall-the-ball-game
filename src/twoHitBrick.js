import Brick from "./brick.js";

export default class HarderBrick extends Brick {
  constructor(game, position, img) {
    super(game, position, img);
    this.numberOfHits = 0;
    this.hitsRequired = 2;
    this.markedForDeletion = false;
  }
}

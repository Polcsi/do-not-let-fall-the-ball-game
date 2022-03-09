import Brick from "./brick.js";

export default class StandardBrick extends Brick {
  constructor(game, position, img) {
    super(game, position, img);
    this.numberOfHits = 0;
    this.hitsRequired = 1;
    this.markedForDeletion = false;
  }
}

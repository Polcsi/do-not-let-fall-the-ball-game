export default class PowerUp {
  constructor(game, image) {
    this.image = image;
    this.game = game;
    this.width = 40;
    this.height = 40;

    this.position = {
      x: Math.floor(Math.random() * (this.game.gameWidth - this.width)),
      y: Math.floor(Math.random() * 400) + 40,
    };
    this.markedForDeletion = false;
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

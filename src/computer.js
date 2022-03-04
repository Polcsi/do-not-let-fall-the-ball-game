export default class Computer {
  constructor(paddle, ball) {
    this.dividePaddle = 30;

    if (
      ball.position.x <= paddle.position.x + paddle.width - this.dividePaddle &&
      ball.position.x >= paddle.position.x + this.dividePaddle - 10
    ) {
      paddle.stop();
    } else if (ball.position.x > paddle.position.x + paddle.width - 30) {
      paddle.moveRight();
    } else if (ball.position.x < paddle.position.x + 30) {
      paddle.moveLeft();
    }
  }
}

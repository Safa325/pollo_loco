class Buttons extends DrawableObject {
  width = 25;
  height = 25;

  constructor(path, x, y) {
    super();
    this.loadImage(path);
    this.x = x;
    this.y = y;
    this.hitBox(0, 0);
  }

  //   checkCollision(x, y) {
  //     world.buttons.forEach((button) => {
  //       if (
  //         x >= button.x &&
  //         x <= button.x + button.width &&
  //         y >= button.y &&
  //         y <= button.y + button.height
  //       ) {
  //         buttonClicked(x, y);
  //       }
  //     });
  //   }
}

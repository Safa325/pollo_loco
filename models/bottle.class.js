class Bottles extends MovableObjects {
  height = 70;
  width = 70;
  y = 355;

  constructor(img, x, visible = true) {
    super();
    this.visible = visible;
    this.x = Math.random() * 720 + x;
    this.loadImage(img);
    this.hitBoxObject(15);
  }
}

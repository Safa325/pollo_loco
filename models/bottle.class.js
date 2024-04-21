class Bottles extends MovableObjects {
  height = 70;
  width = 70;
  y = 355;

  constructor(img, x) {
    super();
    this.x = Math.random() * 720 + x;
    this.loadImage(img);
    this.hitBoxObject(15);
  }
}

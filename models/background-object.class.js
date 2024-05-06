class BackgroundObject extends MovableObjects {
  width = 1440;
  height = 480;
  x = 0;
  y = 0;

  constructor(imagePath, x, visible = true) {
    super().loadImage(imagePath);
    this.visible = visible;
    this.x = x;
  }
}

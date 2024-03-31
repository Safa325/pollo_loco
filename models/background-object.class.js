class BackgroundObject extends MovableObjects {
  width = 1440;
  height = 480;
  x = 0;
  y = 0;

  constructor(imagePath) {
    super().loadImage(imagePath);
  }
}

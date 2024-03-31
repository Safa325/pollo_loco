class Clouds extends MovableObjects {
  width = 1440;
  height = 300;

  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = Math.random() * 720;
    this.y = Math.random() * 30;
  }
}

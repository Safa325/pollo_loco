class Clouds extends MovableObjects {
  width = 720;
  height = 480;
  y = 0;
  speed = 0.2;

  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = Math.random() * 720;
    this.animationObject();
  }
}

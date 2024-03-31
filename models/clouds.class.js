class Clouds extends MovableObjects {
  width = 1440;
  height = 300;

  constructor() {
    super().loadImage("/img/5_background/layers/4_clouds/full.png");
    this.x = Math.random() * 500;
    this.y = Math.random() * 30;
  }
}

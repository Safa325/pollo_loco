class Chicken extends MovableObjects {
  height = 80;
  width = 120;
  y = 370;

  constructor() {
    super().loadImage("/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");

    this.x = 300 + 500 * Math.random();
  }
  eat() {}
}
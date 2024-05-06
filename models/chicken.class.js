class Chicken extends MovableObjects {
  height = 70;
  width = 70;
  y = 355;

  IMAGES_WALKING = [
    "/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor(visible = true) {
    super();
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.loadImage("/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300 + 2500 * Math.random();
    this.speed = 0.15 + Math.random() * 0.25;
    this.startInterval();
  }

  eat() {}

  animationImages() {
    this.playAnimation(this.IMAGES_WALKING);
    this.hitBoxObject(15);
  }

  startInterval() {
    this.timerManager.setInterval(() => this.animationImages(), 100);
    this.timerManager.setInterval(() => this.animationObject(), 1000 / 60);
  }
}

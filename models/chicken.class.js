class Chicken extends MovableObjects {
  height = 70;
  width = 70;
  y = 355;
  index = 1;

  IMAGES_WALKING = [
    "/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["/img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(visible = true) {
    super();
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.loadImage("/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DEAD);
    this.x = 300 + 2500 * Math.random();
    this.speed = 0.15 + Math.random() * 0.25;
    this.startInterval(this.index);
  }

  animationImages(x) {
    if (this.index == 1) {
      this.playAnimation(this.Images(x));
      this.hitBoxObject(15);
    }
  }

  startInterval(x) {
    this.timerManager.setInterval(() => this.animationImages(x), 100);
    this.timerManager.setInterval(() => this.animationObject(), 1000 / 60);
  }

  die() {
    this.index = 2;
    this.loadImage(this.IMAGE_DEAD[0]);
    this.speed = 0;
    this.remove();
  }

  remove() {
    setTimeout(() => {
      this.y = 9999;
      this.x = 9999;
      this.xHit = this.x;
      this.yHit = this.y;
    }, 700);
  }

  Images(x) {
    if (x == 1) {
      return this.IMAGES_WALKING;
    } else {
      return this.IMAGE_DEAD;
    }
  }
}

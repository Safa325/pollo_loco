class ChickenSmall extends MovableObjects {
  height = 70;
  width = 70;
  y = 355;
  index = 1;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["./img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor(visible = true) {
    super();
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300 + 2500 * Math.random();
    this.speed = 0.15 + Math.random() * 0.25;
    this.startInterval(this.index);
    this.applyGravity();
  }

  jump() {
    this.speedY = 25;
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
    this.timerManager.setInterval(() => this.jump(), 1000);
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

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 355;
    }
  }
}

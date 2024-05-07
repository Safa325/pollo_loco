class MovableObjects extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  isHit = false;
  i = 0;
  timerManager;

  constructor() {
    super();
    this.timerManager = TimerManager.getInstance();
  }

  hit() {
    this.energy -= 20;
    this.isHurt();
    if (this.energy < 0) {
      this.energy = 0;
    }
  }

  isHurt() {
    this.isHit = true;
    setTimeout(() => {
      this.isHit = false;
    }, 1500);
  }

  isDead() {
    return this.energy == 0;
  }

  animationObject() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    if (images.length > this.currentImage) {
      let path = images[this.currentImage];
      this.img = this.imageChache[path];
      this.currentImage++;
    } else {
      this.currentImage = 0;
    }
  }

  isCollidingObj(obj) {
    return (
      this.xHit + this.wHit >= obj.xHit &&
      this.xHit <= obj.xHit + obj.wHit &&
      this.yHit + this.hHit >= obj.yHit &&
      this.yHit <= obj.yHit + obj.hHit
    );
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
      return this.y < 180;
    }
  }

  isColliding(obj) {
    return (
      this.xHit + this.wHit >= obj.xHit &&
      this.xHit <= obj.xHit + obj.wHit &&
      this.yHit + this.hHit >= obj.yHit &&
      this.yHit <= obj.yHit + obj.hHit &&
      !this.isAboveGround()
    );
  }

  smashEnemies(obj) {
    return (
      this.xHit + this.wHit >= obj.xHit &&
      this.xHit <= obj.xHit + obj.wHit &&
      this.yHit + this.hHit >= obj.yHit &&
      this.yHit <= obj.yHit + obj.hHit &&
      this.isAboveGround()
    );
  }
}

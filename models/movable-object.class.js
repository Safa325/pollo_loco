class MovableObjects extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  isHit = false;
  i = 0;

  hit() {
    this.energy -= 20;
    this.isHurt();
    console.log(this.energy);
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
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
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
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
    );
  }
}

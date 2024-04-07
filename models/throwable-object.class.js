class ThrowableObject extends MovableObjects {
  speed = 20;
  speedY = 0;
  IMAGES_BOTTLES = [
    "/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.loadImages(this.IMAGES_BOTTLES);
    this.throw();
    this.animationImages();
  }

  animationImages() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLES);
    }, 1000 / 40);
  }

  throw() {
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}

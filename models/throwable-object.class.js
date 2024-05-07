class ThrowableObject extends MovableObjects {
  speed = 20;
  speedY = 0;
  throwB;
  IMAGES_BOTTLES = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y, img, visible = true) {
    super();
    this.visible = visible;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGES_SPLASH);
    this.throw(img);
    this.animationImages(this.bottelImages(img));
  }

  animationImages(img) {
    setInterval(() => {
      this.playAnimation(img);
    }, 1000 / 40);
  }

  throw(x) {
    if (x == 2) {
    } else {
      this.speedY = 30;
      this.applyGravity();
      setInterval(() => {
        this.x += 10;
        this.hitBoxObject(15);
      }, 25);
    }
  }

  bottelImages(x) {
    if (x == 1) {
      return this.IMAGES_BOTTLES;
    } else {
      return this.IMAGES_SPLASH;
    }
  }
}

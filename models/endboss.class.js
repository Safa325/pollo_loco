class Endboss extends MovableObjects {
  height = 250;
  width = 250;
  x = 2550;
  y = 190;
  IMAGES_WALKING = [
    "/img/4_enemie_boss_chicken/2_alert/G5.png",
    "/img/4_enemie_boss_chicken/2_alert/G6.png",
    "/img/4_enemie_boss_chicken/2_alert/G7.png",
    "/img/4_enemie_boss_chicken/2_alert/G8.png",
    "/img/4_enemie_boss_chicken/2_alert/G9.png",
    "/img/4_enemie_boss_chicken/2_alert/G10.png",
    "/img/4_enemie_boss_chicken/2_alert/G11.png",
    "/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  constructor() {
    super();
    this.loadImage("/img/4_enemie_boss_chicken/2_alert/G5.png");
    this.loadImages(this.IMAGES_WALKING);
    this.speed = 0.3 + Math.random() * 0.5;
    this.animationImages();
  }
  eat() {}

  animationImages() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 1000 / 5);
  }
}

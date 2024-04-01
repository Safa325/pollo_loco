class Character extends MovableObjects {
  IMAGES_WALKING = [
    "/img/2_character_pepe/2_walk/W-21.png",
    "/img/2_character_pepe/2_walk/W-22.png",
    "/img/2_character_pepe/2_walk/W-23.png",
    "/img/2_character_pepe/2_walk/W-24.png",
    "/img/2_character_pepe/2_walk/W-25.png",
    "/img/2_character_pepe/2_walk/W-26.png",
  ];
  speed = 20;
  world;

  constructor() {
    super();
    this.loadImage("/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animationImages();
  }

  animationImages() {
    this.moveLeft();
    this.moveRight();
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 20);
  }

  moveLeft() {
    setInterval(() => {
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);
  }

  moveRight() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        this.world.camera_x = -this.x + 100;
      }
    }, 1000 / 60);
  }

  jump() {}
}

class Character extends MovableObjects {
  IMAGES_WALKING = [
    "/img/2_character_pepe/2_walk/W-21.png",
    "/img/2_character_pepe/2_walk/W-22.png",
    "/img/2_character_pepe/2_walk/W-23.png",
    "/img/2_character_pepe/2_walk/W-24.png",
    "/img/2_character_pepe/2_walk/W-25.png",
    "/img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "/img/2_character_pepe/3_jump/J-31.png",
    "/img/2_character_pepe/3_jump/J-32.png",
    "/img/2_character_pepe/3_jump/J-33.png",
    "/img/2_character_pepe/3_jump/J-34.png",
    "/img/2_character_pepe/3_jump/J-35.png",
    "/img/2_character_pepe/3_jump/J-36.png",
    "/img/2_character_pepe/3_jump/J-37.png",
    "/img/2_character_pepe/3_jump/J-38.png",
    "/img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];
  speed = 20;
  world;

  constructor() {
    super();
    this.loadImage("/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.playAnimation(this.IMAGES_IDLE);
    this.applyGravity();
    this.animatCharacter();
  }

  animatCharacter() {
    this.moves();
    this.deadAnimation();
    this.hurtAnimation();
    this.jumpAnimation();
    this.walkingAnimation();
    this.idleAnimation();
  }

  moveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= this.speed;
      this.otherDirection = true;
      this.world.camera_x = -this.x + 100;
    }
    this.hitBox(65, 120);
  }

  moveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.x += this.speed;
      this.otherDirection = false;
      this.world.camera_x = -this.x + 100;
    }
    this.hitBox(65, 120);
  }

  jump() {
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      setTimeout(() => {
        this.currentImage = 0;
      }, 1000);

      this.speedY = 25;
      this.hitBox(65, 120);
    }
  }

  moves() {
    setInterval(() => {
      this.jump();
      this.moveRight();
      this.moveLeft();
    }, 1000 / 60);
  }

  deadAnimation() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      }
    }, 1000 / 6);
  }

  hurtAnimation() {
    setInterval(() => {
      if (this.isDead()) {
      } else if (this.isHit === true) {
        this.playAnimation(this.IMAGES_HURT);
      }
    }, 1000 / 30);
  }

  jumpAnimation() {
    setInterval(() => {
      if (this.isDead()) {
      } else if (this.isHit === true) {
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 1000 / 6);
  }

  walkingAnimation() {
    setInterval(() => {
      if (this.isDead()) {
      } else if (this.isHit === true) {
      } else if (this.isAboveGround()) {
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 20);
  }

  idleAnimation() {
    setInterval(() => {
      if (this.isDead()) {
      } else if (this.isHit === true) {
      } else if (this.isAboveGround()) {
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      } else {
        this.playAnimation(this.IMAGES_IDLE);
      }
    }, 1000 / 2);
  }
}

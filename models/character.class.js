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

  IMAGES_IDLELONG = [
    "/img/2_character_pepe/1_idle/long_idle/I-11.png",
    "/img/2_character_pepe/1_idle/long_idle/I-12.png",
    "/img/2_character_pepe/1_idle/long_idle/I-13.png",
    "/img/2_character_pepe/1_idle/long_idle/I-14.png",
    "/img/2_character_pepe/1_idle/long_idle/I-15.png",
    "/img/2_character_pepe/1_idle/long_idle/I-16.png",
    "/img/2_character_pepe/1_idle/long_idle/I-17.png",
    "/img/2_character_pepe/1_idle/long_idle/I-18.png",
    "/img/2_character_pepe/1_idle/long_idle/I-19.png",
    "/img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  speed = 10;
  world;
  deadIndex = 0;
  end = false;
  idleTimeout = null;
  idleLong = false;

  constructor(visible = true) {
    super();
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.audioManager = AudioManager.getInstance();
    this.loadImage("/img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_IDLELONG);
    this.playAnimation(this.IMAGES_IDLE);
    this.applyGravity();
    this.animatCharacter();
  }

  animatCharacter() {
    this.timerManager.setInterval(
      () => (this.moves(), this.gameOver()),
      1000 / 60
    );
    this.timerManager.setInterval(
      () => (this.deadAnimation(), this.jumpAnimation()),
      1000 / 6
    );
    this.timerManager.setInterval(
      () => (this.hurtAnimation(), this.walkingAnimation()),
      1000 / 20
    );
    this.timerManager.setInterval(() => this.idleAnimation(), 1000 / 3);
  }

  moveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= this.speed;
      this.otherDirection = true;
      this.world.camera_x = -this.x + 100;
      this.cancelIdleLongAnimation();
      this.audioManager.playAudio(this.audioManager.moveLeft, false);
    }
    this.hitBox(65, 120);
  }

  moveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.x += this.speed;
      this.otherDirection = false;
      this.world.camera_x = -this.x + 100;
      this.cancelIdleLongAnimation();
      this.audioManager.playAudio(this.audioManager.moveRight, false);
    }
    this.hitBox(65, 120);
  }

  jump() {
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.speedY = 25;
      this.hitBox(65, 120);
      this.cancelIdleLongAnimation();
    }
  }

  smashJump() {
    this.speedY = 20;
    this.hitBox(65, 120);
    this.cancelIdleLongAnimation();
  }

  moves() {
    this.jump();
    this.moveRight();
    this.moveLeft();
  }

  deadAnimation() {
    if (this.isDead() && !this.end) {
      this.playAnimation(this.IMAGES_DEAD);
      if (this.currentImage == 1) {
        this.speedY = 30;
      }
      if (this.currentImage == 7) {
        this.deadIndex++;
      }
    }
  }

  gameOver() {
    if (this.deadIndex == 1)
      setTimeout(() => {
        this.end = true;
      }, 800);
  }

  hurtAnimation() {
    if (this.isDead()) {
      this.audioManager.pauseAudio(this.audioManager.hurt);
    } else if (this.isHit === true) {
      this.playAnimation(this.IMAGES_HURT);
      this.audioManager.playAudio(this.audioManager.hurt, false);
    }
  }

  jumpAnimation() {
    if (this.isDead()) {
      this.audioManager.pauseAudio(this.audioManager.jump, false);
    } else if (this.isHit === true) {
      this.audioManager.pauseAudio(this.audioManager.jump, false);
    } else if (this.isAboveGround()) {
      this.audioManager.playAudio(this.audioManager.jump, false);
      this.playAnimation(this.IMAGES_JUMPING);
    }
  }

  walkingAnimation() {
    if (this.isDead()) {
      this.audioManager.pauseAudio(this.audioManager.moveLeft);
      this.audioManager.pauseAudio(this.audioManager.moveRight);
    } else if (this.isHit === true) {
      this.audioManager.pauseAudio(this.audioManager.moveLeft);
      this.audioManager.pauseAudio(this.audioManager.moveRight);
    } else if (this.isAboveGround()) {
      this.audioManager.pauseAudio(this.audioManager.moveLeft);
      this.audioManager.pauseAudio(this.audioManager.moveRight);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  idleAnimation() {
    if (
      this.isDead() ||
      this.isHit === true ||
      this.isAboveGround() ||
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT
    ) {
      this.idleLong = false;
      this.cancelIdleLongAnimation();
    } else {
      this.playAnimation(this.IMAGES_IDLE);
      if (!this.idleLong && !this.idleTimeout) {
        this.idleTimeout = setTimeout(() => {
          this.idleLong = true;
        }, 10000);
      } else if (this.idleLong) {
        this.playAnimation(this.IMAGES_IDLELONG);
      }
    }
  }

  cancelIdleLongAnimation() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
    }
  }
}

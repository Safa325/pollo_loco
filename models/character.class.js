class Character extends MovableObjects {
  IMAGES_WALKING = [
    "./img/2_character_pepe/2_walk/W-21.png",
    "./img/2_character_pepe/2_walk/W-22.png",
    "./img/2_character_pepe/2_walk/W-23.png",
    "./img/2_character_pepe/2_walk/W-24.png",
    "./img/2_character_pepe/2_walk/W-25.png",
    "./img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "./img/2_character_pepe/3_jump/J-31.png",
    "./img/2_character_pepe/3_jump/J-32.png",
    "./img/2_character_pepe/3_jump/J-33.png",
    "./img/2_character_pepe/3_jump/J-34.png",
    "./img/2_character_pepe/3_jump/J-35.png",
    "./img/2_character_pepe/3_jump/J-36.png",
    "./img/2_character_pepe/3_jump/J-37.png",
    "./img/2_character_pepe/3_jump/J-38.png",
    "./img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_IDLE = [
    "./img/2_character_pepe/1_idle/idle/I-1.png",
    "./img/2_character_pepe/1_idle/idle/I-2.png",
    "./img/2_character_pepe/1_idle/idle/I-3.png",
    "./img/2_character_pepe/1_idle/idle/I-4.png",
    "./img/2_character_pepe/1_idle/idle/I-5.png",
    "./img/2_character_pepe/1_idle/idle/I-6.png",
    "./img/2_character_pepe/1_idle/idle/I-7.png",
    "./img/2_character_pepe/1_idle/idle/I-8.png",
    "./img/2_character_pepe/1_idle/idle/I-9.png",
    "./img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_DEAD = [
    "./img/2_character_pepe/5_dead/D-51.png",
    "./img/2_character_pepe/5_dead/D-52.png",
    "./img/2_character_pepe/5_dead/D-53.png",
    "./img/2_character_pepe/5_dead/D-54.png",
    "./img/2_character_pepe/5_dead/D-55.png",
    "./img/2_character_pepe/5_dead/D-56.png",
    "./img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_HURT = [
    "./img/2_character_pepe/4_hurt/H-41.png",
    "./img/2_character_pepe/4_hurt/H-42.png",
    "./img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_IDLELONG = [
    "./img/2_character_pepe/1_idle/long_idle/I-11.png",
    "./img/2_character_pepe/1_idle/long_idle/I-12.png",
    "./img/2_character_pepe/1_idle/long_idle/I-13.png",
    "./img/2_character_pepe/1_idle/long_idle/I-14.png",
    "./img/2_character_pepe/1_idle/long_idle/I-15.png",
    "./img/2_character_pepe/1_idle/long_idle/I-16.png",
    "./img/2_character_pepe/1_idle/long_idle/I-17.png",
    "./img/2_character_pepe/1_idle/long_idle/I-18.png",
    "./img/2_character_pepe/1_idle/long_idle/I-19.png",
    "./img/2_character_pepe/1_idle/long_idle/I-20.png",
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
    this.loadImage("./img/2_character_pepe/1_idle/idle/I-1.png");
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
  /**
   * Animates the character by setting up various intervals for different animations and movements.
   * This includes general movement, game over check, dead animation, jump animation, hurt animation, walking animation, and idle animation.
   */
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

  /**
   * Moves the character to the left if the LEFT key is pressed and the character is not at the left edge of the world.
   * Updates the camera position, plays audio, and updates the hitbox.
   */
  moveLeft() {
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.x -= this.speed;
      this.otherDirection = true;
      this.world.camera_x = -this.x + 100;
      this.cancelIdleLongAnimation();
      this.resetSpeedY();
    }
    this.hitBox(65, 120);
  }

  /**
   * Moves the character to the right if the RIGHT key is pressed and the character is not at the right edge of the world.
   * Updates the camera position, plays audio, and updates the hitbox.
   */
  moveRight() {
    if (this.world.keyboard.RIGHT && this.x < 2600) {
      this.x += this.speed;
      this.otherDirection = false;
      this.world.camera_x = -this.x + 100;
      this.cancelIdleLongAnimation();
      this.resetSpeedY();
    }
    this.hitBox(65, 120);
  }

  /**
   * Makes the character jump if the UP key is pressed and the character is on the ground.
   * Updates the speed in the Y direction and the hitbox.
   */
  jump() {
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.speedY = 25;
      this.hitBox(65, 120);
      this.cancelIdleLongAnimation();
    }
  }

  resetSpeedY() {
    if (!this.world.keyboard.UP && this.y >= 180) {
      this.speedY = 0;
    }
  }

  /**
   * Makes the character perform a smash jump.
   * Updates the speed in the Y direction and the hitbox.
   */
  smashJump() {
    this.speedY = 20;
    this.hitBox(65, 120);
    this.cancelIdleLongAnimation();
  }
  /**
   * Handles all movement-related actions for the character, including jumping, moving left, and moving right.
   */
  moves() {
    this.jump();
    this.moveRight();
    this.moveLeft();
  }

  /**
   * Plays the dead animation if the character is dead and not at the end of the game.
   * Adjusts the character's vertical speed and updates the dead index.
   */
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

  /**
   * Sets the game state to end after a delay if the character's dead index is 1.
   */
  gameOver() {
    if (this.deadIndex == 1) {
      setTimeout(() => {
        this.end = true;
      }, 800);
    }
  }

  /**
   * Plays the hurt animation if the character is hit.
   * Pauses hurt audio if the character is dead, otherwise plays the hurt audio.
   */
  hurtAnimation() {
    if (this.isDead()) {
    } else if (this.isHit === true) {
      this.playAnimation(this.IMAGES_HURT);
      this.audioManager.playAudio(this.audioManager.hurt, false);
    }
  }

  /**
   * Plays the jump animation if the character is in the air.
   * Pauses jump audio if the character is dead or hit.
   */
  jumpAnimation() {
    if (this.isDead()) {
    } else if (this.isHit === true) {
    } else if (this.isAboveGround()) {
      this.audioManager.playAudio(this.audioManager.jump, false);
      this.playAnimation(this.IMAGES_JUMPING);
    }
  }

  /**
   * Plays the walking animation if the character is walking.
   * Pauses movement audio if the character is dead, hit, or in the air.
   */
  walkingAnimation() {
    if (this.isDead()) {
    } else if (this.isHit === true) {
    } else if (this.isAboveGround()) {
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
    }
  }
  /**
   * Handles the idle animation for the character.
   * Checks if the idle animation should be canceled or triggered.
   */
  idleAnimation() {
    if (this.shouldCancelIdleAnimation()) {
      this.idleLong = false;
      this.cancelIdleLongAnimation();
    } else {
      this.triggerIdleAnimation();
    }
  }

  /**
   * Determines if the idle animation should be canceled based on the character's state.
   * @returns {boolean} True if the idle animation should be canceled, false otherwise.
   */
  shouldCancelIdleAnimation() {
    return (
      this.isDead() ||
      this.isHit === true ||
      this.isAboveGround() ||
      this.world.keyboard.RIGHT ||
      this.world.keyboard.LEFT
    );
  }

  /**
   * Triggers the idle animation.
   * If the character has been idle for a long time, it triggers the long idle animation.
   */
  triggerIdleAnimation() {
    this.playAnimation(this.IMAGES_IDLE);
    if (!this.idleLong && !this.idleTimeout) {
      this.idleTimeout = setTimeout(() => {
        this.idleLong = true;
      }, 10000);
    } else if (this.idleLong) {
      this.playAnimation(this.IMAGES_IDLELONG);
    }
  }

  /**
   * Cancels the long idle animation timeout.
   * Clears the idle timeout if it exists.
   */
  cancelIdleLongAnimation() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
      this.idleTimeout = null;
    }
  }
}

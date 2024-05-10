class Endboss extends MovableObjects {
  height = 250;
  width = 250;
  x = 2550;
  y = 190;
  alert = false;
  walking = false;
  endBossHurt = false;
  endBossDead = false;
  playDead = false;
  done = false;
  bossHP = 100;
  bossHit = false;

  IMAGES_ALERT = [
    "./img/4_enemie_boss_chicken/2_alert/G5.png",
    "./img/4_enemie_boss_chicken/2_alert/G6.png",
    "./img/4_enemie_boss_chicken/2_alert/G7.png",
    "./img/4_enemie_boss_chicken/2_alert/G8.png",
    "./img/4_enemie_boss_chicken/2_alert/G9.png",
    "./img/4_enemie_boss_chicken/2_alert/G10.png",
    "./img/4_enemie_boss_chicken/2_alert/G11.png",
    "./img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "./img/4_enemie_boss_chicken/1_walk/G1.png",
    "./img/4_enemie_boss_chicken/1_walk/G2.png",
    "./img/4_enemie_boss_chicken/1_walk/G3.png",
    "./img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "./img/4_enemie_boss_chicken/3_attack/G13.png",
    "./img/4_enemie_boss_chicken/3_attack/G14.png",
    "./img/4_enemie_boss_chicken/3_attack/G15.png",
    "./img/4_enemie_boss_chicken/3_attack/G16.png",
    "./img/4_enemie_boss_chicken/3_attack/G17.png",
    "./img/4_enemie_boss_chicken/3_attack/G18.png",
    "./img/4_enemie_boss_chicken/3_attack/G19.png",
    "./img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "./img/4_enemie_boss_chicken/4_hurt/G21.png",
    "./img/4_enemie_boss_chicken/4_hurt/G22.png",
    "./img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "./img/4_enemie_boss_chicken/5_dead/G24.png",
    "./img/4_enemie_boss_chicken/5_dead/G25.png",
    "./img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  speed = 0;

  constructor(visible = true) {
    super();
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.audioManager = AudioManager.getInstance();
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage("./img/4_enemie_boss_chicken/1_walk/G1.png");
    this.endBossAnimation();
    this.animationObject();
  }
  /**
   * Starts the intervals for various end boss animations.
   * Sets intervals for alert, walking, hurt, dead, and object animations.
   */
  endBossAnimation() {
    this.timerManager.setInterval(() => this.animationAlert(), 125);
    this.timerManager.setInterval(() => this.animationWalking(), 100);
    this.timerManager.setInterval(() => this.animationHurt(), 100);
    this.timerManager.setInterval(() => this.animationDead(), 100);
    this.timerManager.setInterval(() => this.animationObject(), 1000 / 60);
  }

  /**
   * Plays the walking animation if the end boss is walking.
   * Updates the hitbox dimensions.
   */
  animationWalking() {
    if (this.walking === true) {
      this.playAnimation(this.IMAGES_WALKING);
      this.hitBox(25, 60);
    }
  }

  /**
   * Plays the alert animation if the end boss is alert.
   * Updates the hitbox dimensions and transitions to walking after a delay.
   */
  animationAlert() {
    if (this.alert === true) {
      this.playAnimation(this.IMAGES_ALERT);
      this.hitBox(25, 60);
      setTimeout(() => {
        this.alert = false;
        this.walking = true;
        this.speed = 1;
      }, 2000);
    }
  }

  /**
   * Plays the hurt animation if the end boss is hurt and not dead.
   * Plays the appropriate audio and updates movement state.
   * Transitions back to walking after a delay.
   */
  animationHurt() {
    if (this.endBossHurt === true && !this.endBossDead) {
      this.playAnimation(this.IMAGES_HURT);
      this.audioManager.playAudio(this.audioManager.chicken, false);
      this.speed = 0;
      this.walking = false;
      setTimeout(() => {
        this.endBossHurt = false;
        this.walking = true;
        this.speed = 1;
      }, 1000);
    } else if (this.endBossDead === true) {
      this.playDead = true;
    }
  }

  /**
   * Plays the dead animation if the end boss is dead.
   * Stops movement and loads the win page after the animation.
   */
  animationDead() {
    if (this.playDead === true) {
      this.playAnimation(this.IMAGES_DEAD);
      this.speed = 0;
      this.walking = false;
      if (this.currentImage == 2) {
        this.playDead = false;
        this.loadWinPage();
      }
    }
  }

  /**
   * Loads the win page after a short delay.
   * Sets the end boss state to done.
   */
  loadWinPage() {
    setTimeout(() => {
      this.done = true;
    }, 500);
  }

  // /**
  //  * Placeholder for the die method.
  //  * Can be used to define specific die behavior if needed.
  //  */
  // die() {}

  /**
   * Checks for collisions between throwable objects and the boss.
   * If a collision is detected and the boss is not already hit, it handles the collision and removes the throwable object after a delay.
   */
  checkCollisionBoss(throwableObject, statusbar) {
    throwableObject.forEach((bottel, index) => {
      if (this.isCollidingBottle(bottel)) {
        if (this.bossHit === false) {
          this.collisonBoss(index, statusbar, throwableObject);
          setTimeout(() => {
            throwableObject.splice(index, 1);
          }, 230);
        }
      }
    });
  }

  /**
   * Handles the collision between a throwable object and the boss.
   * Sets the boss hit state, creates a splash effect, handles the boss hit, and checks for boss death.
   * @param {number} index - The index of the throwable object in the throwableObject array.
   */
  collisonBoss(index, statusbar, throwableObject) {
    this.bossHit = true;
    this.endBossHurt = true;
    this.createSplashEffect(index, throwableObject);
    this.handleBossHit(statusbar);
    this.checkBossDeath();
  }

  /**
   * Handles the reduction of the boss's health and updates the status bar.
   * Resets the boss hit state after a delay.
   */
  handleBossHit(statusbar) {
    this.bossHP -= 20;
    statusbar[3].setPercentage(this.bossHP, 4);
    setTimeout(() => {
      this.bossHit = false;
    }, 300);
  }

  /**
   * Creates a splash effect at the location of the throwable object.
   * Plays the splash audio.
   * @param {number} index - The index of the throwable object in the throwableObject array.
   */
  createSplashEffect(index, throwableObject) {
    let splashIndex = throwableObject[index];
    let splash = new ThrowableObject(splashIndex.x, splashIndex.y, 2);
    throwableObject[index] = splash;
    this.audioManager.playAudio(this.audioManager.splash, false);
  }

  /**
   * Checks if the boss's health is zero or below and sets the boss's dead state if true.
   */
  checkBossDeath() {
    if (this.bossHP <= 0) {
      this.endBossDead = true;
    }
  }

  /**
   * Alerts the end boss when the character reaches a specific position and plays the boss sound.
   */
  alertEndBoss(character) {
    if (character.x == 2000 && !this.walking) {
      this.alert = true;
      this.audioManager.playAudio(this.audioManager.bossSound, true);
      this.audioManager.backgroundIndex = true;
      this.audioManager.pauseAudio(this.audioManager.background);
    }
    if (this.walking === true) {
      this.followCharacter(character);
    }
  }

  /**
   * Adjusts the object's speed and direction to follow the specified character.
   * If the object is to the left of the character, it moves left and faces left.
   * If the object is to the right of the character, it moves right and faces right.
   * @param {Object} character - The character to follow.
   */
  followCharacter(character) {
    if (this.x <= character.x) {
      this.speed = -1;
      this.otherDirection = true;
    } else {
      this.speed = 1;
      this.otherDirection = false;
    }
  }
}

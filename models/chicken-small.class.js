class ChickenSmall extends MovableObjects {
  height = 70;
  width = 70;
  y = 355;
  index = 1;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["./img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor(visible = true) {
    super();
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 300 + 2000 * Math.random();
    this.speed = 0.15 + Math.random() * 0.25;
    this.startInterval(this.index);
    this.applyGravity();
  }

  /**
   * Makes the character jump by setting the vertical speed.
   */
  jump() {
    this.speedY = 25;
  }

  /**
   * Plays animation images based on the given index.
   * If the index is 1, plays the corresponding animation and updates the hitbox.
   * @param {number} x - The index to determine which images to play.
   */
  animationImages(x) {
    if (this.index == 1) {
      this.playAnimation(this.Images(x));
      this.hitBoxObject(15);
    }
  }

  /**
   * Starts intervals for various animations and actions.
   * Sets intervals for image animations, object animations, and jumping.
   * @param {number} x - The index to determine which images to play.
   */
  startInterval(x) {
    this.timerManager.setInterval(() => this.animationImages(x), 100);
    this.timerManager.setInterval(() => this.animationObject(), 1000 / 60);
    this.timerManager.setInterval(() => this.jump(), 1000);
  }

  /**
   * Sets the character to a dead state, loads the dead image, and stops the character's movement.
   * Schedules the removal of the character from the screen.
   */
  die() {
    this.index = 2;
    this.loadImage(this.IMAGE_DEAD[0]);
    this.speed = 0;
    this.remove();
  }

  /**
   * Removes the character from the screen by setting its coordinates off-screen after a delay.
   */
  remove() {
    setTimeout(() => {
      this.y = 9999;
      this.x = 9999;
      this.xHit = this.x;
      this.yHit = this.y;
    }, 300);
  }

  /**
   * Returns the appropriate set of images based on the provided index.
   * @param {number} x - The index to determine which images to return.
   * @returns {Array<string>} The array of image paths corresponding to the given index.
   */
  Images(x) {
    if (x == 1) {
      return this.IMAGES_WALKING;
    } else {
      return this.IMAGE_DEAD;
    }
  }

  /**
   * Applies gravity to the character, updating its vertical position based on its speed and acceleration.
   * Runs at a fixed interval to simulate gravity.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the character is above the ground level.
   * @returns {boolean} True if the character is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 355;
    }
  }
}

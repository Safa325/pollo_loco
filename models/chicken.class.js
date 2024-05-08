class Chicken extends MovableObjects {
  height = 70;
  width = 70;
  y = 355;
  index = 1;

  IMAGES_WALKING = [
    "./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGE_DEAD = ["./img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor(visible = true) {
    super();
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.loadImage("./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGE_DEAD);
    this.x = 300 + 2000 * Math.random();
    this.speed = 0.15 + Math.random() * 0.25;
    this.startInterval(this.index);
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
   * Sets intervals for image animations and object animations.
   * @param {number} x - The index to determine which images to play.
   */
  startInterval(x) {
    this.timerManager.setInterval(() => this.animationImages(x), 100);
    this.timerManager.setInterval(() => this.animationObject(), 1000 / 60);
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
    }, 700);
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
}

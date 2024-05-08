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
  timerManager;

  constructor(x, y, img, otherDirection, visible = true) {
    super();
    this.visible = visible;
    this.otherDirection = otherDirection;
    this.timerManager = TimerManager.getInstance();
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.loadImages(this.IMAGES_BOTTLES);
    this.loadImages(this.IMAGES_SPLASH);
    this.throw(img);
    this.setInterval(this.bottelImages(img));
  }
  /**
   * Plays the animation for the given images.
   * @param {Array<string>} img - An array of image paths for the animation.
   */
  animationImages(img) {
    this.playAnimation(img);
  }

  /**
   * Throws an object. If the given index is not 2, applies gravity and calls speedThrow.
   * @param {number} x - The index to determine the behavior of the throw.
   */
  throw(x) {
    if (x == 2) {
      // Additional behavior can be added here if needed.
    } else {
      this.speedY = 30;
      this.applyGravity();
      this.speedThrow();
    }
  }

  /**
   * Updates the object's position based on its direction.
   * If the object is facing the other direction, it moves left; otherwise, it moves right.
   * Updates the hitbox after moving.
   */
  speedThrow() {
    if (this.otherDirection === true) {
      this.x -= 10;
      this.hitBoxObject(15);
    } else {
      this.x += 10;
      this.hitBoxObject(15);
    }
  }

  /**
   * Sets intervals for throwing speed and animation playback.
   * @param {Array<string>} img - An array of image paths for the animation.
   */
  setInterval(img) {
    this.timerManager.setInterval(() => this.speedThrow(), 25);
    this.timerManager.setInterval(() => this.playAnimation(img), 1000 / 40);
  }

  /**
   * Returns the appropriate bottle images based on the given index.
   * @param {number} x - The index to determine which set of bottle images to return.
   * @returns {Array<string>} The array of image paths corresponding to the given index.
   */
  bottelImages(x) {
    if (x == 1) {
      return this.IMAGES_BOTTLES;
    } else {
      return this.IMAGES_SPLASH;
    }
  }
}

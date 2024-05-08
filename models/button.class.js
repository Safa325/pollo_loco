class Buttons extends DrawableObject {
  IMAGES_AUDIO = ["./img/Diverse/sound.png", "./img/Diverse/mute.png"];
  IMAGES_SCREEN = ["./img/Diverse/big.png", "./img/Diverse/small.png"];
  IMAGE_RESTART = "";
  IMAGE_PLAY = "./img/Diverse/play.png";

  index;
  direction = "down";

  constructor(path, x, y, width, height, visible = true) {
    super();
    this.timerManager = TimerManager.getInstance();
    this.visible = visible;
    this.loadImage(this.setImg(path));
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.hitBox(0, 0);
    this.startAnimation();
  }

  /**
   * Sets the image based on the provided index.
   * @param {number} x - The index to determine which image to set.
   * @returns {string} The path to the selected image.
   */
  setImg(x) {
    this.index = x;
    switch (x) {
      case 1:
        return this.IMAGES_AUDIO[0];
      case 2:
        return this.IMAGES_AUDIO[1];
      case 3:
        return this.IMAGES_SCREEN[0];
      case 4:
        return this.IMAGES_SCREEN[1];
      case 5:
        return this.IMAGE_RESTART;
      case 6:
        return this.IMAGE_PLAY;
    }
  }

  /**
   * Starts the animation for the current object.
   * Sets an interval to run the animation at a regular frequency.
   */
  startAnimation() {
    this.animationId = this.timerManager.setInterval(
      () => this.animation(),
      50
    );
  }

  /**
   * Stops the current animation.
   * Clears the interval that runs the animation.
   */
  stopAnimation() {
    this.timerManager.clearInterval(this.animationId);
  }

  /**
   * The animation logic for the object.
   * This method updates the object's position and size based on its current state.
   */
  animation() {
    if (this.index === 6 && this.visible) {
      if (this.direction === "down") {
        this.down();
      } else if (this.direction === "up") {
        this.up();
      }
    }
  }

  /**
   * Handles the "down" direction of the animation.
   * Decreases the object's width and height and adjusts its position accordingly.
   */
  down() {
    this.x += 0.5;
    this.y += 0.5;
    this.width -= 1;
    this.height -= 1;
    if (this.width <= 185) {
      this.direction = "up";
    }
  }

  /**
   * Handles the "up" direction of the animation.
   * Increases the object's width and height and adjusts its position accordingly.
   */
  up() {
    this.x -= 0.5;
    this.y -= 0.5;
    this.width += 1;
    this.height += 1;
    if (this.width >= 200) {
      this.direction = "down";
    }
  }
}

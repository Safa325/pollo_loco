class Clouds extends MovableObjects {
  width = 720;
  height = 480;
  y = 0;
  speed = 0.2;

  IMAGES_CLOUDS = [
    "./img/5_background/layers/4_clouds/1.png",
    "./img/5_background/layers/4_clouds/2.png",
  ];

  constructor(imgPath, x, visible = true) {
    super().loadImage(this.cloudImg(imgPath));
    this.timerManager = TimerManager.getInstance();
    this.visible = visible;
    this.x = x + Math.random() * 720;
    this.startInterval();
  }

  /**
   * Starts the interval for object animations.
   * Sets an interval to call the animationObject method at a specified frequency.
   */
  startInterval() {
    this.timerManager.setInterval(() => this.animationObject(), 1000 / 60);
  }

  /**
   * Returns the appropriate cloud image based on the provided index.
   * @param {number} x - The index to determine which cloud image to return.
   * @returns {string} The path to the selected cloud image.
   */
  cloudImg(x) {
    if (x == 0) {
      return this.IMAGES_CLOUDS[0];
    }
    if (x == 1) {
      return this.IMAGES_CLOUDS[1];
    }
  }
}

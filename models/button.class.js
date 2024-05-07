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

  setImg(x) {
    this.index = x;
    if (this.index == 1) {
      return this.IMAGES_AUDIO[0];
    } else if (this.index == 2) {
      return this.IMAGES_AUDIO[1];
    } else if (this.index == 3) {
      return this.IMAGES_SCREEN[0];
    } else if (this.index == 4) {
      return this.IMAGES_SCREEN[1];
    } else if (this.index == 5) {
      return this.IMAGE_RESTART;
    } else if (this.index == 6) {
      return this.IMAGE_PLAY;
    }
  }

  startAnimation() {
    this.animationId = this.timerManager.setInterval(
      () => this.animation(),
      50
    );
  }

  stopAnimation() {
    this.timerManager.clearInterval(this.animationId);
  }

  animation() {
    if (this.index === 6 && this.visible) {
      if (this.direction === "down") {
        this.x += 0.5;
        this.y += 0.5;
        this.width -= 1;
        this.height -= 1;
        if (this.width <= 185) {
          this.direction = "up";
        }
      } else if (this.direction === "up") {
        this.x -= 0.5;
        this.y -= 0.5;
        this.width += 1;
        this.height += 1;
        if (this.width >= 200) {
          this.direction = "down";
        }
      }
    }
  }
}

class Buttons extends DrawableObject {
  IMAGES_AUDIO = [
    "/img/Diverse/icons8-hohe-lautstärke-64.png",
    "/img/Diverse/icons8-kein-ton-64.png",
  ];
  IMAGES_SCREEN = [
    "/img/Diverse/icons8-an-breite-anpassen-64.png",
    "/img/Diverse/icons8-normaler-bildschirm-64.png",
  ];
  IMAGE_RESTART = "/img/Diverse/icons8-wiederholung-64.png";
  IMAGE_PLAY = "/img/Diverse/—Pngtree—game play button design ui_7886752.png";

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

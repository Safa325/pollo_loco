class Coin extends MovableObjects {
  height = 100;
  width = 100;
  widthFix = 100;
  heightFix = 100;

  IMAGES_COIN = ["/img/8_coin/coin_1.png", "/img/8_coin/coin_2.png"];

  constructor(x, visible = true) {
    super();
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.x = Math.random() * 720 + x;
    this.y = Math.random() * 120 + 180;
    this.loadImage("/img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.hitBoxObject(60);
    this.startInterval();
  }

  startInterval() {
    this.timerManager.setInterval(() => this.animationImages(), 100);
  }

  animationImages() {
    this.playAnimation(this.IMAGES_COIN);
  }
}

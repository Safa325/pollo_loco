class Coin extends MovableObjects {
  height = 100;
  width = 100;

  IMAGES_COIN = ["/img/8_coin/coin_1.png", "/img/8_coin/coin_2.png"];

  constructor(x) {
    super();
    this.x = Math.random() * 720 + x;
    this.y = Math.random() * 120 + 180;
    this.loadImage("/img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
  }

  animationImages() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 1000 / 10);
  }
}

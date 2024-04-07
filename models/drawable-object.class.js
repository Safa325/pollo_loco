class DrawableObject {
  x = 100;
  y = 180;
  img;
  width = 150;
  height = 250;
  xHit;
  yHit;
  widthHit;
  heightHit;
  size;

  imageChache = {};
  currentImage = 0;

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      this.img = new Image();
      this.img.src = path;
      this.imageChache[path] = this.img;
    });
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss ||
      this instanceof Bottles ||
      this instanceof Coin
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      this.hitSizeW();
      ctx.rect(this.xHit, this.yHit, this.widthHit, this.heightHit);
      ctx.stroke();
    }
  }

  hitSizeW() {
    this.widthHit = (this.width / 100) * 80;
    this.heightHit = (this.height / 100) * 90;
    this.xHit = this.x + this.width / 100;
    this.yHit = this.y + (this.height / 100) * 10;
  }
}

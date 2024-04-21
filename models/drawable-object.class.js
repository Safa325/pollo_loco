class DrawableObject {
  x = 100;
  y = 180;
  img;
  width = 150;
  height = 250;
  xHit;
  yHit;
  wHit;
  hHit;
  originalAspectRatio = this.width / this.height;
  imageChache = {};
  currentImage = 0;

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  hitBoxObject(crr) {
    this.xHit = this.x + crr / 2;
    this.yHit = this.y + crr / 2;
    this.wHit = this.width - crr;
    this.hHit = this.height - crr;
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
      this instanceof Coin ||
      this instanceof ChickenSmall
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "red";
      ctx.rect(this.xHit, this.yHit, this.wHit, this.hHit);
      ctx.stroke();
    }
  }

  hitBox(crrX, crrY) {
    this.xHit = this.x + crrX / 2;
    this.yHit = this.y + crrY;
    this.wHit = this.width - crrX;
    this.hHit = this.height - crrY;
  }
}

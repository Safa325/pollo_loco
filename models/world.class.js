class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [
    new Clouds("/img/5_background/layers/4_clouds/1.png"),
    new Clouds("/img/5_background/layers/4_clouds/2.png"),
  ];

  backgroundObject = [
    new BackgroundObject("/img/5_background/layers/3_third_layer/full.png"),
    new BackgroundObject("/img/5_background/layers/2_second_layer/full.png"),
    new BackgroundObject("/img/5_background/layers/1_first_layer/full.png"),
  ];

  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectsToMap(this.backgroundObject);
    this.addObjectsToMap(this.clouds);
    this.addObjectsToMap(this.enemies);
    this.addToMap(this.character);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}

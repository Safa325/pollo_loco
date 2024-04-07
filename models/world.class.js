class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bottleCaunt = 0;
  coinCaunt = 0;
  statusbar = [
    new Statusbar(2, 20, 15, 0),
    new Statusbar(1, 20, 45, 100),
    new Statusbar(3, 20, 80, 0),
    new Statusbar(4, 500, 15, 100),
  ];

  throwableObject = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollision();
      this.checkThrowObject();
      this.checkBottle();
      this.checkCoin();
    }, 200);
  }

  checkCollision() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        if (this.character.isHit === false) {
          this.character.hit();
          this.statusbar[1].setPercentage(this.character.energy, 1);
        }
      }
    });
  }

  checkBottle() {
    this.level.bottles.forEach((bottel, index) => {
      if (this.character.isColliding(bottel)) {
        this.bottleCaunt += 20;
        this.level.bottles.splice(index, 1);
        this.statusbar[0].setPercentage(this.bottleCaunt, 2);
      }
    });
  }

  checkCoin() {
    this.level.coin.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.coinCaunt += 20;
        this.level.coin.splice(index, 1);
        this.statusbar[2].setPercentage(this.coinCaunt, 3);
      }
    });
  }

  checkThrowObject() {
    if (this.keyboard.SPACE) {
      let bottle = new ThrowableObject(
        this.character.x + 80,
        this.character.y + 100
      );
      if (this.bottleCaunt > 0) {
        this.throwableObject.push(bottle);
        this.bottleCaunt -= 20;
        this.statusbar[0].setPercentage(this.bottleCaunt, 2);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coin);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusbar);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0);
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
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}

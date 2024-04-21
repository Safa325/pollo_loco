class World {
  intro = new Intro(0);
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
    new Statusbar(4, 500, 25, 100),
  ];
  bossHP = 100;
  bossHit = false;
  throwableObject = [];
  throwableBottel = false;
  buttons = [
    new Buttons("/img/Diverse/icons8-hohe-lautstärke-64.png", 620, 5),
    new Buttons("/img/Diverse/icons8-wiederholung-64.png", 650, 5),
    new Buttons("/img/Diverse/icons8-an-breite-anpassen-64.png", 680, 5),
  ];
  sound = true;
  fullSize = false;

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
      this.checkChlick(this.keyboard.mouseX, this.keyboard.mouseY);
      this.checkCollision();
      this.checkThrowObject();
      this.checkBottle();
      this.checkCoin();
      this.checkCollisionBoss();
    }, 1000 / 60);
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

  checkCollisionBoss() {
    let i = this.level.enemies.length - 1;
    this.throwableObject.forEach((bottel, index) => {
      if (this.level.enemies[i].isColliding(bottel)) {
        if (this.bossHit === false) {
          this.collisonBoss(index);
          setTimeout(() => {
            this.throwableObject.splice(index, 1);
          }, 230);
        }
      }
    });
  }

  collisonBoss(index) {
    this.bossHit = true;
    let splashIndex = this.throwableObject[index];
    let splash = new ThrowableObject(splashIndex.x, splashIndex.y, 2);
    this.throwableObject[index] = splash;
    this.bossHP -= 20;
    this.statusbar[3].setPercentage(this.bossHP, 4);
    setTimeout(() => {
      this.bossHit = false;
    }, 300);
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
    if (this.keyboard.SPACE && !this.throwableBottel) {
      this.throwableBottel = true;
      let bottle = new ThrowableObject(
        this.character.x + 80,
        this.character.y + 100,
        1
      );
      if (this.bottleCaunt > 0) {
        this.throwableObject.push(bottle);
        this.bottleCaunt -= 20;
        this.statusbar[0].setPercentage(this.bottleCaunt, 2);
      }
      setTimeout(() => {
        this.throwableBottel = false;
      }, 100);
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMap(this.intro);
    this.addObjectsToMap(this.buttons);
    this.startButton();

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
    mo.xHit = mo.xHit * -1;
  }

  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
    mo.xHit = mo.xHit * -1;
  }

  startGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coin);

    this.ctx.translate(-this.camera_x, 0);
    this.addObjectsToMap(this.statusbar);
    this.addObjectsToMap(this.buttons);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
    this.ctx.translate(-this.camera_x, 0);
  }

  startButton() {
    const canvasWidth = this.canvas.width;
    const buttonWidth = 140;
    const buttonHeight = 50;
    const borderRadius = 10;
    const buttonX = (canvasWidth - buttonWidth) / 2;
    const buttonY = 50;

    this.ctx.fillStyle = "#FFDE00";
    this.ctx.beginPath();
    this.ctx.moveTo(buttonX + borderRadius, buttonY);
    this.ctx.lineTo(buttonX + buttonWidth - borderRadius, buttonY);
    this.ctx.quadraticCurveTo(
      buttonX + buttonWidth,
      buttonY,
      buttonX + buttonWidth,
      buttonY + borderRadius
    );
    this.ctx.lineTo(
      buttonX + buttonWidth,
      buttonY + buttonHeight - borderRadius
    );
    this.ctx.quadraticCurveTo(
      buttonX + buttonWidth,
      buttonY + buttonHeight,
      buttonX + buttonWidth - borderRadius,
      buttonY + buttonHeight
    );
    this.ctx.lineTo(buttonX + borderRadius, buttonY + buttonHeight);
    this.ctx.quadraticCurveTo(
      buttonX,
      buttonY + buttonHeight,
      buttonX,
      buttonY + buttonHeight - borderRadius
    );
    this.ctx.lineTo(buttonX, buttonY + borderRadius);
    this.ctx.quadraticCurveTo(
      buttonX,
      buttonY,
      buttonX + borderRadius,
      buttonY
    );
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = "#FF9D02";
    this.ctx.beginPath();
    this.ctx.moveTo(buttonX + borderRadius + 3, buttonY + 3);
    this.ctx.lineTo(buttonX + buttonWidth - borderRadius - 3, buttonY + 3);
    this.ctx.quadraticCurveTo(
      buttonX + buttonWidth - 3,
      buttonY + 3,
      buttonX + buttonWidth - 3,
      buttonY + borderRadius + 3
    );
    this.ctx.lineTo(
      buttonX + buttonWidth - 3,
      buttonY + buttonHeight - borderRadius - 3
    );
    this.ctx.quadraticCurveTo(
      buttonX + buttonWidth - 3,
      buttonY + buttonHeight - 3,
      buttonX + buttonWidth - borderRadius - 3,
      buttonY + buttonHeight - 3
    );
    this.ctx.lineTo(buttonX + borderRadius + 3, buttonY + buttonHeight - 3);
    this.ctx.quadraticCurveTo(
      buttonX + 3,
      buttonY + buttonHeight - 3,
      buttonX + 3,
      buttonY + buttonHeight - borderRadius - 3
    );
    this.ctx.lineTo(buttonX + 3, buttonY + borderRadius + 3);
    this.ctx.quadraticCurveTo(
      buttonX + 3,
      buttonY + 3,
      buttonX + borderRadius + 3,
      buttonY + 3
    );
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "24px Arial";
    this.ctx.fillText("Start Game", buttonX + 10, buttonY + 32);
  }

  checkChlick(x, y) {
    this.buttons.forEach((button) => {
      if (
        x >= button.x &&
        x <= button.x + button.width &&
        y >= button.y &&
        y <= button.y + button.height
      ) {
        this.buttonClicked(x, y);
      }
    });
  }

  buttonClicked(x, y) {
    if (this.checkButton(x, y, 0)) {
      this.soundOnOff();
    } else if (this.checkButton(x, y, 1)) {
    } else if (this.checkButton(x, y, 2)) {
      this.switchFullSize();
    }
  }

  checkButton(x, y, i) {
    x >= this.buttons[i].x &&
      x <= this.buttons[i].x + this.buttons[i].width &&
      y >= this.buttons[i].y &&
      y <= this.buttons[i].y + this.buttons[i].height;
  }

  soundOnOff() {
    if (this.sound === false) {
      this.sound = true;
      this.buttons[0] = new Buttons(
        "/img/Diverse/icons8-hohe-lautstärke-64.png",
        620,
        5
      );
    } else {
      this.sound = false;
      this.buttons[0] = new Buttons(
        "/img/Diverse/icons8-kein-ton-64.png",
        620,
        5
      );
    }
  }

  switchFullSize() {
    if (fullSize === false) {
      fullSize = true;
      this.buttons[2] = new Buttons(
        "/img/Diverse/icons8-normaler-bildschirm-64.png",
        680,
        5
      );
    } else {
      fullSize = false;
      this.buttons[2] = new Buttons(
        "/img/Diverse/icons8-an-breite-anpassen-64.png",
        680,
        5
      );
    }
  }
}

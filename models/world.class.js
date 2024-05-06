class World {
  intro;
  gameOver;
  sucsses;
  character;
  level;
  canvas;
  ctx;
  keyboard;
  camera_x;
  bottleCaunt;
  coinCaunt;
  statusbar;
  bossHP;
  bossHit;
  throwableObject;
  throwableBottel;
  buttons;
  sound = false;
  fullSize = false;
  gameIsStarted = false;
  levelLoaded = false;
  timerManager;
  audioManager;
  getObjectFromPool;

  constructor(canvas, keyboard, visible = true) {
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.audioManager = AudioManager.getInstance();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.loadingPage();
    this.draw();
  }

  // playAudio(audio) {
  //   if (this.sound === true) {
  //     this.audioManager.audios.forEach((audios) => {
  //       if (audio == audios) {
  //         audio.play();
  //       }
  //     });
  //   }
  // }

  playAudio(audio) {
    if (this.sound === true) {
      this.audioManager.playAudio(audio);
    }
  }

  loadingPage() {
    this.intro = new Intro(0);
    this.buttons = [
      new Buttons(2, 650, 5, 25, 25),
      new Buttons(3, 680, 5, 25, 25),
      new Buttons(6, 260, 30, 200, 150),
    ];
  }

  initializeGame() {
    this.gameOver = new Intro(1);
    this.sucsses = new Intro(2);
    this.character = new Character();
    this.camera_x = 0;
    this.bottleCaunt = 0;
    this.coinCaunt = 0;
    this.bossHP = 100;
    this.bossHit = false;
    this.throwableObject = [];
    this.throwableBottel = false;
    this.statusbar = [
      new Statusbar(2, 20, 15, 0),
      new Statusbar(1, 20, 45, 100),
      new Statusbar(3, 20, 80, 0),
      new Statusbar(4, 500, 25, 100),
    ];
    this.buttons;
    this.setWorld();
  }

  gameIsOver() {
    if (this.levelLoaded === true) {
      if (this.character.end === true) {
        this.timerManager.clearAllIntervals();
        this.showButton(320);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.gameOver);
        this.addObjectsToMap(this.buttons);
      }
    }
  }

  gameSucsses() {
    if (this.levelLoaded === true) {
      let i = this.level.enemies.length - 1;
      if (this.level.enemies[i].done === true) {
        this.timerManager.clearAllIntervals();
        this.showButton(355);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addToMap(this.sucsses);
        this.addObjectsToMap(this.buttons);
      }
    }
  }

  loadWorld() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.startInterval();
    initLevel();
    this.level = level1;
    this.levelLoaded = true;
    this.initializeGame();
  }

  setWorld() {
    this.character.world = this;
  }

  startInterval() {
    this.timerManager.setInterval(() => this.run(), 1000 / 60);
  }

  run() {
    if (this.levelLoaded === true) {
      this.checkCollision();
      this.checkThrowObject();
      this.checkBottle();
      this.checkCoin();
      this.checkCollisionBoss();
      this.alertEndBoss();
      this.checkSmash();
    }
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

  checkSmash() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.smashEnemies(enemy)) {
        if (this.character.isHit === false) {
          console.log("smash");
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
    let i = this.level.enemies.length - 1;
    this.bossHit = true;
    this.level.enemies[i].endBossHurt = true;
    let splashIndex = this.throwableObject[index];
    let splash = new ThrowableObject(splashIndex.x, splashIndex.y, 2);

    this.throwableObject[index] = splash;
    this.bossHP -= 20;
    this.statusbar[3].setPercentage(this.bossHP, 4);
    setTimeout(() => {
      this.bossHit = false;
    }, 300);
    if (this.bossHP <= 0) {
      this.level.enemies[i].endBossDead = true;
    }
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
      }, 600);
    }
  }

  introPage() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMap(this.intro);
    this.addObjectsToMap(this.buttons);
  }

  draw() {
    this.checkChlick(this.keyboard.mouseX, this.keyboard.mouseY);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.introPage();
    this.startGame();
    this.gameSucsses();
    this.gameIsOver();

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
    // mo.drawFrame(this.ctx);

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
    if (this.gameIsStarted === true) {
      this.updateCamera();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.translate(this.camera_x, 0);
      this.loadFixedObjects();
      this.ctx.translate(-this.camera_x, 0);
      this.loadStatusbar();
      this.ctx.translate(this.camera_x, 0);
      this.loadMovableObjects();
      this.ctx.translate(-this.camera_x, 0);
    }
  }

  loadFixedObjects() {
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coin);
  }

  loadStatusbar() {
    this.addObjectsToMap(this.statusbar);
    this.addObjectsToMap(this.buttons);
  }

  loadMovableObjects() {
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
  }

  checkChlick(x, y) {
    this.buttons.forEach((button, index) => {
      if (
        x >= button.x * this.keyboard.scaleX &&
        x <=
          button.x * this.keyboard.scaleX +
            button.width * this.keyboard.scaleX &&
        y >= button.y * this.keyboard.scaleY &&
        y <=
          button.y * this.keyboard.scaleY + button.height * this.keyboard.scaleY
      ) {
        this.buttonClicked(index);
      }
    });
  }

  buttonClicked(btn) {
    if (btn == 0) {
      this.soundOnOff();
    } else if (btn == 1) {
      this.switchFullSize();
    } else if (btn == 2) {
      this.hideButton();
      this.loadWorld();
      this.gameIsStarted = true;
    }
    this.keyboard.mouseX = 0;
    this.keyboard.mouseY = 0;
  }

  soundOnOff() {
    if (this.sound === false) {
      this.sound = true;
      this.buttons[0] = new Buttons(1, 650, 5, 25, 25);
    } else {
      this.sound = false;
      this.buttons[0] = new Buttons(2, 650, 5, 25, 25);
    }
  }

  switchFullSize() {
    if (this.fullSize === false) {
      this.fullSize = true;
      this.buttons[1] = new Buttons(4, 680, 5, 25, 25);
    } else {
      this.fullSize = false;
      this.buttons[1] = new Buttons(3, 680, 5, 25, 25);
    }
  }

  alertEndBoss() {
    let i = this.level.enemies.length - 1;
    if (this.character.x == 2100) {
      this.level.enemies[i].alert = true;
    }
  }

  updateCamera() {
    if (this.character) {
      this.camera_x = -this.character.x + 100;
    }
  }

  showButton(y) {
    this.buttons[2].visible = true;
    this.buttons[2].x = 260;
    this.buttons[2].y = y;
    this.buttons[2].height = 150;
    this.buttons[2].width = 200;
    this.buttons[2].startAnimation();
  }

  hideButton() {
    this.buttons[2].visible = false;
    this.buttons[2].x = -9999;
    this.buttons[2].stopAnimation();
  }
}

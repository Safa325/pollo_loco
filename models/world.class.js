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
  coinCaunt;
  statusbar;
  throwableObject;
  buttons;
  fullSize = false;
  gameIsStarted = false;
  levelLoaded = false;
  timerManager;
  audioManager;

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

  /**
   * Loads the initial page, setting up the intro and buttons.
   */
  loadingPage() {
    this.intro = new Intro(0);
    this.buttons = [
      new Buttons(2, 650, 5, 25, 25),
      new Buttons(3, 680, 5, 25, 25),
      new Buttons(6, 260, 30, 200, 150),
    ];
  }

  /**
   * Initializes the game by setting up game objects, state, status bars, and the world context.
   */
  initializeGame() {
    this.initializeGameObjects();
    this.initializeState();
    this.initializeStatusbar();
    this.setWorld();
  }

  /**
   * Initializes the game objects such as intro screens and the character.
   */
  initializeGameObjects() {
    this.gameOver = new Intro(1);
    this.sucsses = new Intro(2);
    this.character = new Character();
  }

  /**
   * Initializes the game state variables including camera position, bottle count, coin count, and boss health.
   */
  initializeState() {
    this.camera_x = 0;
    this.coinCaunt = 0;
    this.throwableObject = [];
  }

  /**
   * Initializes the status bars for various game elements such as health, bottles, coins, and boss health.
   */
  initializeStatusbar() {
    this.statusbar = [
      new Statusbar(2, 20, 15, 0),
      new Statusbar(1, 20, 45, 100),
      new Statusbar(3, 20, 80, 0),
      new Statusbar(4, 500, 25, 100),
    ];
  }

  /**
   * Displays the game over screen, showing relevant UI elements and clearing the canvas.
   */
  displayGameOverScreen() {
    this.showButton(320);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMap(this.gameOver);
    this.addObjectsToMap(this.buttons);
  }

  /**
   * Checks if the game is over based on the character state and level conditions.
   * Clears all intervals, displays the game over screen, and manages audio if the game is over.
   */
  gameIsOver() {
    if (this.levelLoaded && this.character.end) {
      this.timerManager.clearAllIntervals();
      this.displayGameOverScreen();
      this.AudioManager.manageAudioOnGameOver(
        this.gameOverIndex,
        this.backgroundIndex
      );
    }
  }

  /**
   * Displays the success screen, showing relevant UI elements and clearing the canvas.
   */
  displaySuccessScreen() {
    this.showButton(355);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMap(this.sucsses);
    this.addObjectsToMap(this.buttons);
  }

  /**
   * Checks if the game has been successfully completed based on the state of the last enemy.
   * If the game is successful, it clears all intervals, manages success audio, and displays the success screen.
   */
  gameSucsses() {
    if (
      this.levelLoaded &&
      this.level.enemies[this.level.enemies.length - 1].done
    ) {
      this.timerManager.clearAllIntervals();
      this.audioManager.manageAudioOnSuccess(this.sucessIndex);
      this.displaySuccessScreen();
    }
  }

  /**
   * Loads the game world by initializing the level and setting up the game state.
   * Clears the canvas, starts the interval for game updates, and initializes the game.
   */
  loadWorld() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.startInterval();
    initLevel();
    this.level = level1;
    this.levelLoaded = true;
    this.initializeGame();
  }

  /**
   * Sets the world context for the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Starts the main game interval for ongoing game updates.
   * Sets an interval to call the run method at a frequency of 60 times per second (1000 ms / 60).
   */
  startInterval() {
    this.timerManager.setInterval(() => this.run(), 1000 / 60);
  }

  /**
   * Main game loop that checks all interactions and state updates.
   * Calls various methods to handle collisions, object throws, item pickups, and special actions.
   */
  run() {
    if (this.levelLoaded === true) {
      this.character.checkCollision(this.level, this.statusbar);
      this.character.checkThrowObject(
        this.throwableObject,
        this.statusbar,
        this.keyboard
      );
      this.character.checkBottle(this.level, this.statusbar);
      this.checkCoin();
      this.level.enemies[6].checkCollisionBoss(
        this.throwableObject,
        this.statusbar
      );
      this.level.enemies[6].alertEndBoss(this.character);
      this.character.checkSmash(this.level);
    }
  }

  /**
   * Checks for collisions between the character and coins.
   * If a collision is detected, increases the coin count, removes the coin, plays the coin audio, and updates the status bar.
   */
  checkCoin() {
    this.level.coin.forEach((coin, index) => {
      if (this.character.isCollidingObj(coin)) {
        this.coinCaunt += 20;
        this.level.coin.splice(index, 1);
        this.audioManager.playAudio(this.audioManager.coin);
        this.statusbar[2].setPercentage(this.coinCaunt, 3);
      }
    });
  }

  /**
   * Clears the canvas and displays the intro page with buttons.
   */
  introPage() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMap(this.intro);
    this.addObjectsToMap(this.buttons);
  }

  /**
   * Main drawing loop for the game.
   * Clears the canvas, checks for interactions, and updates the game state.
   * Continuously requests the next animation frame to keep the game running.
   */
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

  /**
   * Adds multiple objects to the map by iterating over the objects array and calling addToMap for each object.
   * @param {Array<Object>} objects - The array of objects to be added to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the map.
   * If the object has its otherDirection property set, it flips the image before drawing and flips it back afterwards.
   * @param {Object} mo - The object to be added to the map.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally by saving the context state, translating, and scaling the image.
   * Adjusts the object's x and xHit properties to account for the flipped image.
   * @param {Object} mo - The object whose image is to be flipped.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
    mo.xHit = mo.xHit * -1;
  }

  /**
   * Restores the image to its original orientation by restoring the context state.
   * Adjusts the object's x and xHit properties back to their original values.
   * @param {Object} mo - The object whose image is to be restored.
   */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
    mo.xHit = mo.xHit * -1;
  }

  /**
   * Starts the game by playing background music, updating the camera, and drawing game objects if the game has started.
   */
  startGame() {
    if (this.gameIsStarted) {
      this.playBackgroundMusic();
      this.updateCamera();
      this.resetCanvas();
      this.drawGameObjects();
    }
  }

  /**
   * Plays the background music in a loop.
   */
  playBackgroundMusic() {
    this.audioManager.playBackground(
      this.audioManager.background,
      true,
      this.audioManager.backgroundIndex
    );
  }

  /**
   * Resets the canvas by clearing it and translating the context based on the camera position.
   */
  resetCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Draws all game objects including fixed objects, status bars, and movable objects.
   * Adjusts the context translation as needed.
   */
  drawGameObjects() {
    this.loadFixedObjects();
    this.ctx.translate(-this.camera_x, 0);
    this.loadStatusbar();
    this.ctx.translate(this.camera_x, 0);
    this.loadMovableObjects();
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Loads and draws fixed objects such as background elements and clouds.
   */
  loadFixedObjects() {
    this.addObjectsToMap(this.level.backgroundObject);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coin);
  }

  /**
   * Loads and draws the status bar and buttons.
   */
  loadStatusbar() {
    this.addObjectsToMap(this.statusbar);
    this.addObjectsToMap(this.buttons);
  }

  /**
   * Loads and draws movable objects such as enemies, the character, and throwable objects.
   */
  loadMovableObjects() {
    this.addObjectsToMap(this.level.enemies);
    this.addToMap(this.character);
    this.addObjectsToMap(this.throwableObject);
  }

  /**
   * Checks if a click is within the bounds of any button and triggers the corresponding button click action.
   * @param {number} x - The x-coordinate of the click.
   * @param {number} y - The y-coordinate of the click.
   */
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

  /**
   * Handles button click actions based on the button index.
   * @param {number} btn - The index of the clicked button.
   */
  buttonClicked(btn) {
    if (btn == 0) {
      this.soundOnOff();
    } else if (btn == 1) {
      this.switchFullSize();
    } else if (btn == 2) {
      this.audioManager.pauseAllAudios();
      this.hideButton();
      this.loadWorld();
      this.gameIsStarted = true;
      this.resetIndex();
    }
    this.keyboard.mouseX = 0;
    this.keyboard.mouseY = 0;
  }

  /**
   * Resets audio index flags for background, game over, success, and boss sound.
   */
  resetIndex() {
    this.audioManager.backgroundIndex = false;
    this.audioManager.gameOverIndex = false;
    this.audioManager.sucessIndex = false;
    this.audioManager.bossSoundIndex = false;
  }

  /**
   * Toggles sound on or off and updates the corresponding button icon.
   */
  soundOnOff() {
    if (this.audioManager.sound === "off") {
      this.audioManager.sound = "on";
      this.buttons[0] = new Buttons(1, 650, 5, 25, 25);
    } else {
      this.audioManager.sound = "off";
      this.buttons[0] = new Buttons(2, 650, 5, 25, 25);
    }
  }

  /**
   * Toggles full screen mode and updates the corresponding button icon.
   */
  switchFullSize() {
    if (this.fullSize === false) {
      this.fullSize = true;
      this.buttons[1] = new Buttons(4, 680, 5, 25, 25);
    } else {
      this.fullSize = false;
      this.buttons[1] = new Buttons(3, 680, 5, 25, 25);
    }
  }

  /**
   * Updates the camera position based on the character's position.
   */
  updateCamera() {
    if (this.character) {
      if (this.character.x < 2120) {
        this.camera_x = -this.character.x + 100;
      } else {
        this.camera_x = -2150 + 100;
      }
    }
  }

  /**
   * Shows a button at the specified y-coordinate and starts its animation.
   * @param {number} y - The y-coordinate to place the button.
   */
  showButton(y) {
    this.buttons[2].visible = true;
    this.buttons[2].x = 260;
    this.buttons[2].y = y;
    this.buttons[2].height = 150;
    this.buttons[2].width = 200;
    this.buttons[2].startAnimation();
  }

  /**
   * Hides the button and stops its animation.
   */
  hideButton() {
    this.buttons[2].visible = false;
    this.buttons[2].x = -9999;
    this.buttons[2].stopAnimation();
  }
}

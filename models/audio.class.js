class AudioManager {
  moveLeft = new Audio("/audio/running-in-grass-6237.mp3");
  moveRight = new Audio("/audio/running-in-grass-6237.mp3");
  jump = new Audio("/audio/cartoon-jump-6462.mp3");
  hurt = new Audio("/audio/oof-97698.mp3");
  background = new Audio("/audio/game-music-loop-7-145285.mp3");
  splash = new Audio("/audio/glass-hit-192119.mp3");
  gameOver = new Audio("/audio/game-over-arcade-6435.mp3");
  coin = new Audio(
    "/audio/short-success-sound-glockenspiel-treasure-video-game-6346.mp3"
  );
  sucess = new Audio("/audio/success-1-6297.mp3");
  breeze = new Audio("/audio/breeze-of-blood-122253.mp3");
  bossSound = new Audio("/audio/chase-8-bit-73312.mp3");
  chicken = new Audio("/audio/rubber-chicken-squeak-toy-3-181418.mp3");
  sound = "off";
  backgroundIndex;
  gameOverIndex;
  sucessIndex;
  bossSoundIndex;

  static instance = null;

  constructor() {
    if (AudioManager.instance) {
      throw new Error("You can only create one instance of AudioManager!");
    }
    AudioManager.instance = this;
    this.backgroundIndex = false;
    this.gameOverIndex = false;
    this.sucessIndex = false;
    this.bossSoundIndex = false;
  }

  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  playAudio(key, x) {
    let audio = key;
    if (this.sound === "on") {
      audio.play();
      audio.loop = x;
    } else if (this.sound === "off") {
      this.pauseAudio(audio);
    }
  }

  pauseAudio(key) {
    let audio = key;

    audio.pause();
  }

  playBackground(key, x, sound) {
    if (!sound) {
      this.playAudio(key, x);
    }
  }
}

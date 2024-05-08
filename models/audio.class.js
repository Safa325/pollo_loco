class AudioManager {
  moveLeft = new Audio("./audio/running-in-grass-6237.mp3");
  moveRight = new Audio("./audio/running-in-grass-6237.mp3");
  jump = new Audio("./audio/cartoon-jump-6462.mp3");
  hurt = new Audio("./audio/oof-97698.mp3");
  background = new Audio("./audio/game-music-loop-7-145285.mp3");
  splash = new Audio("./audio/glass-hit-192119.mp3");
  gameOver = new Audio("./audio/game-over-arcade-6435.mp3");
  coin = new Audio(
    "./audio/short-success-sound-glockenspiel-treasure-video-game-6346.mp3"
  );
  sucess = new Audio("./audio/success-1-6297.mp3");
  breeze = new Audio("./audio/breeze-of-blood-122253.mp3");
  bossSound = new Audio("./audio/chase-8-bit-73312.mp3");
  chicken = new Audio("./audio/rubber-chicken-squeak-toy-3-181418.mp3");
  sound = "off";
  backgroundIndex;
  gameOverIndex;
  sucessIndex;
  bossSoundIndex;
  audios = [
    this.moveLeft,
    this.moveRight,
    this.jump,
    this.hurt,
    this.background,
    this.splash,
    this.gameOver,
    this.coin,
    this.sucess,
    this.breeze,
    this.bossSound,
    this.chicken,
  ];

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

  /**
   * Returns the singleton instance of the AudioManager.
   * @returns {AudioManager} The singleton instance of AudioManager.
   */
  static getInstance() {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  /**
   * Plays a given audio element.
   * @param {HTMLAudioElement} key - The audio element to play.
   * @param {boolean} x - Whether the audio should loop.
   */
  playAudio(key, x) {
    let audio = key;
    if (this.sound === "on") {
      audio.play();
      audio.loop = x;
    } else if (this.sound === "off") {
      this.pauseAudio(audio);
    }
  }

  /**
   * Pauses a given audio element.
   * @param {HTMLAudioElement} key - The audio element to pause.
   */
  pauseAudio(key) {
    let audio = key;
    audio.pause();
  }

  /**
   * Plays background music if sound is enabled.
   * @param {HTMLAudioElement} key - The background audio element to play.
   * @param {boolean} x - Whether the background audio should loop.
   * @param {boolean} sound - Indicator of whether the sound should be played.
   */
  playBackground(key, x, sound) {
    if (!sound) {
      this.playAudio(key, x);
    }
  }

  /**
   * Pauses all audio elements currently being played.
   * This method waits for a short delay before pausing all audio elements.
   */
  pauseAllAudios() {
    setTimeout(() => {
      this.audios.forEach((audio) => {
        this.pauseAudio(audio);
      });
    }, 1000);
  }
}

class Endboss extends MovableObjects {
  height = 250;
  width = 250;
  x = 2550;
  y = 190;
  alert = false;
  walking = false;
  endBossHurt = false;
  endBossDead = false;
  playDead = false;
  done = false;

  IMAGES_ALERT = [
    "/img/4_enemie_boss_chicken/2_alert/G5.png",
    "/img/4_enemie_boss_chicken/2_alert/G6.png",
    "/img/4_enemie_boss_chicken/2_alert/G7.png",
    "/img/4_enemie_boss_chicken/2_alert/G8.png",
    "/img/4_enemie_boss_chicken/2_alert/G9.png",
    "/img/4_enemie_boss_chicken/2_alert/G10.png",
    "/img/4_enemie_boss_chicken/2_alert/G11.png",
    "/img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "/img/4_enemie_boss_chicken/1_walk/G1.png",
    "/img/4_enemie_boss_chicken/1_walk/G2.png",
    "/img/4_enemie_boss_chicken/1_walk/G3.png",
    "/img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "/img/4_enemie_boss_chicken/3_attack/G13.png",
    "/img/4_enemie_boss_chicken/3_attack/G14.png",
    "/img/4_enemie_boss_chicken/3_attack/G15.png",
    "/img/4_enemie_boss_chicken/3_attack/G16.png",
    "/img/4_enemie_boss_chicken/3_attack/G17.png",
    "/img/4_enemie_boss_chicken/3_attack/G18.png",
    "/img/4_enemie_boss_chicken/3_attack/G19.png",
    "/img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "/img/4_enemie_boss_chicken/4_hurt/G21.png",
    "/img/4_enemie_boss_chicken/4_hurt/G22.png",
    "/img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "/img/4_enemie_boss_chicken/5_dead/G24.png",
    "/img/4_enemie_boss_chicken/5_dead/G25.png",
    "/img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  speed = 0;

  constructor(visible = true) {
    super();
    this.visible = visible;
    this.timerManager = TimerManager.getInstance();
    this.audioManager = AudioManager.getInstance();
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImage("/img/4_enemie_boss_chicken/1_walk/G1.png");
    this.endBossAnimation();
    this.animationObject();
  }

  endBossAnimation() {
    this.timerManager.setInterval(() => this.animationAlert(), 125);
    this.timerManager.setInterval(() => this.animationWalking(), 100);
    this.timerManager.setInterval(() => this.animationHurt(), 100);
    this.timerManager.setInterval(() => this.animationDead(), 100);
    this.timerManager.setInterval(() => this.animationObject(), 1000 / 60);
  }

  animationWalking() {
    if (this.walking === true) {
      this.playAnimation(this.IMAGES_WALKING);
      this.hitBox(25, 60);
    }
  }

  animationAlert() {
    if (this.alert === true) {
      this.playAnimation(this.IMAGES_ALERT);
      this.hitBox(25, 60);
      setTimeout(() => {
        this.alert = false;
        this.walking = true;
        this.speed = 0.5;
      }, 2000);
    }
  }

  animationHurt() {
    if (this.endBossHurt === true && !this.endBossDead) {
      this.playAnimation(this.IMAGES_HURT);
      this.audioManager.playAudio(this.audioManager.chicken, false);
      this.speed = 0;
      this.walking = false;
      setTimeout(() => {
        this.endBossHurt = false;
        this.walking = true;
        this.speed = 0.5;
      }, 1000);
    } else if (this.endBossDead === true) {
      this.playDead = true;
    }
  }

  animationDead() {
    if (this.playDead === true) {
      this.playAnimation(this.IMAGES_DEAD);
      this.speed = 0;
      this.walking = false;
      if (this.currentImage == 2) {
        this.playDead = false;
        this.loadWinPage();
      }
    }
  }

  loadWinPage() {
    setTimeout(() => {
      this.done = true;
    }, 500);
  }

  die() {}
}

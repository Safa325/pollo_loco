class Statusbar extends DrawableObject {
  IMAGES_HP = [
    "/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png",
    "/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
    "/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
    "/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
    "/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
    "/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
  ];

  IMAGES_BOTTLES = [
    "/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  IMAGES_COINS = [
    "/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png",
    "/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "/img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png",
  ];

  IMAGES_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/orange/orange0.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange20.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange40.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange60.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange80.png",
    "img/7_statusbars/2_statusbar_endboss/orange/orange100.png",
  ];

  height = 50;
  width = 200;

  widthFix = 200;
  heightFix = 50;

  percentage = 100;

  constructor(images, x, y, percentage) {
    super();
    this.setOtherdirection(images);
    this.loadImages(this.takeImagePathes(images));
    this.x = x;
    this.y = y;
    this.setPercentage(percentage, images);
  }

  setPercentage(percentage, i) {
    this.percentage = percentage;
    let path = this.takeImagePathes(i)[this.resolveImageIndex()];
    this.img = this.imageChache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }

  takeImagePathes(x) {
    if (x == 1) {
      return this.IMAGES_HP;
    } else if (x == 2) {
      return this.IMAGES_BOTTLES;
    } else if (x == 3) {
      return this.IMAGES_COINS;
    } else if (x == 4) {
      return this.IMAGES_ENDBOSS;
    }
  }

  setOtherdirection(x) {
    if (x == 4) {
      return (this.otherDirection = true);
    }
  }
}

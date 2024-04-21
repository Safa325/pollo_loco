class Clouds extends MovableObjects {
  width = 720;
  height = 480;
  y = 0;
  speed = 0.2;

  IMAGES_CLOUDS = [
    "/img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  constructor(imgPath, x) {
    super().loadImage(this.cloudImg(imgPath));
    this.x = x + Math.random() * 720;
    this.animationObject();
  }

  cloudImg(x) {
    if (x == 0) {
      return this.IMAGES_CLOUDS[0];
    }
    if (x == 1) {
      return this.IMAGES_CLOUDS[1];
    }
  }
}

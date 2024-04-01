class MovableObjects {
  x = 100;
  y = 180;
  img;
  width = 150;
  height = 250;
  imageChache = {};
  speed = 0.15;
  currentImage = 0;
  otherDirection = false;

  constructor() {}

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      this.img = new Image();
      this.img.src = path;
      this.imageChache[path] = this.img;
    });
  }

  animationObject() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageChache[path];
    this.currentImage++;
  }
}

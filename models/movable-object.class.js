class MovableObjects {
  x = 50;
  y = 200;
  img;
  width = 150;
  height = 250;

  constructor() {
    this.moveRight();
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    document.addEventListener("keydown", function (event) {
      if (event.key === "d" || event.key === "ArrowRight") {
        this.x += 1;
      }
    });
  }

  moveLeft() {}
}

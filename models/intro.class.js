class Intro extends DrawableObject {
  width = 720;
  height = 480;
  x = 0;
  y = 0;

  IMAGES_INTRO = [
    "/img/9_intro_outro_screens/start/startscreen_1.png",
    "/img/9_intro_outro_screens/game_over/game over.png",
    "/img/Diverse/you-win.png",
  ];

  constructor(i, visible = true) {
    super();
    this.visible = visible;
    this.loadImage(this.IMAGES_INTRO[i]);
  }
}

const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [
    new Clouds("/img/5_background/layers/4_clouds/1.png"),
    new Clouds("/img/5_background/layers/4_clouds/2.png"),
  ],
  [
    new BackgroundObject("/img/5_background/layers/air.png", -1439),
    new BackgroundObject(
      "/img/5_background/layers/3_third_layer/full.png",
      -1439
    ),
    new BackgroundObject(
      "/img/5_background/layers/2_second_layer/full.png",
      -1439
    ),
    new BackgroundObject(
      "/img/5_background/layers/1_first_layer/full.png",
      -1439
    ),

    new BackgroundObject("/img/5_background/layers/air.png", 0),
    new BackgroundObject("/img/5_background/layers/3_third_layer/full.png", 0),
    new BackgroundObject("/img/5_background/layers/2_second_layer/full.png", 0),
    new BackgroundObject("/img/5_background/layers/1_first_layer/full.png", 0),

    new BackgroundObject("/img/5_background/layers/air.png", 1439),
    new BackgroundObject(
      "/img/5_background/layers/3_third_layer/full.png",
      1439
    ),
    new BackgroundObject(
      "/img/5_background/layers/2_second_layer/full.png",
      1439
    ),
    new BackgroundObject(
      "/img/5_background/layers/1_first_layer/full.png",
      1439
    ),
  ]
);

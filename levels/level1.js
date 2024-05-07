let level1;
function initLevel() {
  level1 = new Level(
    [
      new Chicken(),
      new Chicken(),
      new Chicken(),

      new ChickenSmall(),
      new ChickenSmall(),
      new ChickenSmall(),
      new Endboss(),
    ],
    [
      new Clouds(0, 0),
      new Clouds(1, 0),
      new Clouds(0, 1400),
      new Clouds(1, 1400),
      new Clouds(0, 2800),
      new Clouds(1, 2800),
      new Clouds(0, 4200),
      new Clouds(1, 4200),
      new Clouds(0, 5600),
      new Clouds(1, 5600),
      new Clouds(0, 7000),
      new Clouds(1, 7000),
      new Clouds(0, 8400),
      new Clouds(1, 8400),
      new Clouds(0, 9800),
      new Clouds(1, 9800),
    ],
    [
      new BackgroundObject("./img/5_background/layers/air.png", -1439),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        -1439
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        -1439
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        -1439
      ),

      new BackgroundObject("./img/5_background/layers/air.png", 0),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        0
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        0
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        0
      ),

      new BackgroundObject("./img/5_background/layers/air.png", 1439),
      new BackgroundObject(
        "./img/5_background/layers/3_third_layer/full.png",
        1439
      ),
      new BackgroundObject(
        "./img/5_background/layers/2_second_layer/full.png",
        1439
      ),
      new BackgroundObject(
        "./img/5_background/layers/1_first_layer/full.png",
        1439
      ),
    ],
    [
      new Bottles("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 150),
      new Bottles("./img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 150),
      new Bottles("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 870),
      new Bottles("./img/6_salsa_bottle/2_salsa_bottle_on_ground.png", 870),
      new Bottles("./img/6_salsa_bottle/1_salsa_bottle_on_ground.png", 1500),
    ],
    [new Coin(150), new Coin(150), new Coin(870), new Coin(870), new Coin(1500)]
  );
}

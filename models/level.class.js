class Level {
  enemies;
  clouds;
  backgroundObject;
  bottles;
  coin;

  level_end_x = 2200;

  constructor(enemies, clouds, backgroundObject, bottles, coin) {
    this.bottles = bottles;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObject = backgroundObject;
    this.coin = coin;
  }
}

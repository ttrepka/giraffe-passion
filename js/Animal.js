class Animal extends PIXI.extras.AnimatedSprite {
  constructor(animal) {
    const frames = [
      PIXI.Texture.fromFrame(`${animal}.png`),
      PIXI.Texture.fromFrame(`${animal}-outline.png`)
    ];
    super(frames);

    this.animal = animal;
    this.vx = 0;
    this.vy = 0;
    this.scale.set(0.2);
    this.animationSpeed = 0.1;
    this.setStartPosition();
    this.collectedFruits = 0;
    this.goingForFruit = null;
  }

  setStartPosition() {}

  pickUpFruit() {
    this.collectedFruits += 1;
    this.scale.x *= 1.05;
    this.scale.y *= 1.05;
  }

  findClosestFruit(fruits) {
    const filteredFruits = fruits.filter(fruit => fruit.visible);
    if (!filteredFruits.length) {
      return null;
    }

    let closestFruit = filteredFruits[0];
    let closestDistance = Main.computeDistance(this, filteredFruits[0]);

    for (let i = 1; i < filteredFruits.length; i++) {
      const fruit = filteredFruits[i];
      const distance = Main.computeDistance(this, fruit);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestFruit = fruit;
      }
    }

    return closestFruit;
  }

  updateGameLoop(fruits) {}
}

Animal.COLORS = {
  giraffe: 0xffcc00,
  hippo: 0x528cdb
};

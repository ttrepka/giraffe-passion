class Enemy extends Animal {
  constructor(animal) {
    super(animal);
  }

  setStartPosition() {
    const { xMax, yMax } = Main.getStageBounds();

    this.position.x = xMax - this.width;
    this.position.y = yMax - this.height;
  }

  getDirection() {
    const fruitBounds = this.goingForFruit.getBounds();
    const bounds = this.getBounds();

    if (fruitBounds.bottom < bounds.top) {
      return 'LEFT';
    }
    if (fruitBounds.top > bounds.bottom) {
      return 'RIGHT';
    }
    if (fruitBounds.right < bounds.left) {
      return 'UP';
    }
    return 'DOWN';
  }

  updateGameLoop(fruits) {
    if (!this.goingForFruit || !this.goingForFruit.visible) {
      const closestFruit = this.findClosestFruit(fruits);
      this.goingForFruit = closestFruit;
    }

    if (!this.goingForFruit) {
      return;
    }

    this.goingForFruit.tint = Animal.COLORS[this.animal];

    this.vx = 0;
    this.vy = 0;

    switch (this.getDirection()) {
      case 'LEFT':
        this.vy = -5;
        break;
      case 'RIGHT':
        this.vy = 5;
        break;
      case 'UP':
        this.vx = -5;
        break;
      case 'DOWN':
        this.vx = 5;
        break;
    }

    const position = Main.getValidPosition(this);
    this.position.set(position.x, position.y);
  }
}

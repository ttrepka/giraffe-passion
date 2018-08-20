class Player extends Animal {
  constructor(animal) {
    super(animal);

    this.setUpKeyboard();
  }

  setStartPosition() {
    const { xMin, yMin } = Main.getStageBounds();

    this.position.x = xMin;
    this.position.y = yMin;
  }

  setUpKeyboard() {
    this.keyboard = {
      left: new Keyboard(37),
      up: new Keyboard(38),
      right: new Keyboard(39),
      down: new Keyboard(40)
    };

    this.keyboard.left.onKeyDown = () => {
      this.vx = -5;
      this.vy = 0;
    };
    this.keyboard.left.onKeyUp = () => {
      if (!this.keyboard.right.isDown && this.vy === 0) {
        this.vx = 0;
      }
    };

    this.keyboard.right.onKeyDown = () => {
      this.vx = 5;
      this.vy = 0;
    };
    this.keyboard.right.onKeyUp = () => {
      if (!this.keyboard.left.isDown && this.vy === 0) {
        this.vx = 0;
      }
    };

    this.keyboard.up.onKeyDown = () => {
      this.vy = -5;
      this.vx = 0;
    };
    this.keyboard.up.onKeyUp = () => {
      if (!this.keyboard.down.isDown && this.vx === 0) {
        this.vy = 0;
      }
    };

    this.keyboard.down.onKeyDown = () => {
      this.vy = 5;
      this.vx = 0;
    };
    this.keyboard.down.onKeyUp = () => {
      if (!this.keyboard.up.isDown && this.vx === 0) {
        this.vy = 0;
      }
    };
  }

  updateGameLoop(fruits) {
    const position = Main.getValidPosition(this);
    this.position.set(position.x, position.y);

    const closestFruit = this.findClosestFruit(fruits);
    if (closestFruit) {
      closestFruit.tint = Animal.COLORS[this.animal];
    }
  }
}

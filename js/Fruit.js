class Fruit extends PIXI.Sprite {
  constructor() {
    const texture = PIXI.Texture.fromFrame('fruit.png');
    super(texture);

    this.scale.set(0.8);
    this.setStartPosition();
  }

  setStartPosition() {
    const { xMin, xMax, yMin, yMax } = Main.getStageBounds();

    this.position.x = Main.getRandomInt(xMin + 100, xMax - this.width - 100);
    this.position.y = Main.getRandomInt(yMin + 100, yMax - this.height - 100);
  }
}

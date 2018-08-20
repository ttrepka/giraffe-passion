class ProgressBar extends PIXI.Container {
  constructor(min, max, color) {
    super();

    this.min = min;
    this.max = max;
    this.color = color;

    this.text = new PIXI.Text('0 passion', new TextStyle(color));
    this.addChild(this.text);

    this.backgroundRect = new PIXI.Graphics();
    this.backgroundRect.beginFill(0x000000);
    this.backgroundRect.drawRect(
      0,
      (this.text.height - 8) / 2,
      ProgressBar.WIDTH,
      8
    );
    this.backgroundRect.endFill();
    this.addChild(this.backgroundRect);

    this.foregroundRect = new PIXI.Graphics();
    this.foregroundRect.beginFill(this.color);
    this.foregroundRect.drawRect(0, (this.text.height - 8) / 2, 1, 8);
    this.foregroundRect.endFill();
    this.addChild(this.foregroundRect);

    this.updateGameLoop(0);
  }

  updateGameLoop(collectedFruits) {
    this.text.text = `${collectedFruits} passion`;

    this.backgroundRect.position.x = this.text.width + 20;
    this.foregroundRect.position.x = this.text.width + 20;
    this.foregroundRect.width =
      (ProgressBar.WIDTH *
        Math.max(this.min, Math.min(this.max, collectedFruits))) /
      this.max;

    const { xMax, yMin } = Main.getStageBounds();
    this.position.x = xMax - this.width;
  }
}

ProgressBar.WIDTH = 90;

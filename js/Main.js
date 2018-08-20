class Main {
  constructor() {
    this.app = new PIXI.Application({
      width: Main.STAGE_WIDTH,
      height: Main.STAGE_HEIGHT,
      antialias: true,
      transparent: false,
      resolution: 1
    });
    document.body.appendChild(this.app.view);

    this.loadAssets();
  }

  loadAssets() {
    PIXI.loader.add('images/game.json').load(this.onInit.bind(this));
  }

  onInit() {
    this.states = {
      selectAnimal: new StateSelect(
        Main.STAGE_WIDTH,
        Main.STAGE_HEIGHT,
        animal => {
          this.states.play = new StatePlay(
            Main.STAGE_WIDTH,
            Main.STAGE_HEIGHT,
            animal,
            () => this.setState('selectAnimal')
          );
          this.app.stage.addChild(this.states.play);
          this.setState('play');
        }
      )
    };

    this.app.stage.addChild(this.states.selectAnimal);

    this.setState('selectAnimal');

    this.app.ticker.add(this.gameLoop.bind(this));
  }

  setState(state) {
    Object.values(this.states).forEach(state => {
      state.visible = false;
    });

    this.states[state].visible = true;
    this.state = state;
  }

  gameLoop() {
    this.states[this.state].updateGameLoop();
  }
}

Main.STAGE_WIDTH = 1024;
Main.STAGE_HEIGHT = 768;
Main.STAGE_PADDING = 20;
Main.FRUIT_COUNT = 19;
Main.PROGRESS_BAR_WIDTH = 90;

Main.getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

Main.getStageBounds = () => ({
  xMin: Main.STAGE_PADDING,
  xMax: Main.STAGE_WIDTH - Main.STAGE_PADDING,
  yMin: Main.STAGE_PADDING,
  yMax: Main.STAGE_HEIGHT - Main.STAGE_PADDING
});

Main.getSpriteBounds = sprite => ({
  xFrom: sprite.x,
  xTo: sprite.x + sprite.width,
  yFrom: sprite.y,
  yTo: sprite.y + sprite.height
});

Main.isColliding = (r1, r2) => {
  const bounds1 = Main.getSpriteBounds(r1);
  const bounds2 = Main.getSpriteBounds(r2);

  const xColliding =
    (bounds1.xTo > bounds2.xFrom && bounds1.xTo < bounds2.xTo) ||
    (bounds2.xTo > bounds1.xFrom && bounds2.xTo < bounds1.xTo);
  const yColliding =
    (bounds1.yTo > bounds2.yFrom && bounds1.yTo < bounds2.yTo) ||
    (bounds2.yTo > bounds1.yFrom && bounds2.yTo < bounds1.yTo);
  return xColliding && yColliding;
};

Main.keepInBounds = (value, min, max) => Math.min(max, Math.max(min, value));

Main.getValidPosition = sprite => {
  const { xMin, xMax, yMin, yMax } = Main.getStageBounds();

  return {
    x: Main.keepInBounds(sprite.x + sprite.vx, xMin, xMax - sprite.width),
    y: Main.keepInBounds(sprite.y + sprite.vy, yMin, yMax - sprite.height)
  };
};

Main.computeDistance = (r1, r2) => {
  const r1Bounds = r1.getBounds();
  const r2Bounds = r2.getBounds();

  let distanceX = 0;
  if (r2Bounds.left > r1Bounds.right) {
    distanceX = r2Bounds.left - r1Bounds.right;
  } else if (r2Bounds.right < r1Bounds.left) {
    distanceX = r1Bounds.left - r2Bounds.right;
  }

  let distanceY = 0;
  if (r2Bounds.top > r1Bounds.bottom) {
    distanceY = r2Bounds.top - r1Bounds.bottom;
  } else if (r2Bounds.bottom < r1Bounds.top) {
    distanceY = r1Bounds.top - r2Bounds.bottom;
  }

  return distanceX + distanceY;
};

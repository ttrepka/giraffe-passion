class StateSelect extends PIXI.Container {
  constructor(width, height, onSelect) {
    super();

    this.onSelect = onSelect;

    const background = new PIXI.Sprite(PIXI.Texture.WHITE);
    background.width = width;
    background.height = height;
    background.tint = 0xffdb7e;

    this.addChild(background);

    let style = new TextStyle(0xffffff, 64);
    const message = new PIXI.Text('Select player', style);
    message.anchor.set(0.5);
    message.x = Main.STAGE_WIDTH / 2;
    message.y = 100;
    this.addChild(message);

    const play = new PIXI.Text('Play', style);
    play.anchor.set(0.5);
    play.x = Main.STAGE_WIDTH / 2;
    play.y = Main.STAGE_HEIGHT - 100;
    play.interactive = true;
    play.buttonMode = true;
    play.on('pointerdown', this.onPlayClick.bind(this));
    this.addChild(play);

    this.giraffe = this.createAnimal('giraffe');
    this.giraffe.position.x = Main.STAGE_WIDTH / 4 + 50;

    this.hippo = this.createAnimal('hippo');
    this.hippo.position.x = (Main.STAGE_WIDTH / 4) * 3 - 50;

    this.selectAnimal('giraffe');
  }

  createAnimal(name) {
    const frames = [
      PIXI.Texture.fromFrame(`${name}.png`),
      PIXI.Texture.fromFrame(`${name}-outline.png`)
    ];
    const animal = new PIXI.extras.AnimatedSprite(frames);
    animal.animationSpeed = 0.05;
    animal.anchor.set(0.5);
    animal.interactive = true;
    animal.buttonMode = true;
    animal.on('pointerdown', () => this.selectAnimal(name));
    animal.position.y = Main.STAGE_HEIGHT / 2;
    this.addChild(animal);
    return animal;
  }

  selectAnimal(name) {
    this.selectedAnimal = name;

    if (name === 'hippo') {
      this.hippo.play();
      this.giraffe.gotoAndStop(0);
    } else {
      this.giraffe.play();
      this.hippo.gotoAndStop(0);
    }
  }

  onPlayClick() {
    this.onSelect(this.selectedAnimal);
  }

  updateGameLoop() {}
}

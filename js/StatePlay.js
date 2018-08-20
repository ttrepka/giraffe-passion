class StatePlay extends PIXI.Container {
  constructor(width, height, animal, onPlayAgain) {
    super();
    this.containerWidth = width;
    this.containerHeight = height;
    this.animal = animal;
    this.onPlayAgain = onPlayAgain;

    this.onInit();
  }

  addFruits() {
    this.fruits = [];

    for (let i = 0; i < Main.FRUIT_COUNT; i++) {
      const fruit = new Fruit();
      this.fruits.push(fruit);
      this.addChild(fruit);
    }
  }

  getEnemyAnimal() {
    return this.animal === 'giraffe' ? 'hippo' : 'giraffe';
  }

  onInit() {
    this.collectedFruits = 0;
    const { yMin } = Main.getStageBounds();
    const enemyAnimal = this.getEnemyAnimal();

    const background = new PIXI.extras.TilingSprite(
      PIXI.Texture.fromFrame('grass.jpg'),
      this.containerWidth,
      this.containerWidth
    );
    this.addChild(background);

    this.addFruits();

    this.player = new Player(this.animal);
    this.addChild(this.player);

    this.enemy = new Enemy(enemyAnimal);
    this.addChild(this.enemy);

    this.playerScore = new ProgressBar(
      0,
      Main.FRUIT_COUNT,
      Animal.COLORS[this.animal]
    );
    this.playerScore.position.y = yMin;
    this.addChild(this.playerScore);

    this.enemyScore = new ProgressBar(
      0,
      Main.FRUIT_COUNT,
      Animal.COLORS[enemyAnimal]
    );
    this.enemyScore.position.y =
      this.playerScore.position.y + this.playerScore.height + 10;
    this.addChild(this.enemyScore);

    this.endText = new EndText(this.animal);
    this.endText.visible = false;
    this.addChild(this.endText);

    this.canPlay = false;
    let style = new TextStyle(0xffffff, 150);
    this.countDown = new PIXI.Text(3, style);
    this.countDown.anchor.set(0.5);
    this.countDown.x = Main.STAGE_WIDTH / 2;
    this.countDown.y = Main.STAGE_HEIGHT / 2;
    this.addChild(this.countDown);
    this.interval = setInterval(() => {
      this.countDown.text -= 1;
      if (this.countDown.text === '0') {
        this.canPlay = true;
        this.countDown.visible = false;
        clearInterval(this.interval);
      }
    }, 1000);

    this.playAgain = new PIXI.Text('Play again', new TextStyle(0xffffff, 64));
    this.playAgain.anchor.set(0.5);
    this.playAgain.x = Main.STAGE_WIDTH / 2;
    this.playAgain.y = Main.STAGE_HEIGHT - 100;
    this.playAgain.interactive = true;
    this.playAgain.buttonMode = true;
    this.playAgain.on('pointerdown', this.onPlayAgain);
    this.playAgain.visible = false;
    this.addChild(this.playAgain);
  }

  updateGameLoop() {
    if (!this.canPlay) {
      return;
    }

    this.fruits.forEach(fruit => {
      fruit.tint = 0xffffff;
    });

    this.player.updateGameLoop(this.fruits);
    this.enemy.updateGameLoop(this.fruits);

    this.fruits.forEach(fruit => {
      if (!fruit.visible) {
        return;
      }
      if (Main.isColliding(fruit, this.player)) {
        fruit.visible = false;
        this.player.pickUpFruit();
      } else if (Main.isColliding(fruit, this.enemy)) {
        fruit.visible = false;
        this.enemy.pickUpFruit();
      }
    });

    this.playerScore.updateGameLoop(this.player.collectedFruits);
    this.enemyScore.updateGameLoop(this.enemy.collectedFruits);

    if (
      this.player.collectedFruits + this.enemy.collectedFruits >=
      Main.FRUIT_COUNT
    ) {
      const giraffeWon =
        this.player.collectedFruits > this.enemy.collectedFruits;
      this.endText.update(giraffeWon);
      this.endText.visible = true;
      this.endText.position.set(this.containerWidth / 2, 100);
      if (giraffeWon) {
        this.player.play();
      } else {
        this.enemy.play();
      }

      this.playAgain.visible = true;
    }
  }
}

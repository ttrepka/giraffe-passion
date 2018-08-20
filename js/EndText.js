class EndText extends PIXI.Text {
  constructor(playerAnimal) {
    super('');
    this.anchor.set(0.5);
    this.playerAnimal = playerAnimal;
  }

  getEnemyAnimal() {
    return this.playerAnimal === 'giraffe' ? 'hippo' : 'giraffe';
  }

  update(hasWon) {
    const text = hasWon ? 'Winner' : 'Loser';
    const color =
      Animal.COLORS[hasWon ? this.playerAnimal : this.getEnemyAnimal()];
    this.text = text;
    this.style = new TextStyle(color, 70);
  }
}

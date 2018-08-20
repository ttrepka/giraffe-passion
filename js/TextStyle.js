class TextStyle extends PIXI.TextStyle {
  constructor(color, fontSize = 18) {
    super({
      fontFamily: 'Arial',
      fontSize,
      fill: color,
      stroke: 0x000000,
      strokeThickness: 2,
      dropShadow: true,
      dropShadowColor: 0x000000,
      dropShadowBlur: 10,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 3
    });
  }
}

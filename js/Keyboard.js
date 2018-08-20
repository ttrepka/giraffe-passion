class Keyboard {
  constructor(keyCode) {
    this.keyCode = keyCode;
    this.isDown = false;
    this.isUp = true;
    this.onKeyDown = () => {};
    this.onKeyUp = () => {};

    window.addEventListener('keydown', this.onKeyDownHandler.bind(this), false);
    window.addEventListener('keyup', this.onKeyUpHandler.bind(this), false);
  }

  onKeyDownHandler(event) {
    if (event.keyCode === this.keyCode) {
      if (this.isUp) {
        this.onKeyDown();
      }
      this.isDown = true;
      this.isUp = false;
    }
    event.preventDefault();
  }

  onKeyUpHandler(event) {
    if (event.keyCode === this.keyCode) {
      if (this.isDown) {
        this.onKeyUp();
      }
      this.isDown = false;
      this.isUp = true;
    }
    event.preventDefault();
  }
}

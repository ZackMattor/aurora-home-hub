const Base = require('./base.js');
const rgb = require('../color.js').rgb;

class RainbowScroll extends Base {
  start() {
    console.log('RainbowScroll -> start');

    // Override some internal config variables
    this.interval = 1000/60;
    this.brightness = 0.75;

    // Animation Configuration Variables
    this.rainbow_width = 70;
    this.speed = 2;

    // Storage Variables
    this.step = 0;
  }

  frame() {
    let point = [];

    for(var y=0; y<this.height; y++) {
      let beta = (this.step + ( y * this.rainbow_width )) % 766;
      let magnitude = beta % 256;
      let state = parseInt(beta / 256);

      let r = 0;
      let g = 0;
      let b = 0;

      switch(state) {
        // Red to Green
        case 0:
          r = 255 - magnitude;
          g = magnitude;
          break;

        // Green to Blue
        case 1:
          g = 255 - magnitude;
          b = magnitude;
          break;

        // Blue to Red
        case 2:
          b = 255 - magnitude;
          r = magnitude;
          break;
      }

      for(var x=0; x<this.width; x++) {
        this.setPixel(x,y,rgb(r,g,b));
      }
    }

    this.step += this.speed;
  }
}

module.exports = RainbowScroll;

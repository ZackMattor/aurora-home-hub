const Base = require('./base.js');
const rgb = require('../color.js').rgb;

class RainbowScroll extends Base {
  start() {
    console.log('RainbowScroll -> start');

    // Override some internal config variables
    this.interval = 1000/60;
    this.brightness = 0.75;

    // Animation Configuration Variables
    this.dirrection = 0;

    // set default for moving horizontally
    if(this.dirrection == 1) {
      this.spectrum_width = 40; // in pixels
      this.speed = 3;

    // set default for moving vertically
    } else {
      this.spectrum_width = 10; // in pixels
      this.speed = -5;

      //this.spectrum_width = 2; // in pixels
      //this.speed = 3;
    }

    // Storage Variables
    this.step = 0;

    this.startDemoReel();
  }

  startDemoReel() {
    let mode = 0;
    setInterval(() => {
      this.dirrection = 0;

      switch(mode%4) {
        case 0:
          this.dirrection = 1;
          this.spectrum_width = 40;
          this.speed = 3;
          break;
        case 1:
          this.dirrection = 1;
          this.spectrum_width = 40;
          this.speed = -10;
          break;
        case 2:
          this.dirrection = 0;
          this.spectrum_width = 10;
          this.speed = -5;
          break;
        case 3:
          this.dirrection = 0;
          this.spectrum_width = 2;
          this.speed = 3;
          break;
      }
      mode++;
    }, 8000);
  }

  frame() {
    let dims = [this.width, this.height];
    let dimension_a, dimension_b;

    if(this.dirrection == 0) {
      dimension_a = this.height;
      dimension_b = this.width;
    } else {
      dimension_b = this.height;
      dimension_a = this.width;
    }

    for(var i=0; i<dimension_a; i++) {
      let beta = Math.abs(( i*(766/this.spectrum_width) ) + this.step) % 766;
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

      let color = rgb(r,g,b);

      for(var j=0; j<dimension_b; j++) {
        if(this.dirrection == 1) {
          this.setPixel(i, j, color);
        } else {
          this.setPixel(j, i, color);
        }
      }
    }

    this.step += this.speed;
  }
}

module.exports = RainbowScroll;

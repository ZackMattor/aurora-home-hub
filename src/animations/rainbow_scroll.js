const Base = require('./base.js');
const rgb = require('../color.js').rgb;

class RainbowScroll extends Base {
  init() {
    console.log('RainbowScroll -> start');

    this.config = {
      brightness: 100,
      speed: 50,
      spectrum_width: 50,
      direction: 0
    };

    // Override some internal config variables
    this.interval = 1000/60;

    // Animation Configuration Variables
    this.config.direction = 0;

    // set default for moving horizontally
    if(this.config.direction == 1) {
      this.config.spectrum_width = 40; // in pixels
      this.config.speed = 3;

    // set default for moving vertically
    } else {
      this.config.spectrum_width = 10; // in pixels
      this.config.speed = -5;

      //this.config.spectrum_width = 2; // in pixels
      //this.config.speed = 3;
    }

    // Storage Variables
    this.step = 0;
  }

  frame() {
    let dimension_a, dimension_b;

    if(this.config.direction == 0) {
      dimension_a = this.height;
      dimension_b = this.width;
    } else {
      dimension_b = this.height;
      dimension_a = this.width;
    }

    for(var i=0; i<dimension_a; i++) {
      let beta = Math.abs(( i*(766/this.config.spectrum_width) ) + this.step) % 766;
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
        if(this.config.direction == 1) {
          this.setPixel(i, j, color);
        } else {
          this.setPixel(j, i, color);
        }
      }
    }

    this.step += this.config.speed;
  }

  setNormalizedConfig(cfg) {
    this.config.brightness = this.config_map(cfg['brightness'], 0, 100);

    this.config.direction = cfg['direction'];

    if(this.config.direction == 1) {
      this.config.speed          = this.config_map(cfg['speed'], -10, 10);
      this.config.spectrum_width = parseInt(this.config_map(cfg['spectrum_width'], 10, 100));
    } else {
      this.config.speed          = this.config_map(cfg['speed'], -10, 10);
      this.config.spectrum_width = parseInt(this.config_map(cfg['spectrum_width'], 1, 10));
    }
  }
}

module.exports = RainbowScroll;

const Base = require('./base.js');
const rgb = require('../color.js').rgb;

class Snowfall extends Base {
  init() {
    console.log('RainbowScroll -> start');
  
    //let snow_sprites = [];

    this.config = {
      brightness: 100,
      speed: 50,
      intensity: 50
    };

    // Override some internal config variables
    this.interval = 1000 / 60;

    // Storage Variables
    this.step = 0;
  }

  frame() {
    this.fill(rgb(200, 200, 200));
    this.step += this.config.speed;
  }
}

module.exports = Snowfall;

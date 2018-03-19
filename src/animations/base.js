const rgb = require('../color.js').rgb;

class AnimationBase {
  constructor() {
    console.log('AnimationBase -> construct');

    this.initConfigVariables();

    this.name = this.constructor.name.split(/(?=[A-Z])/).join('_').toLowerCase();;

    // internal variables
    this.buffer = Buffer.alloc(300, 0, 'binary');
    this.shelf = [];

    // initialize the shelf
    for(var y=0; y<this.height; y++) {
      this.shelf[y] = [];

      for(var x=0; x<this.width; x++) {
        this.shelf[y][x] = rgb(0,0,0);
      }
    }
  }

  initConfigVariables() {
    this.width = 20;
    this.height = 5;
    this.interval = 1000/20;
    this.brightness = 100;
  }

  fill(color) {
    for(var y=0; y<this.height; y++) {
      for(var x=0; x<this.width; x++) {
        this.setPixel(x,y,color);
      }
    }
  }

  setNormalizedConfig(cfg) {
    //this.config.direction = cfg['direction'];
    this.config.brightness     = this.config_map(cfg['brightness'], 0, 100);
    this.config.speed          = this.config_map(cfg['speed'], -10, 10);
    this.config.spectrum_width = this.config_map(cfg['spectrum_width'], 0, 50);
  }

  setPixel(x, y, color) {
    if( x >= 0 && y >= 0 &&
        x < this.width && y < this.height ) {
      this.shelf[y][x] = color;
    } else {
      console.log(`(${x},${y}) is out of bounds!`);
    }
  }

  render() {
    this.frame();

    for(var y=0; y<this.height; y++) {
      for(var x=0; x<this.width; x++) {
        let h = y * this.width;
        let index = 3*(h+x);
        let color = this.shelf[y][x];

        let brightness = this.config['brightness'] / 100;
        this.buffer[index+0] = color.r * brightness;
        this.buffer[index+1] = color.g * brightness;
        this.buffer[index+2] = color.b * brightness;
      }
    }

    return this.buffer;
  }

  config_map(value, min, max) {
    return min + (max - min) * (value - 0) / 100;
  }
}

module.exports = AnimationBase;

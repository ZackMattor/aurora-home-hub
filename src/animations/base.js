const rgb = require('../color.js').rgb;

class AnimationBase {
  constructor() {
    console.log('AnimationBase -> construct');

    this.initConfigVariables();

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
    this.brightness = 1;
  }

  fill(color) {
    for(var y=0; y<this.height; y++) {
      for(var x=0; x<this.width; x++) {
        this.setPixel(x,y,color);
      }
    }
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

        this.buffer[index+0] = color.r * this.brightness;
        this.buffer[index+1] = color.g * this.brightness;
        this.buffer[index+2] = color.b * this.brightness;
      }
    }

    return this.buffer;
  }
}

module.exports = AnimationBase;

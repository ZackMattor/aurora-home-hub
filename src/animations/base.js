const rgb = require('../color.js').rgb;

class AnimationBase {
  init() {
    throw 'Implementation must include a "init" method';
  }

  frame() {
    throw 'Implementation must include a "frame" method';
  }

  setNormalizedConfig() {
    throw 'Implementation must include a "setNormalizedConfig" method';
  }

  constructor(size) {
    console.log('AnimationBase -> construct');

    this.name = this.constructor.name.split(/(?=[A-Z])/).join('_').toLowerCase();

    // internal variables
    this.width = size.width;
    this.height = size.height;
    this.interval = 1000/20;

    this.canvas = [];
    this.interval_pointer = null;

    let buffer_size = this.width * this.height * 3;
    this.buffer = Buffer.alloc(buffer_size, 0, 'binary');

    // initialize the canvas
    for(let y = 0; y < this.height; y++) {
      this.canvas[y] = [];

      for(let x = 0; x < this.width; x++) {
        this.canvas[y][x] = rgb(0,0,0);
      }
    }
  }

  start(frame_cb) {
    console.log(`Starting the ${this.name} animation`);
    this.init();

    this.interval_pointer = setInterval(() => {
      if(frame_cb) frame_cb(this.render());
    }, this.interval);
  }

  end() {
    clearInterval(this.interval_pointer);
  }

  gradientMapper(colors, value) {
    // colors - rgb(255,0,0), rgb(0,255,0), 
    //let resolution = 256;
    //let max_beta = colors.length * resolution;
    //let beta = this.map(value, 0, 1024, 0, max_beta);

    let resolution = 1024 / (colors.length-1);
    let index = parseInt(value / resolution);

    console.log(`index - ${index}`);
    console.log(`value - ${value}`);
    console.log(`resolution - ${resolution}`);
    //console.log(`beta - ${beta}`);

    let color_a = colors[index];
    let color_b = colors[(index+1) % colors.length];

    // beta - 384
    // index - 1024
    let progress = value - resolution;
    console.log(`progress - ${progress}`);

    //let r = this.map(value, index*resolution, ( index+1 )*resolution, color_a.r, color_b.r);
    //let g = this.map(value, index*resolution, ( index+1 )*resolution, color_a.g, color_b.g);
    //let b = this.map(value, index*resolution, ( index+1 )*resolution, color_a.b, color_b.b);
    let r = this.map(progress, 0, resolution, color_a.r, color_b.r);
    let g = this.map(progress, 0, resolution, color_a.g, color_b.g);
    let b = this.map(progress, 0, resolution, color_a.b, color_b.b);

    return rgb(r, g, b);
  }

  eachPixel(cb) {
    for(var y=0; y<this.height; y++) {
      for(var x=0; x<this.width; x++) {
        cb(x,y);
      }
    }
  }

  fill(color) {
    this.eachPixel((x, y) => {
      this.setPixel(x,y,color);
    });
  }

  clear() {
    this.fill(rgb(0,0,0));
  }

  setPixel(x, y, color) {
    if( x >= 0 && y >= 0 &&
        x < this.width && y < this.height ) {
      this.canvas[y][x] = color;
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
        let color = this.canvas[y][x];

        let brightness = this.config['brightness'] / 100;
        this.buffer[index+0] = color.r * brightness;
        this.buffer[index+1] = color.g * brightness;
        this.buffer[index+2] = color.b * brightness;
      }
    }

    return this.buffer;
  }

  config_map(value, min, max) {
    return this.map(value, 0, 100, min, max);
  }

  map(value, from_min, from_max, to_min, to_max) {
    return to_min + (to_max - to_min) * (value - from_min) / from_max;
  }
}

module.exports = AnimationBase;

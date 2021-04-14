import { Pixel } from '../pixel.js';

const FPS = 30;

export class AnimationBase {
  constructor(device) {
    this._led_count = device.geometry.led_count;
    this._geometry = device.geometry.name;
    this._interval = null;
    this._frame = [];
    this._count = 0;
    this._device = device;
    this._config = this.generateConfig();
    this.fps = FPS;

    this.clear();
    this.init();
  }

  init() {
    throw 'Implementation must include a "init" method';
  }

  configSchema() {
    return {};
  }

  serialize() {
    return {
      id: this.name,
      light_id: this.device.id,
      config: this.config,
    };
  }

  get config() {
    return this._config;
  }

  get name() {
    return this.constructor.name;
  }

  get device() {
    return this._device;
  }

  get led_count() {
    return this._led_count;
  }

  get geometry() {
    return this._geometry;
  }

  get frame_count() {
    return this._count;
  }

  setConfig(name, val) {
    if(name in this.config) {
      this._config[name] = val;
      return true;
    }

    return false;
  }

  generateConfig() {
    return Object.assign({
      brightness: 1
    }, this.configSchema());
  }

  start() {
    console.log(`Animation[${this.name}] -> Started for ${this.device.id}`);

    this._interval = setInterval(() => {
      this.tick();
      this._writeFrame();
      this._count++;
    }, 1000/this.fps);
  }

  stop() {
    console.log(`Animation[${this.name}] -> Stopped for ${this.device.id}`);

    if(this._interval) clearInterval(this._interval);
  }

  fill(pixel) {
    this._frame = [];

    for(let i=0; i<this.ledCount; i++) {
      this._frame.push(pixel.dup());
    }
  }

  clear() {
    this._frame = [];

    for(let i=0; i<this.ledCount; i++) {
      this._frame.push(new Pixel());
    }
  }

  _writeFrame() {
    this.device.sendFrame(this._render(this.frame));
  }

  get ledCount() {
    return this._led_count;
  }

  get frame() {
    return this._frame;
  }

  get count() {
    return this._count;
  }

  _render() {
    let frame_size = this.frame.length;
    let buffer_size = frame_size * 3 + 1;
    let buffer = Buffer.alloc(buffer_size, 0, 'binary');

    for(let y=0; y<frame_size; y++) {
      let index = y*3;
      let pixel = this.frame[y];

      // When sent over the wire we reserve "0" for
      // the start of a packet. In the firmware if a
      // color is set to "1" we turn off the light.
      let r = Math.floor(pixel.r * this.config.brightness);
      let g = Math.floor(pixel.g * this.config.brightness);
      let b = Math.floor(pixel.b * this.config.brightness);

      buffer[index+0] = r === 0 ? 1 : r;
      buffer[index+1] = g === 0 ? 1 : g;
      buffer[index+2] = b === 0 ? 1 : b;

      // process.stdout.write(`(${buffer[index+0]},${buffer[index+1]},${buffer[index+2]})`);
    }

    return buffer;
  }
}

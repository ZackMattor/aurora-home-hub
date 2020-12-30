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
    this.fps = FPS;

    this.clear();
    this.init();
  }

  init() {
    throw 'Implementation must include a "init" method';
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

  start() {
    this._interval = setInterval(() => {
      this.tick();
      this._writeFrame();
      this._count++;
    }, 1000/this.fps);
  }

  pause() {
    if(this._interval) clearInterval(this._interval);
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
    let buffer_size = frame_size * 3;
    let buffer = Buffer.alloc(buffer_size, 0, 'binary');

    for(let y=0; y<frame_size; y++) {
      let index = y*3;
      let pixel = this.frame[y];

      buffer[index+0] = pixel.r;
      buffer[index+1] = pixel.g;
      buffer[index+2] = pixel.b;
    }

    return buffer;
  }
}

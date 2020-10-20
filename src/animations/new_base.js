import { Pixel } from '../pixel';

const FPS = 30;

export class AnimationBase {
  constructor(sendMsg, led_count) {
    this._led_count = led_count;
    this._sendMsg = sendMsg;
    this._interval = null;
    this._frame = [];
    this._count = 0;

    this.clear();
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
    }, 1000/FPS);
  }

  pause() {
    if(this._interval) clearInterval(this._interval);
  }

  //stop() {
  //  
  //}

  _writeFrame() {
    this._sendMsg('ff', this._render(this.frame));
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

  _render(frame) {
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

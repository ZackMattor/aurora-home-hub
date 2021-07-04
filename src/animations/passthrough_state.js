import { AnimationBase } from './base.js';
import { Pixel } from '../pixel.js';

export class PassthroughState extends AnimationBase {
  init() {
    this.setConfig('pixel_state', [...(new Array(5))].map(_ => {
      return (new Pixel()).serialize();
    }));
  }

  static configSchema() {
    return {
      pixel_state: []
    };
  }

  tick() {
    for(let i=0; i < this.led_count; i++) {
      let rgb = this.config.pixel_state[i];
      if(!rgb) {
        rgb = { r: 0, g: 0, b: 0 };
      }

      this.frame[i].setRGB(rgb.r, rgb.g, rgb.b);
    }
  }
}

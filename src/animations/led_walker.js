// This animation is for a sphereoid
import { AnimationBase } from './base.js';
import { Pixel } from '../pixel.js';

export class LedWalker extends AnimationBase {
  init() {
    this.active_pixel = 0;
    this.fill((new Pixel()).setRGB(0,0,0));
  }

  tick() {
    if(this.frame_count % 10 !== 0) return;
    let i = 0;

    for(const pixel of this.frame) {
      if(this.active_pixel !== i) {
        pixel.setRGB(55, 55, 55);
      } else {
        pixel.random();
      }

      i++;
    }

    if(this.active_pixel === this.led_count-1) {
      this.active_pixel = 0;
    } else {
      this.active_pixel++;
    }
  }
}

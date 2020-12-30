// This animation is for a sphereoid
import { AnimationBase } from './base';
import { Pixel } from '../pixel';

export class LedWalker extends AnimationBase {
  init() {
    this.fps = 40;
    this.active_pixel = 0;
    this.fill((new Pixel()).setRGB(0,0,0));
  }

  tick() {
    if(this.frame_count % 10 != 0) return;
    console.log('tick');
    let i = 0;
    for(const pixel of this.frame) {
      if(this.active_pixel != i) {
        pixel.setRGB(0, 0, 0);
      } else {
        pixel.setRGB(0, 0, 255);
      }

      i++;
    }

    if(this.active_pixel == this.led_count-1) {
      this.active_pixel = 0;
    } else {
      this.active_pixel++;
    }
  }
}

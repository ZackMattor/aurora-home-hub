// This animation is for a sphereoid
import { AnimationBase } from './base.js';
import { Pixel } from '../pixel.js';

export class SurfaceWalker extends AnimationBase {
  init() {
    this.neighbors = this.device.geometry.neighbors();
    this.reset();
  }

  reset() {
    this.active_pixel = 0;
    this.fill((new Pixel()).setHSL(0.0, 1, 0.5));
  }

  tick() {
    let pixel = this.frame[this.active_pixel];

    this.frame[this.active_pixel].addHSL(0.02,0,0);

    let lightness = pixel.hsl[0];
    console.log(lightness);

    console.log(`${this.active_pixel} - ${lightness}`);
    if(lightness > 0.8) {
      if(this.active_pixel === this.led_count-1) {
        this.reset();
      } else {
        this.active_pixel++;
      }
    }
  }
}

import { AnimationBase } from './base.js';
import { Pixel } from '../pixel.js';

export class RawColor extends AnimationBase {
  static configSchema() {
    return {
      r: 1,
      g: 1,
      b: 1
    };
  }

  tick() {
    this.fill((new Pixel()).setRGB(this.config.r*255, this.config.g*255, this.config.b*255));
  }
}

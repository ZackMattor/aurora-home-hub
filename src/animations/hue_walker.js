import { AnimationBase } from './base.js';

export class HueWalker extends AnimationBase {
  init() {
    for(let pixel of this.frame) {
      pixel.random();
    }
  }

  static configSchema() {
    return {
      hue_velocity: 0.005
    };
  }

  tick() {
    for(let pixel of this.frame) {
      pixel.addHSL(this.config.hue_velocity, 0, 0);
    }
  }
}

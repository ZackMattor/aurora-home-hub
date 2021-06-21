// This animation is for a sphereoid
import { AnimationBase } from './base.js';

export class HueWalker extends AnimationBase {
  init() {
    for(let pixel of this.frame) {
      pixel.setHSL(Math.random(), 1, 0.5);
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

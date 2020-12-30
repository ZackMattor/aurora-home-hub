import { AnimationBase } from './base';
import { Pixel } from '../pixel';

//
// {
//    [geometry_name]: [color, color, color]
// }
//
let saved_state = {
  icosahedron: []
};


for(let i=0; i<20; i++) {
  // default to white
  saved_state.icosahedron.push(new Pixel(255,255,255));
}

export class PassthroughState extends AnimationBase {
  init() {
    this.fill((new Pixel()).setHSL(0.5, 1, 0.5));
  }

  tick() {
    let state = saved_state[this.geometry];

    for(let i=0; i<this.frame.length; i++) {
      let rgb = state[i];
      if(!rgb) {
        rgb = { r: 0, g: 0, b: 0 };
      }

      this.frame[i].setRGB(rgb.r, rgb.g, rgb.b);
    }
  }

  static setState(geometry, state) {
    saved_state[geometry] = state;
  }
}

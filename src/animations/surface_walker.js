// This animation is for a sphereoid
import { AnimationBase } from './new_base';
import { Pixel } from '../pixel';
import { Icosahedron } from '../geometry/icosahedron';

export class SurfaceWalker extends AnimationBase {
  constructor(sendMsg) {
    super(sendMsg, 20);

    this.active_pixel = 1;
    this.fill((new Pixel()).setHSL(0.5, 1,0.5));
  }

  tick() {
    let pixel = Math.floor(this.count/30)
    for(let pixel of this.frame) {
      pixel.addHSL(0.001,0,0);
    }
  }
}

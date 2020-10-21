import { LedWalker } from './animations/led_walker';
import { SurfaceWalker } from './animations/surface_walker';
import { HueWalker } from './animations/hue_walker';

export const Animations = {
  icosahedron: [
    HueWalker,
    SurfaceWalker,
    LedWalker,
  ],

  grid: [
    HueWalker
  ],

  strip: [
    HueWalker
  ]
}

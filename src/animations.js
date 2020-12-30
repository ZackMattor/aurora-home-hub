import { LedWalker } from './animations/led_walker';
import { SurfaceWalker } from './animations/surface_walker';
import { HueWalker } from './animations/hue_walker';
import { PassthroughState } from './animations/passthrough_state';

export const Animations = {
  icosahedron: [
    PassthroughState,
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
};

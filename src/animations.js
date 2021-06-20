import { LedWalker } from './animations/led_walker.js';
import { RawColor } from './animations/raw_color.js';
import { SurfaceWalker } from './animations/surface_walker.js';
import { HueWalker } from './animations/hue_walker.js';
import { PassthroughState } from './animations/passthrough_state.js';

export const Animations = {
  serialize() {
    return Object.values(this.items).map((i) => {
      return {
        id: i.name,
        config: i.configSchema()
      }
    });
  },

  find(id) {
    return this.items[id];
  },

  items: {
    HueWalker,
    SurfaceWalker,
    LedWalker,
    PassthroughState,
    RawColor,
  }
};

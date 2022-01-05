import { AnimationBase } from './base.js';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export class ColorBurst extends AnimationBase {
  init() {
    this.bursts = [];

    for(let i = 0; i<this.frame.length; i++) {
      this.setBurst(i, 1);
    }
  }

  static configSchema() {
    return {
      manual_control: true,
      burst_threshold: 0.3,
      decay: 0.999,
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
    };
  }

  setBurst(index, value) {
    let burst = this.bursts.find(b => b.index === index);

    if(burst && burst.value < value) {
      burst.value = value;

    } else {
      this.bursts.push({
        index: index,
        value: value
      });
    }

    this.frame[index].setRGB(255*value, 255*value, 255*value);
  }

  tick() {
    if(this.config.manual_control) {
      for(let i=0; i<this.frame.length; i++) {
        if(this.config[i]) {
          console.log('set burst', i, this.config[i]);
          this.setBurst(i, this.config[i]);
        }
      }

    } else {
      if(Math.random() < this.config.burst_threshold) {
        this.setBurst(getRandomInt(this.frame.length), Math.random());
      }
    }

    let i = 0;
    for(let pixel of this.frame) {
      let burst = this.bursts.find(b => b.index === i);

      if(burst) {
        const v = 255*burst.value;
        pixel.setRGB(v,v,v);

        // Decay the bust
        burst.value *= this.config.decay;
      } else {
        pixel.setRGB(0,0,0);
      }

      i++;
    }
  }
}

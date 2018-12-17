const Base = require('./base.js');
const rgb = require('../color.js').rgb;

class ColorLadder extends Base {
  init() {
    console.log('ColorWalker -> start');

    // Override some internal config variables
    this.interval = 125;
    this.brightness = 0.25;

    this.tail = 10;
    this.entities = [
      this.entity(0,0,rgb(255,0,0),1,true),
      this.entity(19,0,rgb(255,0,0),-1,true),
      this.entity(0,1,rgb(255,255,0),1,true),
      this.entity(19,1,rgb(255,255,0),-1,true),
      this.entity(0,2,rgb(0,255,0),1,true),
      this.entity(19,2,rgb(0,255,0),-1,true),
      this.entity(0,3,rgb(0,255,255),1,true),
      this.entity(19,3,rgb(0,255,255),-1,true),
      this.entity(0,4,rgb(0,0,255),1,true),
      this.entity(19,4,rgb(0,0,255),-1,true)
    ];

    //this.fill(rgb(255,255,0));
  }

  entity(x, y, color, vx, goes_up) {
    return { x:x, y:y, color:color, vx:vx, goes_up:goes_up };
  }

  frame() {
    this.fill(rgb(0,0,0));

    for(let i=0; i<this.entities.length; i++) {
      let entity = this.entities[i];

      let fx = entity.x + entity.vx;

      if(fx < 0 || fx >= this.width) {
        entity.y += entity.goes_up ? 1 : -1;
        entity.y = entity.y < 0 ? this.height-1 : entity.y;
        entity.vx *= -1;
      }

      entity.x += entity.vx;

      this.setPixel(entity.x, entity.y%this.height, entity.color);
    }
  }
}

module.exports = ColorLadder;

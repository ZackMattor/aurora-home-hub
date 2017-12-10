class Pixel {
  constructor(r,g,b,w) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;

    this.$element = $('<div>').addClass('pixel');

    this.$element.mouseover(this.onSelect.bind(this));
    this.animation_interval = null;
    this.render();
  }

  onSelect() {
    this.r = 255;
    this.g = 127;
    this.b = 80;

    this.render();

    this.startAnimation('fadeAnimation');
  }

  startAnimation(animation_name) {
    if(this.animation_interval) clearInterval(this.animation_interval);
    this.animation_interval = setInterval(this[`${animation_name}Tick`].bind(this), 10);
  }

  fadeAnimationTick() {
    // Debug message so we can make sure
    // we dont have an animation interval leak
    // console.log('Animation Tick');

    let color_degrade = (color) => {
      if(this[color] <= 0) {
        this[color] = 0;
      } else {
        this[color] -= 2;
      }
    }

    color_degrade('r');
    color_degrade('g');
    color_degrade('b');

    if(this.r == 0 && this.g == 0 && this.b == 0) {
      if(this.animation_interval) clearInterval(this.animation_interval);
    }

    this.render();
  }


  colorString() {
    let message;

    let r = this.r;
    let g = this.g;
    let b = this.b;

    return `rgb(${r},${g},${b})`
  }

  render() {
    this.$element.css({
      "background-color": this.colorString()
    });
  }

  getElement() {
    return this.$element;
  }

  serialize() {
    return new Uint8Array([ this.r,this.g,this.b ]);
  }
}

export default Pixel;

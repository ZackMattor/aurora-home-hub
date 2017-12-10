class Pixel {
  constructor(r,g,b,w) {
    this.r = r || 0;
    this.g = g || 0;
    this.b = b || 0;

    this.$element = $('<div>').addClass('pixel');

    this.$element.mouseover(this.onSelect.bind(this));
    this.fade_interval = null;
    this.render();
  }

  onSelect() {
    this.r = 250;
    this.g = 0;
    this.b = 250;
    if(this.fade_interval) clearInterval(this.fade_interval);

    this.render();
    this.fade_interval = setInterval(this.animationTick.bind(this), 10);
  }

  animationTick() {
    let color_degrade = (color) => {
      if(this[color] <= 0) {
        this[color] = 0;
      } else {
        console.log('fade');
        this[color] -= 2;
      }
    }

    color_degrade('r');
    color_degrade('g');
    color_degrade('b');

    if(this.r == 0 && this.g == 0 && this.b == 0) {
      if(this.fade_interval) clearInterval(this.fade_interval);
    }

    this.render();
  }


  colorString() {
    let message;

    let r = this.r;
    let g = this.g;
    let b = this.b;
    let a = Math.max(this.r, this.g, this.b)/255;

    return `rgba(${r},${g},${b}, ${a})`
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

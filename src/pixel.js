export function rgb(r,g,b) {
  if(r < 0) r = 0;
  if(g < 0) g = 0;
  if(b < 0) b = 0;
  if(r > 255) r = 255;
  if(g > 255) g = 255;
  if(b > 255) b = 255;

  return {
    r: r,
    g: g,
    b: b
  };
}

export function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if(max == min){
    h = s = 0; // achromatic
  }else{
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

export function hslToRgb(h, s, l){
  var r, g, b;

  if(s == 0){
    r = g = b = l; // achromatic
  }else{
    var hue2rgb = function hue2rgb(p, q, t){
      if(t < 0) t += 1;
      if(t > 1) t -= 1;
      if(t < 1/6) return p + (q - p) * 6 * t;
      if(t < 1/2) return q;
      if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}



export class Pixel {
  constructor(r=0,g=0,b=0) {
    this._r = r;
    this._g = g;
    this._b = b;
  }

  dup() {
    return new Pixel(this.r, this.g, this.b);
  }

  setRGB(r, g, b) {
    this._r = r;
    this._g = g;
    this._b = b;

    return this;
  }

  setHSL(h,s,l) {
    let res = hslToRgb(h,s,l);

    this._r = res[0];
    this._g = res[1];
    this._b = res[2];

    return this;
  }

  addHSL(addH,addS,addL) {
    console.log(this.hsl);
    let [h,s,l] = this.hsl;

    this.setHSL(h + addH, s + addS, l + addL);

    return this;
  }

  get hsl() {
    return rgbToHsl(this._r, this._g, this._b);
  }

  get r() {
    return this._r;
  }

  get g() {
    return this._g;
  }

  get b() {
    return this._b;
  }
}

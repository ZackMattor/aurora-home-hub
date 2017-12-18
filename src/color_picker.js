import {rgb, rgb_to_s} from './color.js';

class ColorPicker {
  constructor(element_id) {
    this.color_options = [];
    this.color_options.push(rgb(200, 0, 0));
    this.color_options.push(rgb(200, 100, 0));
    this.color_options.push(rgb(200, 200, 0));
    this.color_options.push(rgb(100, 200, 0));
    this.color_options.push(rgb(0, 200, 0));
    this.color_options.push(rgb(0, 200, 200));
    this.color_options.push(rgb(0, 0, 200));
    this.color_options.push(rgb(200, 0, 200));

    this.selected_color = this.color_options[3];

    // Construct our element
    this.$element = $('<div>').addClass('color-picker');

    this.color_options.forEach((color) => {
      let $color_picker = $('<div>').addClass('color-option').css(
        'background-color', rgb_to_s(color)
      ).data({
        'r': color.r,
        'g': color.g,
        'b': color.b
      }).on('click', this.onSelect.bind(this));

      this.$element.prepend($color_picker);
    });
  }

  onSelect(evt) {
    this.$element.find('.color-option').removeClass('active');
    $(evt.currentTarget).addClass('active');

    let data = $(evt.currentTarget).data();

    this.selected_color = {
      r: data.r,
      g: data.g,
      b: data.b
    };
  }

  getColor() {
    return this.selected_color;
  }

  getElement() {
    return this.$element;
  }
};

export default ColorPicker;

import Pixel from './pixel.js';
import mqtt from 'mqtt';

function concatTypedArrays(a, b) {
  var c = new (a.constructor)(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

var connection = new WebSocket('ws://127.0.0.1:1337');
connection.binaryType = "arraybuffer";

class Editor {
  constructor(element_id) {
    this.$element = $(element_id);
    this.shelf_count = 5;
    this.row_count = 20;

    this.pixels = [];

    for(let shelf_id = 0; shelf_id < this.shelf_count; shelf_id++) {
      this.pixels[shelf_id] = [];

      for(let pixel_id = 0; pixel_id < this.row_count; pixel_id++) {
        this.pixels[shelf_id][pixel_id] = new Pixel();
        this.pixels[shelf_id][pixel_id].getElement().bind("touchmove", (evt) => {
          var touch = evt.originalEvent.touches[0];
          this.highlightHoveredObject(touch.clientX, touch.clientY);
        });
      }
    }

    this.render();

    setInterval(this.serialize.bind(this), 10);
  }

  highlightHoveredObject(x, y) {
    for(let shelf_id = 0; shelf_id < this.shelf_count; shelf_id++) {
      for(let pixel_id = 0; pixel_id < this.row_count; pixel_id++) {
        let pixel = this.pixels[shelf_id][pixel_id];

        if(!pixel) continue;
        let $pixel = pixel.getElement();

        if (!(
          x <= $pixel.offset().left || x >= $pixel.offset().left + $pixel.outerWidth() ||
          y <= $pixel.offset().top  || y >= $pixel.offset().top + $pixel.outerHeight()
        )) {
          pixel.onSelect.call(pixel);
        }
      }
    }
  }

  render() {
    let $editor = $('<div>').addClass('editor');
    let $shelf = $('<div>').addClass('shelf');

    this.pixels.forEach((shelf) => {
      let $new_shelf = $shelf.clone();

      shelf.forEach((pixel) => {
        $new_shelf.append(pixel.getElement());
      });

      $editor.prepend($new_shelf);
    });

    this.$element.append($editor);
  }

  serialize() {
    let packet = new Uint8Array();

    this.pixels.forEach((shelf) => {
      shelf.forEach((pixel) => {
        packet = concatTypedArrays(packet, pixel.serialize());
      });
    });

    connection.send(packet);
    //this.client.publish("client_ff", packet);
  }
}

export default Editor;

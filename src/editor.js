import Pixel from './pixel.js';
import mqtt from 'mqtt';

function concatTypedArrays(a, b) {
  var c = new (a.constructor)(a.length + b.length);
  c.set(a, 0);
  c.set(b, a.length);
  return c;
}

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
      }
    }

    // Setup MQTT
    this.client = mqtt.connect("ws://mqtt.zackmattor.com:1884");
    this.client.subscribe("mqtt/demo");

    this.client.on("message", function (topic, payload) {
      console.log([topic, payload].join(": "));
    });

    this.render();

    setInterval(this.serialize.bind(this), 1000/20);
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

    this.client.publish("ff", packet);
  }
}

export default Editor;

<template>
  <div class="editor">
    <h1>Editor</h1>

    <shelf v-if="connected" v-for="(shelf, shelf_id) in shelves" @pixel_selected="pixel_selected" :shelf_id="shelf_id" :shelf="shelf"></shelf>
  </div>
</template>

<script>
import Shelf from './shelf'
import Pixel from '../lib/pixel.js'
import mqtt from 'mqtt'

export default {
  name: 'editor',

  mounted() {
    var client  = mqtt.connect('ws://mqtt.zackmattor.com:1884');


    this.shelves = [];
    for(let x=0; x<5; x++) {
      this.shelves[x] = [];

      for(let y=0; y<20; y++) {
        this.shelves[x][y] = new Pixel();
      }
    }

    this.connected = false;
    client.on('connect', () => {
      this.connected = true;
    });

    client.on('message', (topic, message) => {
      console.log(message.toString());
      client.end();
    });
  },

  methods: {
    pixel_selected(obj) {
      console.log(obj);
      this.shelves[obj.shelf_id][obj.pixel_id].r = 9;
      this.shelves[obj.shelf_id][obj.pixel_id].g = 9;
      this.shelves[obj.shelf_id][obj.pixel_id].b = 9;
    }
  },

  components: {
    shelf: Shelf
  },

  data() {
    return {
      connected: false,
      shelves: null
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

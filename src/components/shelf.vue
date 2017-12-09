<template>
  <div class="slelf">
    <div class="pixel" :style="bg_color(pixel)" @click="pixel_clicked(pixel_id)" v-for="( pixel, pixel_id ) in shelf"></div>
  </div>
</template>

<script>
export default {
  name: 'shelf',
  props: ['shelf', 'shelf_id'],

  methods: {
    pixel_clicked(pixel_id) {
      this.$emit('pixel_selected', {shelf_id: this.shelf_id, pixel_id: pixel_id});
    },

    bg_color(pixel) {
      return `background-color: rgb(${pixel.r},${pixel.g},${pixel.b});`;
    }
  }
}
</script>

<style scoped>
  .pixel {
    display: inline-block;
    cursor: pointer;
    width: 15px;
    height: 15px;
    background-color: #ccc;
  }

  .pixel:hover {
    background-color: blue;
  }
</style>

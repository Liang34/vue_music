<template>
  <div>
    <slider></slider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Slider from '../../components/Slider.vue'
export default defineComponent({
  setup() {
    return {}
  },
  components: {
    Slider
  }
})
</script>

<style lang="scss" scoped></style>

<template>
  <div id="app">
    <header-guide />
    <router-view />
  </div>
</template>

<script>
import HeaderGuide from '@/components/HeaderGuide'
export default {
  components: {
    HeaderGuide
  }
}
</script>

<style lang="scss" scope>
#app {
  width: 100%;
  height: 100%;
  background-color: #fcfcfc;
}
</style>

<template>
  <div id="app">
    <header-guide />
    <tab />
  </div>
  <!-- <router-view /> -->
</template>
<script>
import HeaderGuide from 'components/HeaderGuide'
import Tab from 'components/Tab'
export default {
  components: {
    HeaderGuide,
    Tab
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

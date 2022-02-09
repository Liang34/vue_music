<template>
  <div id="app">
    <header-guide />
    <tab />
    <keep-alive>
      <router-view />
    </keep-alive>
    <play />
  </div>
</template>

<script>
import HeaderGuide from '@/components/HeaderGuide'
import Tab from '@/components/Tab'
import Play from '@/views/play/play'
export default {
  components: {
    HeaderGuide,
    Tab,
    Play
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

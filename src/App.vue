<template>
  <div id="app">
    <HeaderGuide></HeaderGuide>
    <Tab></Tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Play></Play>
  </div>
</template>

<script>
import HeaderGuide from 'components/HeaderGuide'
import Tab from 'components/Tab'
import Play from 'views/Play/Play'

export default {
  components: {
    HeaderGuide,
    Tab,
    Play
  }
}
</script>
<style lang="less" scope>
#app {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>

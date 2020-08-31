<template>
  <div id="app">
    <HeaderGuide></HeaderGuide>
    <Tab></Tab>
    <router-view></router-view>
  </div>
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
<style lang="less" scope>
#app {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>

<template>
  <div id="nav">
    <HeaderGuide />
  </div>
  <router-view/>
</template>

<script>
import HeaderGuide from '@/components/HeaderGuide'
export default {
  component: {
    HeaderGuide
  }
}
</script>

<style>
</style>

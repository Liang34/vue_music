<template>
  <div id="app">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<style lang="scss" scope>
#app {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>

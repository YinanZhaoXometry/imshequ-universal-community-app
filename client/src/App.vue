<template>
  <div id="app">
    <my-header />
    <router-view></router-view>
    <my-footer />
  </div>
</template>

<script>
import MyHeader from '@/components/Header'
import MyFooter from '@/components/Footer'
export default {
  name: 'app',
  components: {
    MyHeader,
    MyFooter
  }
}
</script>

<style lang="less">
@import './assets/less/index.less';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

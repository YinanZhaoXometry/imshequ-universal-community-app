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
</style>

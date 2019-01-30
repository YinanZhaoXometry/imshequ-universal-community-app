<template>
  <div>
    <my-header />
    <router-view></router-view>
    <my-footer />
  </div>
</template>
<script>
import MyHeader from '@/components/Header'
import MyFooter from '@/components/Footer'
export default {
  components: {
    MyHeader,
    MyFooter
  }
}
</script>
<style>
</style>

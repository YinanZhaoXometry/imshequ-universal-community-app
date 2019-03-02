<template>
  <div class="body-container clearfix">
    <div class="banner-container">
      <div class="banner-background"></div>
      <div class="banner-text">
        <h1>i'm 社区</h1>
        <h3>一个快速社区生成模板</h3>
      </div>
    </div>
    <section class="content-container">
      <div class="left-container">
        <el-carousel :interval="5000" arrow="hover">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <div>
          <ul class="nav-tabs clearfix">
            <li v-if="isAuthenticated"><router-link to="/myfeed">我的订阅</router-link></li>
            <li><router-link to="/">全部</router-link></li>
          </ul>
        </div>
        <router-view></router-view>
      </div>
      <div class="right-container">
        <div v-if="isAuthenticated">
          <h4>用户信息</h4>
        </div>
        <div>
          <h4>热门文章</h4>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isAuthenticated: true
    }
  },
}
</script>

<style>



</style>
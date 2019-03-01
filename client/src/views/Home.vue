<template>
  <div class="clearfix">
    <div class="banner-container">
      <div class="banner-background"></div>
      <div class="banner-text">
        <h1>i'm 社区</h1>
        <h3>一个快速社区生成模板</h3>
      </div>
    </div>
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
a {
  text-decoration: none;
}
.nav-tabs li {
  display: block;
  padding: 0 20px;
  line-height: 40px;
  height: 40px;
  float:left;
  list-style: none;
}
.clearfix:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
}
</style>
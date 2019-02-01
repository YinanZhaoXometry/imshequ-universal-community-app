<template>
  <nav class="clearfix">
    <router-link class="site-logo" to="/">i‘m 社区 {{isAuthenticated}}</router-link>
    <ul class="nav">
      <template v-if="isAuthenticated">
         <li><router-link to="/" @click.prevent.native="logout">退出登录</router-link> </li>
        <li><router-link to="/user">用户名</router-link> </li>
        <li><router-link to="/settings">设置</router-link> </li>
        <li><router-link to="/write">写文章</router-link> </li>
      </template>
      <template v-else>
        <li><router-link to="/">首页</router-link> </li>
        <li><router-link to="/login">登陆</router-link></li>
        <li><router-link to="/register">注册</router-link></li>
      </template>
     
    </ul>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    logout () {
      this.$store.commit('CLEAR_AUTH')
      this.$router.push('/')
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
.site-logo {
  display: block;
  padding: 0 20px;
  line-height: 40px;
  height: 40px;
  float:left;
}
.nav li {
  display: block;
  padding: 0 20px;
  line-height: 40px;
  height: 40px;
  float:right;
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
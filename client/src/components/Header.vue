<template>
  <nav class="clearfix">
    <router-link class="site-logo" to="/">i‘m 社区</router-link>
    <ul class="nav">
      <template v-if="isAuthenticated">
         <li @click="signout">退出登录</li>
        <li><router-link :to="`/u/${currentUser.id}`">{{ currentUser.username }}</router-link> </li>
        <li><router-link to="/settings">设置</router-link> </li>
        <li><router-link to="/write">写文章</router-link> </li>
        <li><router-link to="/">首页</router-link> </li>
      </template>
      <template v-else>
        <li><router-link to="/">首页</router-link> </li>
        <li><router-link to="/signin">登陆</router-link></li>
        <li><router-link to="/signup">注册</router-link></li>
      </template>
     
    </ul>
  </nav>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isAuthenticated']),
    ...mapState({
      currentUser: state => state.auth.authInfo
    })
  },
  methods: {
    signout () {
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
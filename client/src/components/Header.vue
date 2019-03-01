<template>
  <nav class="clearfix header-container">
    <ul class="nav-btns">
      <li class="site-logo"><router-link to="/">i‘m社区</router-link></li>
      <template v-if="isAuthenticated">
        <li @click="signout">退出登录</li>
        <li><router-link :to="`/u/${currentUser.id}`">{{ currentUser.username }}</router-link> </li>
        <li><router-link to="/settings">设置</router-link> </li>
        <li><router-link to="/write">写文章</router-link> </li>
        <li><router-link to="/">首页</router-link> </li>
      </template>
      <template v-else>
        <li><router-link to="/signin">登陆</router-link></li>
        <li><router-link to="/signup">注册</router-link></li>
        <li><router-link to="/">首页</router-link> </li>
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
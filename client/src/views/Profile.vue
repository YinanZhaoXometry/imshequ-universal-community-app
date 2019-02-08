<template>
  <div>
    <!-- 用户信息展示区域 -->
    <div>
      <img :src="profile.image" alt="user avatar" style="width:100px;border-radius:50px;">
      <h4>{{ profile.username }}</h4>
      <p>{{ profile.bio }}</p>
      <div v-if="!isCurrentUser">
        <button @click="unfollow" v-if="profile.following">Unfollow {{ profile.username }}</button>
        <button @click="follow" v-else>Follow {{ profile.username }}</button>
      </div>
    </div>
    <!-- 导航标签区域 -->
    <div>
      <ul class="user-tabs clearfix">
        <li><router-link :to="{name: 'user-articles'}">我的文章</router-link></li>
        <li><router-link :to="{name: 'user-favorites'}">我的收藏</router-link></li>
      </ul>
    </div>
    <!-- 文章列表区域 -->
    <router-view></router-view>
  </div>  
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'User',
  computed: {
    ...mapState({
      profile: state => state.profile.profile,
      currentUser: state => state.auth.authUser
    }),
    ...mapGetters(['isAuthenticated']),
    isCurrentUser () {
      if (this.currentUser.username) {
        return this.currentUser.username === this.profile.username
      }
      return false
    }
  },
  methods: {
    follow () {
      if (!this.isAuthenticated) return 
      this.$store.dispatch('FETCH_PROFILE_FOLLOW', this.$route.params)
    },
    unfollow () {
      this.$store.dispatch('FETCH_PROFILE_UNFOLLOW', this.$route.params)
    }
  },
  watch: {
    $route (to) {
      console.log(to)
    }
  },
  created () {
    this.$store.dispatch('FETCH_PROFILE', this.$route.params)
  },

}
</script>

<style>
.user-tabs li {
  display: block;
  padding: 0 20px;
  line-height: 40px;
  height: 40px;
  float:left;
  list-style: none;
}
</style>
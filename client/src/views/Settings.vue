<template>
  <div>
    <form @submit.prevent="updateSettings">
      <fieldset>
        <input type="text" placeholder="头像图片URL" v-model="updatedUser.avatar"><br>
        <input type="text" placeholder="用户名" v-model="updatedUser.username"><br>
        <input type="text" placeholder="用户介绍" v-model="updatedUser.signature"><br>
        <input type="text" placeholder="邮箱" v-model="updatedUser.email"><br>
        <input type="text" placeholder="新密码" v-model="updatedUser.password"><br>
        <button type="submit">更新设置</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Settings',
  data () {
    let { username, email, avatar, signature} = this.$store.state.profile.profile
    return {
      updatedUser: {
        username,
        signature,
        email,
        avatar,
        password: ''
      }
    }
  },
  computed: {
    userId () {
      return this.$store.state.auth.authUser.id
    }
  },
  async beforeRouteEnter (to, from, next) {
    let id = store.state.auth.authUser.id
    await store.dispatch('FETCH_PROFILE', {id})
    next()
  },
  methods: {
    updateSettings () {
      let payload = {userId: this.userId, updatedUser: this.updatedUser}
      this.$store.dispatch('UPDATE_PROFILE', payload).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>

</style>

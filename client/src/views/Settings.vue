<template>
  <div>
    <form @submit.prevent="updateSettings">
      <fieldset>
        <input type="text" placeholder="头像图片URL" v-model="updatedUser.image"><br>
        <input type="text" placeholder="用户名" v-model="updatedUser.username"><br>
        <input type="text" placeholder="用户介绍" v-model="updatedUser.bio"><br>
        <input type="text" placeholder="邮箱" v-model="updatedUser.email"><br>
        <input type="text" placeholder="新密码" v-model="updatedUser.password"><br>
        <button type="submit">更新设置</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Settings',
  computed: {
    ...mapState({
      currentUser: state => state.auth.user
    })
  },
  data () {
    return {
      updatedUser: {}
    }
  },
  watch: {
    currentUser (newValue) {
      this.updatedUser = newValue
    }
  },
  methods: {
    updateSettings () {
      this.$store.dispatch('UPDATE_USER', this.updatedUser).then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>

</style>

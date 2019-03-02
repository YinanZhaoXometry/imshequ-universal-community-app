<template>
  <div class="sign-container">
    <div class="sign-background">
      <div class="flex-container">
        <el-card class="sign-card">
          <h1 class="sign-title">登陆</h1>
          <ul>
            <li v-for="(error,key) in errors" :key="key">
              {{error}}
            </li>
          </ul>
          <form>
            <el-input class="signin-input" placeholder="请输入邮箱" v-model="email" />
            <el-input class="signin-input" placeholder="请输入密码" v-model="password" />
            <el-button type="primary" class="btn-main" @click="onSubmit(email, password)">登陆</el-button>
          </form>
          <span>没有账号？</span>
          <router-link to="/signup">
            <el-button type="text" class="btn-text">去注册</el-button>
          </router-link>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    checkCredentials () {
      let errors = []
      if (!this.email.trim()) errors.push('邮箱不能为空')
      if (!this.password.trim()) errors.push('密码不能为空')
      return errors
    },
    onSubmit (email, password) {
      let errors = this.checkCredentials()
      if (errors.length !== 0) return this.$store.commit('SET_ERROR', errors)
      this.$store
        .dispatch('SIGNIN', { email, password })
        .then(() => this.$router.push('/'))
    }
  }
  
}
</script>

<style>

</style>
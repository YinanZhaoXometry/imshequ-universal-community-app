<template>
  <div class="sign-container">
    <div class="sign-background">
      <div class="flex-container">
        <el-card class="sign-card">
          <h1 class="sign-title">注册</h1>
          <ul>
            <li v-for="(error,key) in errors" :key="key">
              {{error}}
            </li>
          </ul>
          <form>
            <el-input placeholder="请输入邮箱" v-model="email" class="signup-input" />
            <el-input placeholder="请输入用户名" v-model="username" class="signup-input" />
            <el-input placeholder="请输入密码" v-model="password" class="signup-input" />
            <el-input placeholder="请再次输入密码" v-model="passwordRepeat" class="signup-input" />
            <el-button type="primary" @click="onSubmit" class="btn-main">注册</el-button>
          </form>
          <span>已有账号？</span>
          <router-link to="/signin">
            <el-button type="text" class="btn-text">去登陆</el-button>
          </router-link>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Signup',
  data () {
    return {
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      regExps: {
        email: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
      }
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
      if (!this.email.trim()) { errors.push('邮箱不能为空') } else {
        if (!this.regExps.email.test(this.email.trim())) 
          errors.push('邮箱不合法')
      }
      if (!this.username.trim()) 
        errors.push('用户名不能为空')
      if (!this.password.trim()) { errors.push('密码不能为空') } else {
        if (this.password.trim().length < 6) 
          errors.push('密码不能少于6位')
        if (!this.passwordRepeat.trim()) 
          errors.push('验证密码不能为空')
        if (this.password !== this.passwordRepeat) {
          errors.push('两次输入的密码不一致，请重新输入')
          this.password = ''
          this.passwordRepeat = ''
        }
      }
      return errors
    },
    onSubmit () {
      let errors = this.checkCredentials()
      if (errors.length !== 0) return this.$store.commit('SET_ERROR', errors)
      this.$store.dispatch('SIGNUP', {
        username: this.username,
        email: this.email,
        password: this.password
      })
      .then(() => this.$router.push('/'))
    }
  }

}
</script>

<style>

</style>
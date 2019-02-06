<template>
  <div>
    <h1>登陆</h1>
    <p><router-link to="/registeer">需要注册？</router-link></p>
    <ul>
      <li v-for="(error,key) in errors" :key="key">
        {{error}}
      </li>
    </ul>
    <form @submit.prevent="onSubmit(email, password)">
        <fieldset>
          <input type="text" placeholder="请输入邮箱" v-model="email">
        </fieldset>
        <fieldset>
          <input type="text" placeholder="请输入密码" v-model="password">
        </fieldset>
        <button type="submit">登陆</button>
    </form>
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
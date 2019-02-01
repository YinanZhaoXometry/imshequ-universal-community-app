<template>
  <div>
    <h1>注册</h1>
    <p><router-link to="/registeer">需要登陆？</router-link></p>
    <ul>
      <li v-for="(error,key) in errors" :key="key">
        {{key}} {{error}}
      </li>
    </ul>
    <form @submit.prevent="onSubmit">
        <fieldset>
          <input type="text" placeholder="请输入用户名" v-model="username">
        </fieldset>
        <fieldset>
          <input type="text" placeholder="请输入邮箱" v-model="email">
        </fieldset>
        <fieldset>
          <input type="text" placeholder="请输入密码" v-model="password">
        </fieldset>
        <button type="submit">注册</button>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      username: '',
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
    onSubmit () {
      this.$store.dispatch('REGISTER', {
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
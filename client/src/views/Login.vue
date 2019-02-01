<template>
  <div>
    <h1>登陆</h1>
    <p><router-link to="/registeer">需要注册？</router-link></p>
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
export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit (email, password) {
      this.$store
        .dispatch('LOGIN', { email, password })
        .then(() => this.$router.push('/'))
    }
  },
  computed: {

  }
  
}
</script>

<style>

</style>
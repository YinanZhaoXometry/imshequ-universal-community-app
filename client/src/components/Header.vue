<template>
  <nav class="clearfix">
    <router-link class="site-logo" to="/">i‘m 社区</router-link>
    <ul class="nav">
      <li><router-link to="/">首页</router-link> </li>
      <li><router-link to="/login">登陆</router-link></li>
      <li><router-link to="/register">注册</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
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
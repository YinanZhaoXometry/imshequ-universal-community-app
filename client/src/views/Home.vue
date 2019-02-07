<template>
  <div>
    <div>
      <h1>i'm 社区</h1>
      <p>一个快速社区生成模板</p>
    </div>
    <div>
      <div>
        <ul class="nav-tabs clearfix">
          <li v-if="isAuthenticated"><router-link to="/myfeed">我的订阅</router-link></li>
          <li><router-link to="/">全部</router-link></li>
          <!-- <li><router-link to="/nodejs">nodejs</router-link></li>
          <li><router-link to="/vue">Vue</router-link></li>
          <li><router-link to="/react">React</router-link></li>
          <li><router-link to="/questions">问答</router-link></li>
          <li><router-link to="/jobs">招聘</router-link></li> -->
        </ul>
      </div>
      <router-view></router-view>
    </div>
    <br>
    <div v-if="isAuthenticated">
      <h4>用户信息</h4>
    </div>
    <div>
      <h4>热门文章</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isAuthenticated: true
    }
  },
}
</script>

<style>
a {
  text-decoration: none;
}
.nav-tabs li {
  display: block;
  padding: 0 20px;
  line-height: 40px;
  height: 40px;
  float:left;
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
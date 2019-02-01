<template>
  <div>
    <!-- 标题区域 -->
    <div>
      <h1>{{ article.title }}</h1>
    </div>
    <!-- 文章正文区域 -->
    <div>
      <div v-html="article.body" />
      <ul>
        <li v-for="(tag, index) in article.tagList" :key="tag + index">{{ tag }}</li>
      </ul>
    </div>
    <!-- 评论区域 -->
    <div>
      <form @submit.prevent="onSubmitComment" v-if="isAuthenticated">
        <textarea cols="30" rows="6"></textarea>
        <button type="submit">发送</button>
      </form>
      <p v-else>
        添加评论需先 
        <router-link to="/login">登陆</router-link> 
        或
        <router-link to="/register">注册</router-link> 
      </p>
      <div v-for="(comment, index) in comments" :key="index">{{ comment }}</div>
    </div>
  </div>  
</template>

<script>
import store from '@/store'
import { mapState, mapGetters } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch('ARTICLE_FETCH', { articleSlug: to.params.slug }),
      store.dispatch('COMMENTS_FETCH', to.params.slug)
    ]).then(() => next())
  },
  computed: {
    ...mapState({
      article: state => state.article.article,
      comments: state => state.article.comments
    }),
    ...mapGetters(['isAuthenticated'])
  }
}
</script>

<style>

</style>
<template>
  <div>
    <!-- 作者信息 -->
    <div>
      <div>
        <img :src="article.author.image" alt="author avatar">
        <router-link 
          :to="{name: 'user-articles', params: {username: article.author.username}}"
        >
          {{ article.author.username }}
        </router-link>
        <br>
        <span>{{ article.createdAt }}</span>
      </div>
    </div>
    <!-- 文章标题和简介 -->
    <router-link :to="`/article/${article.slug}`">
      <h1>{{ article.title }}</h1>
      <p>{{ article.description }}</p>
      <span>Read more...</span>
      <!-- tag -->
    </router-link>
  </div>  
</template>

<script>
export default {
  props: {
    article: { type: Object, required: true }
  }
}
</script>

<style></style>
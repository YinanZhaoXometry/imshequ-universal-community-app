<template>
  <li class="article-card-container">
    <!-- 文章元信息 -->
    <div class="article-meta">
      <img 
        class="user-avatar"
        :src="article.author.image || '/avatar_unknow_user_45.png'" 
        alt="author avatar"
      />
      <div class="user-info">
        <router-link 
          class="user-name"
          :to="{name: 'user-articles', params: {id: article.author._id}}"
        >
          {{ article.author.username }}
        </router-link>
        <span class="date">{{ distanceInWordsToNow(article.createdAt, {locale: cn, addSuffix: true}) }}</span>
      </div>
    </div>
    <!-- 文章标题和简介 -->
    <router-link class="article-cover" :to="`/a/${article._id}`">
      <img src="placeholder-img.png" alt="article cover">
    </router-link>
    <div class="article-content">
      <h1 class="article-title">
        <router-link :to="`/a/${article._id}`">{{ article.title }}</router-link>
      </h1>
      <p class="article-desc">{{ article.description }}</p>
    </div>
      <!-- tag -->
  </li>  
</template>

<script>
import { format, formatDistance, distanceInWordsToNow } from 'date-fns';
import cn from 'date-fns/locale/zh_cn';

export default {
  data () {
    return {
      format,
      formatDistance,
      distanceInWordsToNow,
      cn
    }
  },
  props: {
    article: { type: Object, required: true }
  },
}
</script>

<style></style>
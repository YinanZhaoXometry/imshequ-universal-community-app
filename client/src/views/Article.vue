<template>
  <div>
    <!-- 标题区域 -->
    <div>
      <h1>{{ article.title }}</h1>
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
      <div>
        <button @click="toggleFollow">
          {{ profile.following ? "Unfollow" : "Follow" }}
          {{ article.author.username }}
        </button>
      </div>
      <div>
        <button @click="toggleFavorite">
          <span>
            {{ article.favorited ? "取消点赞" : "赞" }}
          </span>
          <span>
            ({{ article.favoritesCount }})
          </span>
          
        </button>
      </div>
    </div>
    <!-- 文章正文区域 -->
    <div>
      <div v-html="article.body" />
      <ul>
        <li v-for="(tag, index) in article.tagList" :key="tag + index">{{ tag }}</li>
      </ul>
    </div>
    <!-- 评论区域 -->
    <comment 
      :comments="comments"
      :slug="article.slug"
    />
  </div>  
</template>

<script>
import store from '@/store'
import { mapState, mapGetters } from 'vuex'
import Comment from '@/components/Comment.vue'
export default {
  name: 'Article',
  components: {
    Comment
  },
  beforeRouteEnter (to, from, next) {
    Promise.all([
      store.dispatch('ARTICLE_FETCH', { articleSlug: to.params.slug }),
      store.dispatch('COMMENTS_FETCH', to.params.slug)
    ]).then(([article]) => {
      store.dispatch('FETCH_PROFILE', {username: article.author.username})
      next()
    })
  },
  computed: {
    ...mapState({
      article: state => state.article.article,
      comments: state => state.article.comments,
      profile: state => state.profile.profile
    }),
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    toggleFollow () {
      if (!this.isAuthenticated) {
        return this.$router.push('/login')
      }
      const actionType = this.profile.following
        ? 'FETCH_PROFILE_UNFOLLOW'
        : 'FETCH_PROFILE_FOLLOW'
      this.$store.dispatch(actionType, {
        username: this.article.author.username
      })
    },
    toggleFavorite () {
      if (!this.isAuthenticated) {
        return this.$router.push('/login')
      }
      const actionType = this.article.favorited ? 'FAVORITE_REMOVE' : 'FAVORITE_ADD'
      this.$store.dispatch(actionType, this.article.slug)
    }
  },
  
}
</script>

<style>

</style>
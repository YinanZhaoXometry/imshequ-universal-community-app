<template>
  <div>
    <!-- 标题区域 -->
    <div>
      <h1>{{ article.title }}</h1>
      <div>
        <img :src="article.author.image" alt="author avatar">
        <template v-if="article.author.username">
          <router-link 
            :to="{name: 'user-articles', params: {username: article.author.username}}"
          >
            {{ article.author.username }}
          </router-link>
        </template>
        <br>
        <span>{{ article.createdAt }}</span>
      </div>
      <div v-if="isCurrentUser">
        <button @click="deleteArticle(article)">删除文章</button>
        <button @click="editArticle(article)">编辑文章</button>
      </div>
      <div v-else>
        <button @click="toggleFollow">
          {{ profile.following ? "Unfollow" : "Follow" }}
          {{ article.author.username }}
        </button>
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
      <div v-html="article.htmlContent" />
      <ul>
        <li v-for="(tag, index) in article.tagList" :key="tag + index">{{ tag }}</li>
      </ul>
    </div>
    <!-- 评论区域 -->
    <comment :articleId="article._id" :comments="comments" />
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
    let id = to.params.id
    Promise.all([
      store.dispatch('ARTICLE_FETCH', id),
      store.dispatch('COMMENTS_FETCH', id)
    ]).then(([article]) => {
      store.dispatch('FETCH_PROFILE', {username: article.author.username})
      next()
    })
  },
  computed: {
    ...mapState({
      article: state => state.article.article,
      profile: state => state.profile.profile,
      comments: state => state.article.comments,
      currentUser: state => state.auth.authUser
    }),
    ...mapGetters(['isAuthenticated']),
    isCurrentUser () {
      return this.currentUser.username === this.article.author.username
    }
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
      this.$store.dispatch(actionType, this.article._id)
    },
    async deleteArticle (article) {
      try {
        let isConfirmed = window.confirm("确认要删除文章？")
        if (isConfirmed) {
          await this.$store.dispatch('ARTICLE_DELETE', article._id)
          this.$router.push(`/u/${article.author.username}`)
          alert('文章删除成功')
        }
      } catch ({response}) {
        alert(response.data)
      }
    },
    editArticle (article) {
      this.$router.push(`/write/${article._id}`)
    }
  },
  
}
</script>

<style>

</style>
<template>
  <div>
    <!-- 标题区域 -->
    <div>
      <h1>{{ article.title }}</h1>
      <div>
        <img :src="article.author.avatar" alt="author avatar">
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
          {{ isFollowing ? "取消关注" : "关注" }}
          {{ article.author.username }}
        </button>
        <button @click="toggleLike">
            {{ article.isLiked ? "取消点赞" : "赞" }}（{{ article.likesCount }}）
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
    <!-- 文章元数据区域 -->
    <div>
      <span>阅读：{{ article.viewsCount }}</span>
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
      store.dispatch('FETCH_PROFILE', {id: article.author._id})
      next()
    })
  },
  computed: {
    ...mapState({
      article: state => state.article.article,
      profile: state => state.profile.profile,
      comments: state => state.article.comments,
      currentUser: state => state.auth.authInfo
    }),
    ...mapGetters(['isAuthenticated', 'isFollowing']),
    isCurrentUser () {
      return this.currentUser.username === this.article.author.username
    }
  },
  methods: {
    toggleFollow () {
      if (!this.isAuthenticated) {
        alert('请先登录')
        return this.$router.push('/signin')
      }
      const actionType = this.isFollowing ? 'UNFOLLOW' : 'FOLLOW'
      let payload = {
        userId: this.profile._id,
        authUserId: this.currentUser.id 
      }
      this.$store.dispatch(actionType, payload)
    },
    toggleLike () {
      if (!this.isAuthenticated) {
        alert('请先登录')
        return this.$router.push('/signin')
      }
      // const actionType = this.article.favorited ? 'UNLIKE' : 'LIKE'
      this.$store.dispatch('TOGGLE_LIKE', this.article._id)
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
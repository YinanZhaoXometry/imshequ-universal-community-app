<template>
  <div>
    <!-- 评论输入框 -->
    <form @submit.prevent="submitComment" v-if="isAuthenticated">
      <textarea 
        cols="30" 
        rows="6"
        placeholder="写下你的评论...(支持Markdown)"
        v-model="content"
      />
      <br>
      <button type="submit">发送</button>
    </form>
    <p v-else>
      添加评论需先 
      <router-link to="/login">登陆</router-link> 
      或
      <router-link to="/register">注册</router-link> 
    </p>
    <!-- 评论显示区域 -->
    <div v-if="comments.length === 0">暂无评论</div>
    <div v-else v-for="(comment, index) in comments" :key="index">
      <div v-html="comment.htmlContent" />
      <img :src="comment.fromWhom.avatar" alt="user avatar">
      <span>{{ comment.fromWhom.username }} </span>
      <span v-if="isCurrentUser(comment)">作者 </span>
      <span>{{ comment.createdAt }} </span>
      <span v-if="isCurrentUser(comment)">
        <button @click="deleteComment(comment._id)">delete</button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Comment',
  props: {
    comments: {
      type: Array,
      required: true
    },
    articleId: {
      type: String,
      required: true,
      default: ''
    },
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.authInfo,
    }),
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    handleClick () {
      console.log(this.comments)
    },
    submitComment () {
      this.$store.dispatch('COMMENT_PUBLISH', {
        articleId: this.articleId,
        content: this.content
      })
      this.content = ''
    },
    deleteComment (commentId) {
      this.$store.dispatch('COMMENT_DELETE', {
        articleId: this.articleId,
        commentId
      })
    },
    isCurrentUser (comment) {
      if (this.currentUser.username && comment.fromWhom.username) {
        return this.currentUser.username === comment.fromWhom.username
      }
      return false
    }
  }
}
</script>

<style>

</style>
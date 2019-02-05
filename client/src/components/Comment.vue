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
    <div v-for="(comment, index) in comments" :key="index">
      <div>{{ comment.body }}</div>
      <img :src="comment.author.image" alt="">
      <span>{{ comment.author.username }}</span>
      <span>{{ comment.createdAt }}</span>
      <span v-if="isCurrentUser(comment)">
        <button @click="deleteComment(comment.id)">delete</button>
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
    slug: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.user
    }),
    ...mapGetters(['isAuthenticated']),
  },
  methods: {
    submitComment () {
      this.$store.dispatch('COMMENT_CREATE', {
        slug: this.slug,
        comment: this.content
      })
      this.content = ''
    },
    deleteComment (commentId) {
      this.$store.dispatch('COMMENT_DELETE', {
        slug: this.slug,
        commentId
      })
    },
    isCurrentUser (comment) {
      if (this.currentUser.username && comment.author.username) {
        return this.currentUser.username === comment.author.username
      }
      return false
    }
  }
}
</script>

<style>

</style>
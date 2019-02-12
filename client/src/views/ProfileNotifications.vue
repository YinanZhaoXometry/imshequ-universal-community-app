<template>
  <div>
    <!-- 展示一条评论 -->
    <div>
      <div>

        <div>xxx 评论了你的文章 xxxxx</div>
        <div>评论时间</div>
        <div>评论内容</div>
      </div>
      <button>回复</button>
      <button>查看对话</button>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'ProfileNotifications',
  components: {
  },
  data () {
    return {
      pageNum: 1,
      pageSize: 10
    }
  },
  computed: {
  },
  created () {
    let payload = {
      offset: (this.pageNum - 1) * this.pageSize, limit: 10, type: 'comment'
    }
    this.fetchNotifications(payload)
  },
  methods: {
    fetchNotifications (payload) {
      this.$store.dispatch('FETCH_NOTIFICATIONS', payload)
    }
  }
}
</script>

<style>

</style>
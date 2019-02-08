<template>
  <div>
    <article-list :items-per-page="5" :author="author" />
  </div>  
</template>

<script>
import ArticleList from '@/components/ArticleList.vue'
export default {
  name: 'ProfileTabs',
  components: {
    ArticleList
  },
  computed: {
    author () {
      return this.$route.params.username
    }
  }
}
</script>

<style>

</style>
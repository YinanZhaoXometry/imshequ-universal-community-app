<template>
  <div>
    <article-card />
    {{ $route.name }}
  </div>  
</template>

<script>
import ArticleCard from '@/components/ArticleCard'
export default {
  components: {
    ArticleCard
  },

  created () {
    this.fetchArticles()
  },

  methods: {
    fetchArticles () {
      
    }
  }
  
}
</script>

<style></style>
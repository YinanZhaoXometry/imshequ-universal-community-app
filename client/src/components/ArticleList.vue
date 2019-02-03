<template>
  <div>
    <div v-if="isLoading">Loading articles...</div>
    <div v-else>
      <article-card 
        v-for="(article, index) in articles" 
        :key="article.title + index" 
        :article="article"
      >
      </article-card>
      <pagination :pages="pages" :currentPage.sync="currentPage" />
    </div>
  </div>  
</template>

<script>
import ArticleCard from '@/components/ArticleListCard.vue'
import Pagination from '@/components/ArticleListPagination.vue'
import { mapState } from 'vuex'

export default {
  name: 'HomeArticleList',
  components: {
    ArticleCard,
    Pagination
  },

  props: {
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    },
    author: {
      type: String,
      required: false
    }
  },

  data () {
    return {
      currentPage: 1
    }
  },

  computed: {
    listConfig () {
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      }
      if (this.author) filters.author = this.author
      return {
        type: this.$route.name,
        filters
      }
    },
    ...mapState({
      articles: state => state.home.articles,
      articlesCount: state => state.home.articlesCount,
      isLoading: state => state.home.isLoading
    }),
    pages () {
      if (this.isLoading || this.articleCount <= this.itemsPerPage) {
        return []
      }
      return [
        ...Array(Math.ceil(this.articlesCount / this.itemsPerPage)).keys()
        ].map(e => e+1)
    }
  },

  watch: {
    currentPage () {
      this.fetchArticles();
    }
  },

  created () {
    this.fetchArticles()
  },

  methods: {
    fetchArticles () {
      this.$store.dispatch('FETCH_ARTICLES', this.listConfig)
    }
  }
  
}
</script>

<style></style>
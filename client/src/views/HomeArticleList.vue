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
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/ArticlePagination'
import { mapState } from 'vuex'

export default {
  components: {
    ArticleCard,
    Pagination
  },

  props: {
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
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

  mounted () {
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
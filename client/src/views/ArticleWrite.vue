<template>
  <div>
    <form @submit.prevent="onPublish">
      <fieldset :disabled="inProgress">
        <fieldset>
          <input type="text" placeholder="文章标题" v-model="article.title">
        </fieldset>
        <fieldset>
          <input type="text" placeholder="文章简介" v-model="article.description">
        </fieldset>
        <fieldset>
          <textarea type="text" placeholder="内容（支持markdown格式）" rows="8" v-model="article.content" /> 
        </fieldset>
        <fieldset>
          <input type="text" placeholder="标签">
        </fieldset>
      </fieldset>
      <button type="submit">发表</button>
    </form>
  </div>
</template>

<script>
import store from '@/store'
// import {mapState} from 'vuex'
export default {
  data () {
    let {title, description, rawContent} = this.$store.state.article.article
    return {
      tagInput: null,
      inProgress: false,
      errors: {},
      article: {
        title: title,
        description: description,
        content: rawContent
      }
    }
  },
  computed: {
    // ...mapState({
    //   article: state => state.article.article
    // })
  },
  async beforeRouteEnter (to, from, next) {
    store.commit('RESET_ARTICLE_STATE')
    if (to.params.id !== undefined) {
      await store.dispatch('ARTICLE_FETCH', to.params.id)
    }
    next()
  },
  methods: {
    checkContents () {
      let errors = []
      if (!this.article.title)
        errors.push('标题')
      if (!this.article.description)
        errors.push('简介')
      if (!this.article.content)
        errors.push('内容')
      if (errors.length !== 0) {
        alert('请填写文章' + errors.join('、') )
      }
    },
    onPublish () {
      this.checkContents()
      this.inProgress = true
      let action
      if (this.$route.params.id === undefined) {
        action = 'ARTICLE_PUBLISH'
      } else {
        action = 'ARTICLE_EDIT'
        this.article.id = this.$route.params.id
      }
      this.$store.dispatch(action, this.article)
      .then(({data}) => {
        this.inProgress = false
        this.$router.push(`/a/${data.id}`)
      })
      .catch((err)=>{
        this.inProgress = false
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
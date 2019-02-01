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
          <textarea type="text" placeholder="内容（markdown格式）" rows="8" v-model="article.body" /> 
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
export default {
  data () {
    return {
      tagInput: null,
      inProgress: false,
      errors: {},
      article: {
        title: '',
        description: '',
        body: ''
      }
    }
  },
  methods: {
    onPublish () {
      this.inProgress = true
      this.$store.dispatch('ARTICLE_PUBLISH', this.article)
      .then(({data}) => {
        this.inProgress = false
        console.log(data)
        // this.$route.push({path: '/article', params: {id: data.article.slug}})
      })
      .catch((err)=>{
        console.log(err)
      })
      // .catch(({response}) => {
      //   this.inProgress = false
      //   this.errors = response.data.errors
      //   console.log(response.data.errors)
      // })
    }
  }
}
</script>

<style>

</style>
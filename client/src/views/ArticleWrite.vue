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
          <textarea type="text" placeholder="内容（markdown格式）" rows="8" v-model="article.content" /> 
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
        content: ''
      }
    }
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
      this.$store.dispatch('ARTICLE_PUBLISH', this.article)
      .then(({data}) => {
        this.inProgress = false
        this.$route.push(`/article/${data.id}`)
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
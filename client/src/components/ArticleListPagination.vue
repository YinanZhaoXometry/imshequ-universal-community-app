<template>
  <div>
    <ul>
      <li 
        v-for="page in pages" 
        :key="page" 
        @click="changePage(page)"
      >
        {{page}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pages: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },

  methods: {
    changePage (goToPage) {
      if (goToPage === this.currentPage) return
      this.$emit('update:currentPage', goToPage)
    }
  }
}
</script>

<style>
li {
  float: left;
  list-style: none;
  padding: 5px;
  cursor: pointer;
}
</style>
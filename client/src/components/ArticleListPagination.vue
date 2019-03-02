<template>
  <el-pagination
    class="pagination"
    background
    layout="prev, pager, next"
    :total="pages"
    @current-change="changePage"
  >
  </el-pagination>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },

  methods: {
    changePage(goToPage) {
      this.$emit('update:currentPage', goToPage)
    }
  }
}
</script>

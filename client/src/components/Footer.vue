<template>
  <footer class="footer-container">
    <div class="footer-menu" @click="handleClick">Fork on GitHub</div>
    <div class="footer-note">imSheQu. All Rights Reserved © 2019</div>
  </footer>
</template>

<script>
export default {
  methods: {
    handleClick () {
      window.open('https://github.com/zhaoyn7/imshequ-universal-community-app', '_blank')
    }
  }
}
</script>


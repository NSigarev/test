<script setup lang="ts">
import MyHead from "./heHead.vue";
import MBody from "./mBody.vue";
</script>

<template>
  <div class="main">
    <my-head></my-head>
    <div class="gap"></div>
    <m-body></m-body>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  padding: 50px;
  font-family: Montserrat, sans-serif;
  line-height: 1.21875;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.gap {
  width: 100%;
  height: 25px;
}
</style>

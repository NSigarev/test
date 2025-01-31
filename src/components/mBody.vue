<script setup lang="ts">
import Sidebar from "./sidebar.vue";
import UserShower from "./userShower.vue";
</script>

<template>
  <div class="mBody">
    <sidebar></sidebar>
    <user-shower></user-shower>
  </div>
</template>

<style scoped>
.mBody {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 #0000001a;
}
</style>

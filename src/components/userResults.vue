<script setup lang="ts">
import MiniUser from "./miniUser.vue";
const props = defineProps<{
  users: { fio: string; mail: string; img: string }[];
}>();
</script>

<template>
  <div class="userResults">
    <mini-user
      v-for="(val, idx) in props.users"
      :key="idx"
      :user="val"
    ></mini-user>
  </div>
</template>

<style scoped>
.userResults {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>

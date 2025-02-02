<script setup lang="ts">
import MiniUser from "./miniUser.vue";
import { ref, watch } from "vue";
const props = defineProps<{
  users: { username: string; email: string; img: string }[];
}>();
const emit = defineEmits<{
  (e: "selected", val: number | undefined): void;
}>();
const selectedUser = ref<number | undefined>(undefined);
function changeSelected(val: number | undefined): void {
  selectedUser.value = val;
  emit("selected", selectedUser.value);
}
watch(
  () => props.users,
  () => changeSelected(undefined),
);
</script>

<template>
  <div class="userResults">
    <mini-user
      v-for="(val, idx) in props.users"
      :key="idx"
      :user="val"
      :selected="selectedUser !== undefined && selectedUser == idx"
      @click="
        () => {
          changeSelected(idx);
        }
      "
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

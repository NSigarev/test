<script setup lang="ts">
import UserResults from "./userResults.vue";
import { ref } from "vue";
import { UserResult } from "@/types/user";
import { useUserStore } from "@/store";
const store = useUserStore();
async function fetchUsers(): Promise<void> {
  users.value = await store.fetchUsers();
}
const users = ref<UserResult[]>([]);
const findStr = ref<string>("Antonette, Bret");
const selectedUser = ref<UserResult | undefined>(undefined);
const emit = defineEmits<{
  (e: "selected", val: UserResult | undefined): void;
}>();
</script>

<template>
  <div class="sidebar">
    <a class="bold-text">Поиск сотрудников</a>
    <input
      class="input main-text"
      :value="findStr"
      @blur="() => fetchUsers()"
    />
    <a class="bold-text">Результаты</a>
    <user-results
      v-if="users && users.length > 0"
      :users="users"
      @selected="
        (idx: number | undefined) => {
          selectedUser = idx !== undefined ? users[idx] : undefined;
          emit('selected', selectedUser);
        }
      "
    ></user-results>
    <a v-else class="main-text" style="color: #76787d">Начните поиск</a>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
}
.input {
  padding: 16px 24px;
  border: 1.5px solid #e9ecef;
  border-radius: 8px;
}
.bold-text {
  font-size: 16px;
}
</style>

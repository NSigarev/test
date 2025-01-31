<script setup lang="ts">
import UserResults from "./userResults.vue";
import { ref } from "vue";
import { UserResult } from "@/types/user";
import { Store } from 'vuex'
import { useStore } from "@/store";
const store = useStore()
async function fetchUsers(): Promise<UserResult[]> {
  const res = [
    {
      id: 0,
      fio: "Ervin Howell",
      mail: "Shanna@melissa.tv",
      phone: "010-692-6593 x09125",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "https://littlejohnremodeling.com/wp-content/uploads/2023/01/human-human-avatar-male-icon-with-png-and-vector-format-for-free-19807.png",
    },
    {
      id: 1,
      fio: "Bret",
      mail: "Sincere@april.biz",
      phone: "010-692-6593 x09125",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      img: "none",
    },
  ];
  store.
}
const findStr = ref<string>("Antonette, Bret");
const selectedUser = ref<UserResult | undefined>(undefined);
const emit = defineEmits<{
  (e: "selected", val: UserResult | undefined): void;
}>();
</script>

<template>
  <div class="sidebar">
    <a class="bold-text">Поиск сотрудников</a>
    <input class="input main-text" :value="findStr" @blur="() => fetchUsers" />
    <a class="bold-text">Результаты</a>
    <user-results
      v-if="users"
      :users="users"
      @selected="
        (idx) => {
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

<script setup lang="ts">
import UserResults from "./userResults.vue";
import { ref } from "vue";
import { UserResult } from "@/types/user";
import { useUserStore } from "@/store";
const store = useUserStore();
const errorText = ref<string | undefined>(undefined);
async function fetchUsers(): Promise<void> {
  findStr.value = findStr.value.replace(/[^a-zA-Z0-9, ]/g, "");
  const arr = findStr.value
    .split(", ")
    .map((val: string) => {
      if (!val || val.length == 0) return undefined;
      const numb = +val;
      if (typeof numb === "number" && !isNaN(numb)) {
        return numb;
      } else return val;
    })
    .filter((val) => val !== undefined);
  const result: string = arr.reduce(
    (res: string, val: number | string, idx: number) => {
      if (idx !== 0) res += "&";
      if (typeof val == "number") {
        res += `id=${val}`;
      } else {
        res += `username=${val}`;
      }
      return res;
    },
    "",
  );
  try {
    users.value = await store.fetchUsers(result);
  } catch (e: any) {
    errorText.value = e.message;
  }
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
      v-model="findStr"
      @blur="() => fetchUsers()"
    />
    <a v-if="errorText" style="color: red"> {{ errorText }}</a>
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

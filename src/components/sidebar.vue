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
    .split(",")
    .map((val: string) => {
      val = val.trim();
      if (!val || val.length == 0) return undefined;
      const numb = +val;
      if (typeof numb === "number" && !isNaN(numb)) {
        return numb;
      } else return val;
    })
    .filter((val) => val !== undefined);
  let firstType: string;
  const result: string = arr.reduce(
    (res: string, val: number | string, idx: number) => {
      if (firstType && typeof val !== firstType) {
        errorText.value = "Недопустимо одновременно искать по id и псевдониму";
      }
      if (idx !== 0) res += "&";
      if (typeof val == "number") {
        res += `id=${val}`;
      } else {
        res += `username=${val}`;
      }
      if (idx === 0) {
        firstType = typeof val;
      }
      return res;
    },
    "",
  );
  try {
    users.value = await store.fetchUsers(result);
    if (users.value?.length > 0) errorText.value = undefined;
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
    <div style="position: relative; width: min-content">
      <input
        class="input main-text"
        v-model="findStr"
        @blur="() => fetchUsers()"
        @keyup.enter="
          () => {
            fetchUsers();
          }
        "
      />
      <div v-if="store.isLoading" class="loader"></div>
      <a v-if="errorText" style="color: red; overflow-wrap: normal">
        {{ errorText }}</a
      >
    </div>
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

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  max-width: 300px;
}
.input {
  padding: 16px 4px 16px 28px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  min-width: 240px;
  width: 17em;
  box-sizing: border-box;
}
.loader {
  bottom: 14px;
  left: 5px;
  position: absolute;
  border: 4px solid rgba(0, 0, 0, 0);
  border-top: 4px solid red;
  border-radius: 50%;
  height: 16px;
  width: 16px;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
.bold-text {
  font-size: 16px;
}
</style>

<script setup lang="ts">
import Sidebar from "./sidebar.vue";
import UserShower from "./userShower.vue";
import { UserResult } from "@/types/user";
import { ref } from "vue";
const currentUser = ref<UserResult | undefined>(undefined);
</script>

<template>
  <div class="mBody">
    <sidebar
      @selected="
        (user: UserResult | undefined) => {
          if (user) currentUser = user;
        }
      "
    ></sidebar>
    <user-shower :user="currentUser"></user-shower>
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

<script setup lang="ts">
import { UserResult } from "@/types/user";

const props = defineProps<{
  user: UserResult | undefined;
}>();
</script>

<template>
  <div class="container">
    <div v-if="user" class="profile-card">
      <img :src="user.img" alt="Profile Picture" class="profile-image" />
      <div class="text-info">
        <a class="title">{{ user.fio }}</a>
        <p>
          <a class="bold-text">email: </a
          ><a class="main-text">{{ user.mail }}</a>
        </p>
        <p>
          <a class="bold-text">phone: </a
          ><a class="main-text">{{ user.phone }}</a>
        </p>
        <p class="bold-text big" style="margin-top: 10px">О себе:</p>
        <a class="main-text">{{ user.text }}</a>
      </div>
    </div>
    <a v-else>FUCK</a>
  </div>
</template>

<style scoped>
.profile-card {
  display: flex;
}
p {
  margin: 0;
}
.text-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 60px;
}
.title {
  font-weight: 700;
  font-size: 16px;
}
.big {
  font-size: 16px;
}
.profile-image {
  height: 240px;
  aspect-ratio: 1.5;
  object-fit: cover;
  border: 1px solid #e0e0e0;
}

.container {
  border-left: 1px solid #dededd;
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
}
</style>

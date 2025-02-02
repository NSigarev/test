<script setup lang="ts">
import { UserResult } from "@/types/user";
import BVO from "@/assets/img_replace.png";
import { onMounted, ref, watch } from "vue";

const props = defineProps<{
  user: UserResult | undefined;
}>();
const defaultImage = BVO;
const imageSrc = ref<string>(defaultImage);
function handleError() {
  imageSrc.value = defaultImage; // Подставляем заглушку при ошибке загрузки
}
onMounted(() => {
  imageSrc.value = props.user?.img ?? defaultImage;
});
watch(
  () => props.user,
  () => (imageSrc.value = props.user?.img ?? defaultImage),
);
</script>

<template>
  <div class="container">
    <div v-if="user" class="profile-card">
      <img
        :src="imageSrc"
        @error="handleError"
        alt="Profile Picture"
        class="profile-image"
      />
      <div class="text-info">
        <a class="title">{{ user.name }}</a>
        <p>
          <a class="bold-text">email: </a
          ><a class="main-text">{{ user.email }}</a>
        </p>
        <p>
          <a class="bold-text">phone: </a
          ><a class="main-text">{{ user.phone }}</a>
        </p>
        <p class="bold-text big" style="margin-top: 10px">О себе:</p>
        <a class="main-text">{{ user.text }}</a>
      </div>
    </div>
    <div v-else class="flex-col">
      <a class="center main-text">Выберите сотрудника, чтобы посмотреть его профиль</a
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-card {
  //display: flex;
  //flex-direction: column;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}
.text-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.profile-image {
  width: 100%;
  aspect-ratio: 1.5;
  object-fit: cover;
  border: 1px solid #e0e0e0;
}
@media (min-width: 950px) {
  .profile-card {
    flex-wrap: nowrap;
    align-items: start;
  }

  .profile-image {
    width: 320px;
    flex-shrink: 0;
  }
}
p {
  margin: 0;
}
.title {
  font-weight: 700;
  font-size: 16px;
}
.big {
  font-size: 16px;
}
.center {
  width: fit-content;
  height: fit-content;
  margin: auto;
}
.container {
  border-left: 1px solid #dededd;
  padding: 30px 20px;
}
.flex-col {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

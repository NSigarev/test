<script setup lang="ts">
import { onMounted, ref } from "vue";
import BVO from "@/assets/img_replace.png";
const props = defineProps<{
  user: { fio: string; mail: string; img: string };
}>();
const defaultImage = BVO;
const imageSrc = ref<string>(defaultImage);
onMounted(() => {
  imageSrc.value = props.user.img;
});
function handleError() {
  imageSrc.value = defaultImage; // Подставляем заглушку при ошибке загрузки
}
</script>

<template>
  <div class="mini-user">
    <img class="image" :src="imageSrc" @error="handleError" alt="User Image" />
    <div class="user">
      <a class="bold-text">{{ user.fio }}</a>
      <a class="main-text">{{ user.mail }}</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mini-user {
  display: flex;
  flex-direction: row;
  width: 240px;
  height: 70px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 0 10px 0 #0000001a;
  overflow: hidden;
  border-radius: 10px;
  &:hover .user {
    background: #e0e0e0;
  }
}
.image {
  max-height: 100%;
  height: 70px;
  aspect-ratio: 1;
  object-fit: cover; /* Заполнение контейнера без искажения */
}
.user {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 14px;
  border-radius: 0 8px 8px 0;
  border-left: 1px solid #dededd;
}
</style>

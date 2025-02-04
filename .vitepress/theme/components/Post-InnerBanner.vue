<template>
  <div class="post-banner" v-show="state.currPost.title">
    <h1 class="title">{{ state.currPost.title }}</h1>
    <span class="status"
      >发布于
      {{
        Intl.DateTimeFormat('zh-CN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(new Date(state.currPost.create))
      }}
      | 约{{ state.currPost.wordCount }}字</span
    >
  </div>
</template>
<script setup lang="ts">
import { useStore } from '../store'
const { state } = useStore()
</script>
<style scoped lang="less">
.post-banner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--post-InnerBanner-color);
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  z-index: 100;
  transition: color 0.5s;

  .title {
    font-size: 4.5vw;
    margin-bottom: 50px;
    text-align: center;
  }

  .status {
    font-size: 1vw;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    .title {
      font-size: 5vh;
    }
    .status {
      font-size: 1.5vh;
    }
  }
}
</style>

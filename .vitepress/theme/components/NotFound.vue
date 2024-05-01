<template>
  <div class="NotFound">
    <img src="../assets/NotFound.png" alt="" />
    <a :href="base">回到主页</a>
  </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
const base = useData().site.value.base
</script>
<style scoped lang="less">
.NotFound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  margin: 100px auto;
  border-radius: 32px;
  border: solid 2px white;
  backdrop-filter: var(--blur-val);
  img {
    width: 100%;
  }
  a {
    padding: 10px;
    background-color: var(--btn-background);
    color: var(--font-color-gold);
    border-radius: 8px;
  }
}
</style>

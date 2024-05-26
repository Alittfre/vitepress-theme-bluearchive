<template>
  <div class="not-found">
    <img src="../assets/NotFound.png" alt="" />
    <span>页面不存在</span>
    <span class="band"><a :href="base">回到主页</a></span>
  </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
const base = useData().site.value.base
</script>
<style scoped lang="less">
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  margin: 100px auto;
  padding: 16px;
  border-radius: 32px;
  border: solid 2px white;
  backdrop-filter: var(--blur-val);


  img {
    width: 25vw;

    &+span {
      font-style: italic;
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
      font-size: 30px;
      color: #fbfbfb;
      margin-bottom: 16px;
    }
  }

  a {
    color: #74d8f9;
    font-size: 20px;
    font-weight: bold;
  }

}

.band {
  display: flex;
  justify-content: center;
  width: 30vw;
  border-top: 2px solid #5e87b4;
  border-bottom: 2px solid #5e87b4;
  background-color: #1a2b51;
  padding: 5px 0;
  mask: linear-gradient(to left, transparent 0%, #1a2b51 50%, transparent 100%);
}

@media(max-width: 768px) {
  .not-found {
    img {
      width: 50vw;
    }
  }

  .band {
    width: 50vw;
  }
}
</style>

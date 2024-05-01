<template>
  <div
    class="banner"
    :class="{ postViewer: state.currPost.href }"
    :style="`background-image: url(${banner});`"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
const themeConfig = useData().theme.value
const banner = themeConfig.banner

import { useStore } from '../store'
const { state } = useStore()
</script>
<style scoped lang="less">
.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 80vh;
  transition: all 0.2s;

  mask: linear-gradient(to top, transparent, var(--general-background-color) 10%);
  perspective: 1000px;
}

.postViewer {
  height: 50vh;
}
</style>

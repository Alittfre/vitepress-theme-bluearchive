<template>
  <div class="banner" :class="{ postViewer: state.currPost.href }">
    <slot></slot>
    <div class="wave1"></div>
    <div class="wave2"></div>
  </div>
</template>
<script setup lang="ts">
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
  background-image: url(../assets/banner/banner.jpg);
  mask: linear-gradient(to top, transparent, var(--general-background-color) 5%);
  perspective: 1000px;
  overflow: hidden;
}

.postViewer {
  height: 50vh;
}

.wave1,
.wave2 {
  position: absolute;
  width: 400%;
  bottom: 0;
}

.wave1 {
  background: url("../assets/wave1.png") repeat-x;
  height: 65px;
  animation: wave-animation-1 30s infinite linear;
}

.wave2 {
  background: url("../assets/wave2.png") repeat-x;
  height: 80px;
  animation: wave-animation-2 20s infinite linear;
}

@keyframes wave-animation-1 {
  0% {
    left: 0;
  }

  100% {
    left: -997px;
  }
}

@keyframes wave-animation-2 {
  0% {
    left: 0;
  }

  100% {
    left: -1009px;
  }
}
</style>

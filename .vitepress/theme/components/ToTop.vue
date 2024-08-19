<template>
  <a href="#" class="totop" @click="toTop" :style="style" aria-label="to-top"
    ><img src="../assets/toTop.svg" alt=""
  /></a>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const hide = `bottom: 100%; right: 100%; opacity: 0;`
const style = ref(hide)
const onScroll = () => {
  window.requestAnimationFrame(() => {
    if (window.scrollY > 200) {
      style.value = `bottom: 50px`
    } else {
      style.value = hide
    }
  })
}
const toTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(() => {
  window.addEventListener('scroll', onScroll)
  onScroll()
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>
<style scoped lang="less">
.totop {
  position: fixed;
  z-index: 100;
  right: 3%;
  filter: drop-shadow(0 0 3px rgba(40, 42, 44, 0.42));
  transition: all 0.5s;
  img {
    width: 85px;
  }
}
@media (max-width: 768px) {
  .totop {
    right: 5%;
  }
}
</style>

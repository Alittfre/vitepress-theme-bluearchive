<template>
  <a class="totop" @click="clickcheck" :style="style" aria-label="to-top">
    <img @dragstart.prevent :style="{ transform: `scale(${scale})` }" src="../assets/toTop.svg" alt="" />
  </a>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const style = ref()
const scale = ref(1)
const click = ref(0)

const onScroll = () => {
  window.requestAnimationFrame(() => {
    if (window.scrollY > 600) {
      click.value = 0
      if (scale.value == 1) {
        style.value = `bottom: 150px; right: ${window.innerWidth > 768 ? '-55px' : '-35px'};`
      }
    } else {
      style.value = `bottom: 150px; right: -200px; opacity: 0;`
      scale.value = 1
    }
  })
}

// 二次确认
const clickcheck = () => {
  if (click.value === 0) {
    style.value = `bottom: 150px; right: 2%;`
    click.value = 1
  } else {
    toTop()
    click.value = 0
  }
}

const toTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  scale.value = 0.9  // 点击时缩小
}

const handleOutsideClick = (event: MouseEvent) => {
  const isClickInside = event.target instanceof Element && event.target.closest('.totop')
  if (!isClickInside) {
    if (window.scrollY > 600) {
      click.value = 0  // 重置点击状态
      style.value = `bottom: 150px; right: ${window.innerWidth > 768 ? '-55px' : '-35px'};`
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  document.addEventListener('click', handleOutsideClick)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', handleOutsideClick)
})
</script>

<style scoped lang="less">
.totop {
  position: fixed;
  z-index: 100;
  right: -200px;
  filter: drop-shadow(0 0 3px rgba(40, 42, 44, 0.42));
  transition: all 0.6s ease;
  img {
    width: 105px;
    transition: all 0.3s ease;
    &:hover {
      scale: 0.98;
    }
  }
}
@media (max-width: 768px) {
  .totop img {
    width: 70px;
  }
}
</style>

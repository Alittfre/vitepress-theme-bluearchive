<template>
  <div v-if="isVisible" class="splash-container" v-html="svgContent"></div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import anime from 'animejs'

const svgContent =
  ref(`<svg viewBox="0 0 1728 1117" preserveAspectRatio="xMinYMin slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2_5)">
<g class="triangle-group">
<path d="M606 -123L1061 666H151L606 -123Z"/>
<path d="M190.15 144L67.3 -68.94L313 -68.94L190.15 144Z"/>
<path d="M1424.17 339L1249.35 35.97L1599 35.97L1424.17 339Z"/>
<path d="M-96.7 513.333L-216.4 305.853H23L-96.7 513.333Z"/>
<path d="M502.825 603.83L391 410L614.65 410L502.825 603.83Z"/>
<path d="M1228.45 648.333L1048.9 337.113L1408 337.113L1228.45 648.333Z"/>
<path d="M246.375 925.667L96.75 666.317H396L246.375 925.667Z"/>
<path d="M606.375 1048.45L504 871L708.75 871L606.375 1048.45Z"/>
<path d="M1376.5 960L1219 687H1534L1376.5 960Z"/>
<path d="M365.395 170L503.791 409.885H227L365.395 170Z"/>
<path d="M1049.36 337L1198.71 595.886H900L1049.36 337Z"/>
<path d="M1248.81 36L1340.61 195.132H1157L1248.81 36Z"/>
<path d="M503.99 680.333L614.981 872.716H393L503.99 680.333Z"/>
<path d="M870.433 698.333L997.866 919.218H743L870.433 698.333Z"/>
<path d="M1419.1 487L1534.2 686.508H1304L1419.1 487Z"/>
<path d="M312.914 809L445.828 1039.38H180L312.914 809Z"/>
<path d="M1225.51 1053.67L1368.01 1300.68H1083L1225.51 1053.67Z"/>
<path d="M1550.51 792L1693.01 1039.01H1408L1550.51 792Z"/>
</g>
<g id="breathingParts">
<path class="circle-path" fill-rule="evenodd" clip-rule="evenodd" d="M864 769C979.98 769 1074 674.98 1074 559C1074 443.02 979.98 349 864 349C748.02 349 654 443.02 654 559C654 674.98 748.02 769 864 769ZM864 749.909C969.436 749.909 1054.91 664.436 1054.91 559C1054.91 453.564 969.436 368.091 864 368.091C758.564 368.091 673.091 453.564 673.091 559C673.091 664.436 758.564 749.909 864 749.909Z"/>
<path class="led-path" class="led-path" d="M934.636 392.273H792.727L757.091 447H970.909L934.636 392.273Z"/>
<path class="led-path" d="M969.636 450.182H897.727L934.636 504.273L969.636 450.182Z"/>
<path class="led-path" d="M792.091 500.455L828.364 447L900.909 555.182L863.364 609.273L792.091 500.455Z"/>
<path class="led-path" d="M900.909 667.182L865.909 612.455L903.5 558.364L973.455 667.182L937.818 721.909H796.545L760.273 667.182L796.545 612.455L832.818 667.182H900.909Z"/>
</g>
<defs>
  <filter id="glow">
    <feGaussianBlur stdDeviation="4" result="blur"/>
    <feFlood class="glow-color" flood-opacity="2.5"/>
    <feComposite in2="blur" operator="in"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
</svg>
`)
const isVisible = ref(true)
import { useStore } from '../store'
const { state } = useStore()

const createBreathingAnimation = () => {
  anime({
    targets: '#breathingParts',
    opacity: [0.3, 1],
    easing: 'easeInOutSine',
    duration: 500,
    direction: 'alternate',
    loop: true,
  })
}

const fadeOutSplash = () => {
  anime({
    targets: '.splash-container',
    opacity: 0,
    duration: 500,
    easing: 'easeInOutQuad',
    complete: () => {
      isVisible.value = false // 隐藏splash
    },
  })
  state.splashLoading = false
}

const preventDefault = (e) => {
  e.preventDefault()
}

onMounted(() => {
  createBreathingAnimation()
  // 禁用滚轮事件
  window.addEventListener('wheel', preventDefault, { passive: false })
  setTimeout(() => {
    fadeOutSplash()
    // 启用滚轮事件
    window.removeEventListener('wheel', preventDefault)
  }, Math.floor(Math.random() * 300) + 1200) // 随机等待时间
})

onUnmounted(() => {
  // 确保组件卸载时移除事件监听
  window.removeEventListener('wheel', preventDefault)
})
</script>

<style scoped>
.splash-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(#b9e6f6, #ece5f4);
  z-index: 999;

  :global(.triangle-group path) {
    fill: white;
    fill-opacity: 0.15;
  }

  :global(.circle-path) {
    fill: #E0F0FA;
    fill-opacity: 0.9;
  }

  :global(.led-path) {
    fill: white;
    filter: url(#glow);
  }

  :global(.glow-color) {
    flood-color: white;
  }

  html[theme='dark'] & {
    background: linear-gradient(#c3bde9, #fee4ff);

    :global(.circle-path) {
      fill: #fee4ff;
    }

    :global(.glow-color) {
      flood-color: #efe0fd;
    }
  }
}
</style>

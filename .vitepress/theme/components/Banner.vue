<template>
  <div
    class="banner"
    :class="{ postViewer: state.currPost.href, loadingComplete: !state.splashLoading }"
  >
    <slot></slot>

    <canvas id="wave"></canvas>
    <video autoplay muted loop class="bg-video" v-if="videoBanner">
      <source src="../assets/banner/banner_video.mp4" type="video/mp4" />
    </video>
    <div class="bg-img" v-else></div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
const themeConfig = useData().theme.value
const videoBanner = themeConfig.videoBanner

import { useStore } from '../store'
const { state } = useStore()
import { onMounted } from 'vue'
class SiriWave {
  K: number
  F: number
  speed: number
  noise: number
  phase: number
  devicePixelRatio: number
  width: number
  height: number
  MAX: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  run: boolean
  animationFrameID: number | null

  constructor() {
    this.K = 1
    this.F = 15
    this.speed = 0.1
    this.noise = 30
    this.phase = 0
    this.devicePixelRatio = window.devicePixelRatio || 1
    this.width = this.devicePixelRatio * window.innerWidth
    this.height = this.devicePixelRatio * 100
    this.MAX = this.height / 2
    this.canvas = document.getElementById('wave') as HTMLCanvasElement
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.width = this.width / this.devicePixelRatio + 'px'
    this.canvas.style.height = this.height / this.devicePixelRatio + 'px'
    this.ctx = this.canvas.getContext('2d')!
    this.run = false
    this.animationFrameID = null
  }

  _globalAttenuationFn(x: number) {
    return Math.pow((this.K * 4) / (this.K * 4 + Math.pow(x, 4)), this.K * 2)
  }

  _drawLine(attenuation: number, color: string, width: number, noise: number, F: number) {
    this.ctx.moveTo(0, 0)
    this.ctx.beginPath()
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width || 1
    F = F || this.F
    noise = noise * this.MAX || this.noise
    for (let i = -this.K; i <= this.K; i += 0.01) {
      i = parseFloat(i.toFixed(2))
      const x = this.width * ((i + this.K) / (this.K * 2))
      const y =
        this.height / 2 +
        noise * Math.pow(Math.sin(i * 10 * attenuation), 1) * Math.sin(F * i - this.phase)
      this.ctx.lineTo(x, y)
    }
    this.ctx.lineTo(this.width, this.height)
    this.ctx.lineTo(0, this.height)
    this.ctx.fillStyle = color
    this.ctx.fill()
  }

  _clear() {
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.globalCompositeOperation = 'source-over'
  }

  _draw() {
    if (!this.run) {
      return
    }
    this.phase = (this.phase + this.speed) % (Math.PI * 64)
    this._clear()
    // 获取计算后的 CSS 变量值
    const wave1Color = getComputedStyle(document.documentElement)
      .getPropertyValue('--wave-color1')
      .trim()
    const wave2Color = getComputedStyle(document.documentElement)
      .getPropertyValue('--wave-color2')
      .trim()

    this._drawLine(0.5, wave1Color, 1, 0.35, 6)
    this._drawLine(1, wave2Color, 1, 0.25, 6)
    this.animationFrameID = requestAnimationFrame(this._draw.bind(this))
  }

  start() {
    this.phase = 0
    this.run = true
    this._draw()
  }

  stop() {
    this.run = false
    this._clear()
    if (this.animationFrameID !== null) {
      cancelAnimationFrame(this.animationFrameID)
      this.animationFrameID = null
    }
  }

  setNoise(v: number) {
    this.noise = Math.min(v, 1) * this.MAX
  }

  setSpeed(v: number) {
    this.speed = v
  }

  set(noise: number, speed: number) {
    this.setNoise(noise)
    this.setSpeed(speed)
  }
}

let currentWave: SiriWave | null = null

function initAll() {
  if (currentWave) {
    currentWave.stop()
  }
  currentWave = new SiriWave()
  currentWave.setSpeed(0.01)
  currentWave.start()
}

function debounce(func: () => void, wait: number) {
  let timeout: number | undefined
  return function () {
    clearTimeout(timeout)
    timeout = window.setTimeout(() => {
      func()
    }, wait)
  }
}

onMounted(() => {
  initAll()
  window.addEventListener(
    'resize',
    debounce(() => {
      if (currentWave) {
        currentWave.stop()
      }
      initAll()
    }, 100),
  )
})
</script>
<style scoped lang="less">
.banner {
  transform: translateZ(0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 100%;
  height: 75vh;
  mask: linear-gradient(to top, transparent, var(--general-background-color) 5%);
  perspective: 1000px;
  overflow: hidden;
  -webkit-user-drag: none;
  transition: height 0.3s;

  &.loadingComplete {
    animation: fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
}

@keyframes float-fade {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(10px);
  }
}

@keyframes fade-blur-in {
  from {
    filter: var(--blur-val);
    transform: scale(1.5);
  }

  to {
    filter: none;
    transform: scale(1);
  }
}

.postViewer {
  height: 50vh;
}

.bg-img {
  background-image: url(../assets/banner/banner.webp);
  html[theme='dark'] & {
    background-image: url(../assets/banner/banner_dark.webp), url(../assets/banner/banner.webp);
  }
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  filter: var(--img-brightness); /* 添加亮度过滤器 */
  transition: filter 0.5s, background-image 0.5s; /* 添加过渡效果 */
}

.bg-video {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 禁用视频拖动 */
  -webkit-user-drag: none;
}

#wave {
  position: absolute;
  bottom: 0;
  z-index: 50;
}
</style>

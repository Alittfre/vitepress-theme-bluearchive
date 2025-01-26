<template>
  <canvas class="fireworks"></canvas>
</template>

<script setup lang="ts">
import { onMounted, watch, onUnmounted } from 'vue'
import { useStore } from '../store'
import anime from 'animejs'

interface MinMax {
  min: number
  max: number
}

interface FireworksConfig {
  colors: string[]
  numberOfParticles: number
  orbitRadius: MinMax
  circleRadius: MinMax
  diffuseRadius: MinMax
  animeDuration: MinMax
}

interface Particle {
  x: number
  y: number
  color?: string
  radius?: number
  alpha?: number
  angle?: number
  lineWidth?: number
  endPos?: { x: number; y: number }
  draw?: () => void
}

const { state } = useStore()

// 清理函数
function cleanup() {
  document.removeEventListener('mousedown', handleMouseDown)
  window.removeEventListener('resize', handleResize)
}

// 将事件处理函数提取出来以便解绑
let handleMouseDown: (e: MouseEvent) => void
let handleResize: () => void

function createFireworks() {
  // 确保在重新创建前清理
  cleanup()
  
  const lightColors = ['102, 167, 221', '62, 131, 225', '33, 78, 194']
  const darkColors = ['252, 146, 174', '202, 180, 190', '207, 198, 255']
  
  const defaultConfig: FireworksConfig = {
    colors: state.darkMode === 'dark' ? darkColors : lightColors,
    numberOfParticles: 20,
    orbitRadius: { min: 50, max: 100 },
    circleRadius: { min: 10, max: 20 },
    diffuseRadius: { min: 50, max: 100 },
    animeDuration: { min: 900, max: 1500 },
  }

  let pointerX = 0
  let pointerY = 0
  const colors = defaultConfig.colors

  const canvasEl = document.querySelector('.fireworks') as HTMLCanvasElement
  const ctx = canvasEl.getContext('2d')!

  function setCanvasSize(canvasEl: HTMLCanvasElement) {
    canvasEl.width = window.innerWidth
    canvasEl.height = window.innerHeight
    canvasEl.style.width = `${window.innerWidth}px`
    canvasEl.style.height = `${window.innerHeight}px`
  }

  function updateCoords(e: MouseEvent | TouchEvent) {
    pointerX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX || e.changedTouches[0]?.clientX
    pointerY = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY || e.changedTouches[0]?.clientY
  }

  function setParticleDirection(p: Particle) {
    const angle = (anime.random(0, 360) * Math.PI) / 180
    const value = anime.random(defaultConfig.diffuseRadius.min, defaultConfig.diffuseRadius.max)
    const radius = [-1, 1][anime.random(0, 1)] * value
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle),
    }
  }

  function createParticle(x: number, y: number): Particle {
    const p: Particle = {
      x,
      y,
      color: `rgba(${colors[anime.random(0, colors.length - 1)]},${anime.random(0.2, 0.8)})`,
      radius: anime.random(defaultConfig.circleRadius.min, defaultConfig.circleRadius.max),
      angle: anime.random(0, 360),
      endPos: setParticleDirection({ x, y }),
      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate((this.angle * Math.PI) / 180)
        ctx.beginPath()
        ctx.moveTo(0, -this.radius!)
        ctx.lineTo(this.radius! * Math.sin(Math.PI / 3), this.radius! * Math.cos(Math.PI / 3))
        ctx.lineTo(-this.radius! * Math.sin(Math.PI / 3), this.radius! * Math.cos(Math.PI / 3))
        ctx.closePath()
        ctx.fillStyle = this.color!
        ctx.fill()
        ctx.restore()
      },
    }
    return p
  }

  function createCircle(x: number, y: number): Particle {
    const p: Particle = {
      x,
      y,
      color: state.darkMode === 'dark' ? 'rgb(233, 179, 237)' : 'rgb(106, 159, 255)',
      radius: 0.1,
      alpha: 0.5,
      lineWidth: 6,
      draw() {
        ctx.globalAlpha = this.alpha!
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius!, 0, 2 * Math.PI, true)
        ctx.lineWidth = this.lineWidth!
        ctx.strokeStyle = this.color!
        ctx.stroke()
        ctx.globalAlpha = 1
      },
    }
    return p
  }

  function renderParticle(anim: anime.AnimeInstance) {
    anim.animatables.forEach(animatable => {
      const target = animatable.target as unknown as Particle
      if (typeof target.draw === 'function') {
        target.draw()
      }
    })
  }

  function animateParticles(x: number, y: number) {
    const circle = createCircle(x, y)
    const particles: Particle[] = Array.from({ length: defaultConfig.numberOfParticles }, () => createParticle(x, y))

    anime.timeline()
      .add({
        targets: particles,
        x(p: Particle) { return p.endPos!.x },
        y(p: Particle) { return p.endPos!.y },
        radius: 0,
        duration: anime.random(defaultConfig.animeDuration.min, defaultConfig.animeDuration.max),
        easing: 'easeOutExpo',
        update: renderParticle,
      })
      .add({
        targets: circle,
        radius: anime.random(defaultConfig.orbitRadius.min, defaultConfig.orbitRadius.max),
        lineWidth: 0,
        alpha: {
          value: 0,
          easing: 'linear',
          duration: anime.random(600, 800),
        },
        duration: anime.random(1200, 1800),
        easing: 'easeOutExpo',
        update: renderParticle,
      }, 0)
  }

  const render = anime({
    duration: Number.POSITIVE_INFINITY,
    update: () => {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)
    },
  })

  handleResize = () => setCanvasSize(canvasEl)
  handleMouseDown = (e: MouseEvent) => {
    render.play()
    updateCoords(e)
    animateParticles(pointerX, pointerY)
  }

  document.addEventListener('mousedown', handleMouseDown)
  window.addEventListener('resize', handleResize)
  setCanvasSize(canvasEl)
}

onMounted(() => {
  createFireworks()
})

// 监听暗色模式变化
watch(() => state.darkMode, () => {
  createFireworks()
})

// 组件卸载时清理
onUnmounted(() => {
  cleanup()
})
</script>

<style scoped>
.fireworks {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  pointer-events: none;
}
</style>

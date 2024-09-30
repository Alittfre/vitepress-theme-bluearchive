<template>
  <div
    class="welcome-box"
    ref="welcomeBoxRef"
    @mousemove="parallax"
    @mouseleave="reset"
    :style="{ transform: `rotateY(${calcY}deg) rotateX(${calcX}deg)` }"
  >
    <transition name="fade-up" appear>
      <span v-if="visible" class="welcome-text">{{ welcomeText }}</span>
    </transition>
    <transition name="fade-up" appear>
      <div
        v-if="visible"
        class="info-box"
        :style="{
          background: `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5))`,
        }"
      >
        <img @dragstart.prevent src="../assets/banner/avatar.jpg" alt="" class="avatar" />
        <span class="name">{{ name }}</span>
        <span class="motto">
          {{ mottoText }}
          <span class="pointer"></span>
        </span>
        <ul>
          <li v-for="item in social" :key="item.url">
            <a :href="item.url" target="_blank" rel="noopener noreferrer">
              <i :class="`iconfont icon-${item.icon} social`"></i>
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

const themeConfig = useData().theme.value
const name = themeConfig.name
const welcomeText = themeConfig.welcomeText
const motto = themeConfig.motto
const social = themeConfig.social

const multiple = 30
const welcomeBoxRef = ref<HTMLElement | null>(null)
const calcY = ref(0)
const calcX = ref(0)
const angle = ref(0)
const visible = ref(false)

const parallax = (e: MouseEvent) => {
  if (welcomeBoxRef.value) {
    window.requestAnimationFrame(() => {
      const box = welcomeBoxRef.value!.getBoundingClientRect()
      calcY.value = (e.clientX - box.x - box.width / 2) / multiple
      calcX.value = -(e.clientY - box.y - box.height / 2) / multiple
      angle.value = Math.floor(
        getMouseAngle(e.clientY - box.y - box.height / 2, e.clientX - box.x - box.width / 2),
      )
    })
  }
}

const getMouseAngle = (x: number, y: number) => {
  const radians = Math.atan2(y, x)
  let angle = radians * (180 / Math.PI)

  if (angle < 0) {
    angle += 360
  }

  return angle
}

const reset = () => {
  calcX.value = calcY.value = angle.value = 0
}

let index = 0
const mottoText = ref('')
const randomMotto = motto[Math.floor(Math.random() * motto.length)]

const addNextCharacter = () => {
  if (index < randomMotto.length) {
    mottoText.value += randomMotto[index]
    index++
    setTimeout(addNextCharacter, Math.random() * 150 + 50)
  }
}

onMounted(() => {
  addNextCharacter()
  setTimeout(() => {
    visible.value = true
  }, 50)
})
</script>

<style scoped lang="less">
.welcome-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transform-style: preserve-3d;
  transition: all 0.2s;
  perspective: 1000px;
  padding-bottom: 12vh;
}

.fade-up-enter-active {
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.welcome-text {
  font-size: 80px;
  font-weight: bold;
  color: var(--foreground-color);
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  text-align: center;
  margin-bottom: 100px;
  transition: transform 0.5s ease;
  user-select: none;

  &:hover {
    transform: scale(1.05);
  }
}

.info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 60px 40px 35px 40px;
  width: 720px;
  border-radius: 50px;
  border: solid 2px var(--foreground-color);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: var(--blur-val) saturate(120%);

  .avatar {
    position: absolute;
    top: -25%;
    left: 50%;
    transform: translateX(-50%);
    width: 128px;
    height: 128px;
    border-radius: 50%;
    border: solid 3px var(--foreground-color);
    margin-bottom: 20px;
    transition: transform 0.6s ease, box-shadow 0.4s ease;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    cursor: pointer;

    &:hover {
      transform: translateX(-50%) rotate(1turn) scale(1.1);
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
    }
  }

  .name {
    font-size: 25px;
    margin-bottom: 28px;
    margin-top: 24px;
  }
  .motto {
    font-size: 19px;
    font-weight: bold;
    animation: color-change 0.8s linear infinite;
    padding-right: 4px;
    margin-bottom: 1px;
    text-align: center;
    .pointer {
      display: inline-block;
      margin: -5px 0 0 2px;
      padding: 0;
      vertical-align: middle;
      width: 2px;
      height: 16px;
      animation: color-change 0.8s linear infinite;
      background-color: var(--pointerColor);
    }
    @keyframes color-change {
      0%,
      40% {
        --pointerColor: var(--font-color-grey);
      }

      60%,
      100% {
        --pointerColor: transparent;
      }
    }
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    width: 200px;
    padding: 0;

    .social {
      font-size: 32px;
      transition: all 0.5s;
      color: var(--font-color-grey);

      &:hover {
        filter: drop-shadow(0 0 5px var(--font-color-grey));
      }
    }
  }
}

@media (max-width: 768px) {
  .banner {
    .welcome-text {
      font-size: 45px;
      margin-top: -20px;
    }

    .info-box {
      width: 78vw;
    }

    .name {
      font-size: 22px;
    }

    .motto {
      font-size: 17px;
    }

    ul {
      width: 180px;
    }
  }
}
</style>

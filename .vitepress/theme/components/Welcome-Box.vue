<template>
  <div
    class="welcome-box"
    ref="welcomeBoxRef"
    @mousemove="parallax"
    @mouseleave="reset"
    :style="{ transform: `rotateY(${calcY}deg) rotateX(${calcX}deg)` }"
  >
    <span class="welcome-text">{{ welcomeText }}</span>
    <transition name="fade" appear>
      <div
        class="info-box"
        :style="{
          background: `linear-gradient(${angle}deg, var(--infobox-background-initial), var(--infobox-background-final))`,
        }"
      >
        <img @dragstart.prevent src="../assets/banner/avatar.webp" alt="" class="avatar" />
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
})
</script>

<style scoped lang="less">
.welcome-box {
  margin-top: 4.2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: transform 0.2s, color 0.5s, text-shadow 0.5s;
}

.welcome-text {
  font-size: 4.5vw;
  font-weight: bold;
  color: var(--welcome-text-color);
  text-shadow: var(--welcome-text-shadow);
  text-align: center;
  margin-bottom: 5vw;
  user-select: none;
}

.info-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 6vh 2vw 3vh;
  width: 40vw;
  border-radius: 3vw;
  box-shadow: var(--info-box-shadow);
  backdrop-filter: var(--blur-val) saturate(120%);

  .avatar {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 7.5vw;
    height: 7.5vw;
    border-radius: 50%;
    border: solid 3px var(--infobox-border-color);
    transition: transform 0.6s ease, box-shadow 0.4s ease, filter 0.5s;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);
    cursor: pointer;
    user-select: none;
    filter: var(--img-brightness);

    &:hover {
      transform: translate(-50%, -50%) rotate(1turn) scale(1.1);
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.6);
    }
  }

  .name {
    font-size: 1.5vw;
    margin-top: 3vh;
  }
  .motto {
    font-size: 1vw;
    font-weight: bold;
    animation: color-change 0.8s linear infinite;
    margin-top: 3vh;
    text-align: center;
    .pointer {
      display: inline-block;
      margin: -0.5vh 0 0;
      padding: 0;
      vertical-align: middle;
      width: 2px;
      height: 1vw;
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
    margin-top: 3.5vh;
    width: 12vw;
    padding: 0;

    .social {
      font-size: 1.5vw;
      font-weight: 600;
      transition: all 0.5s;
      color: var(--font-color-grey);

      &:hover {
        filter: drop-shadow(0 0 5px var(--font-color-grey));
      }
    }
  }
}

@media (max-width: 768px) {
  .welcome-text {
    font-size: 5vh;
    margin-bottom: 10vh;
  }

  .info-box {
    padding: 5vh 6vw 2vh;
    width: 75vw;
    border-radius: 4vh;

    .avatar {
      width: 10vh;
      height: 10vh;
    }

    .name {
      font-size: 2.5vh;
      margin-top: 1.8vh;
    }
    .motto {
      font-size: 1.5vh;
      margin-top: 1.5vh;
      .pointer {
        height: 1.5vh;
      }
    }

    ul {
      margin-top: 1.8vh;
      width: 32vw;

      .social {
        font-size: 2vh;
      }
    }
  }
}
</style>

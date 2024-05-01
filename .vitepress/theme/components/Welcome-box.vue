<template>
  <div
    class="welcomeBox"
    ref="welcomeBoxRef"
    @mousemove="parallax"
    @mouseleave="reset"
    :style="{ transform: `rotateY(${calcY}deg) rotateX(${calcX}deg)` }"
  >
    <span class="welcomeText">{{ welcomeText }}</span>
    <div
      class="infoBox"
      :style="{
        background: `linear-gradient(${angle}deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.5))`,
      }"
    >
      <img :src="avatar" alt="" class="avatar" />
      <span class="name">{{ name }}</span>
      <span>{{ motto }}</span>
      <ul>
        <li v-for="item in social">
          <a :href="item.url"><img :src="item.icon" alt="" /></a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
const themeConfig = useData().theme.value
const name = themeConfig.name
const welcomeText = themeConfig.welcomeText
const avatar = themeConfig.avatar
const motto = themeConfig.motto
const social = themeConfig.social

import { ref } from 'vue'
const multiple = 30
const welcomeBoxRef = ref<HTMLElement | null>(null)
let calcY = ref(0)
let calcX = ref(0)
let angle = ref(0)
const parallax = (e: MouseEvent) => {
  window.requestAnimationFrame(() => {
    let box = welcomeBoxRef!.value!.getBoundingClientRect()
    calcY.value = (e.clientX - box.x - box.width / 2) / multiple
    calcX.value = -(e.clientY - box.y - box.height / 2) / multiple
    angle.value = Math.floor(
      getMouseAngle(e.clientY - box.y - box.height / 2, e.clientX - box.x - box.width / 2),
    )
  })
}
function getMouseAngle(x, y) {
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
</script>
<style scoped lang="less">
.welcomeBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 10px 0 10px;
  z-index: 100;
  transform-style: preserve-3d;
  transition: all 0.2s;
}

.welcomeText {
  font-size: 80px;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
}

.infoBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 80px;
  padding-top: 50px;
  height: 200px;
  width: 720px;
  border-radius: 32px;
  border: solid 2px white;
  backdrop-filter: var(--blur-val);
  .avatar {
    position: absolute;
    top: -25%;
    left: 50%;
    transform: translateX(-50%);
    width: 128px;
    height: auto;
    border-radius: 50%;
    border: solid 3px white;
    transition: all 0.5s;

    &:hover {
      transform: translateX(-50%) rotate(1turn);
    }
  }

  .name {
    font-weight: normal;
  }

  span {
    margin-top: 10px;
    font-weight: bold;
    color: var(--font-color-grey);
    text-align: center;
    margin-right: 16px;
    margin-left: 16px;
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    width: 200px;
    padding: 0;

    img {
      width: 32px;
      transition: all 0.5s;

      &:hover {
        filter: drop-shadow(0 0 5px var(--font-color-grey));
      }
    }
  }
}

@media (max-width: 720px) {
  .banner {
    .welcomeText {
      font-size: 50px;
    }

    .infoBox {
      width: 100%;
    }
  }
}
</style>

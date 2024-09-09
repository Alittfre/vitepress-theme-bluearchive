<template>
  <header :class="{ postViewer: state.currPost.href }">
    <nav class="container">
      <span class="logo"><img @dragstart.prevent src="../assets/icon/navLogo.svg" alt="" /></span>
      <span class="menu">
        <ul>
          <li v-for="item in menuList">
            <a :href="base + item.url">{{ item.name }}</a>
          </li>
        </ul>
      </span>
      <span class="control">
        <span class="music-control" @click="toggleMusic">
          <i :class="isPlaying ? 'iconfont icon-continue continue' : 'iconfont icon-stop stop'"></i>
        </span>
        <span class="iconfont icon-search search" @click="showDialog = true"></span>
      </span>
    </nav>
  </header>
  <SearchDialog v-if="showDialog" @close-dialog="closeDialog"></SearchDialog>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

const base = useData().site.value.base
const themeConfig = useData().theme.value
const menuList = themeConfig.menuList

import { useStore } from '../store'
const { state } = useStore()

import SearchDialog from './Search-Dialog.vue'

const showDialog = ref(false)
const isPlaying = ref(false) // 音乐播放状态
const music = ref<HTMLAudioElement | null>(null)

const closeDialog = () => {
  showDialog.value = false
}

const toggleMusic = () => {
  if (music.value) {
    if (isPlaying.value) {
      music.value.pause()
    } else {
      music.value.play().catch((err) => console.log("播放失败: ", err))
    }
    isPlaying.value = !isPlaying.value
  }
}

onMounted(() => {
  music.value = document.getElementById('background-music') as HTMLAudioElement
  if (music.value) {
    music.value.volume = 0.3 // 设置音量为30%
    music.value.pause() // 初始状态为暂停
  }
})
</script>

<style scoped lang="less">
.postViewer {
  height: 50vh;
}

header {
  height: 80vh;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    height: 72px;
    z-index: 100;
    box-sizing: border-box;
    padding: 0 16px;
    border-radius: 0 0 30px 30px;
    border-bottom: solid 2px white;
    border-left: solid 2px white;
    border-right: solid 2px white;
    background: linear-gradient(0.25turn, transparent, white 25%), var(--triangle-background);
    backdrop-filter: var(--blur-val);
    box-shadow: var(--blue-shadow);
  }

  .logo {
    img {
      height: 36px;
      width: auto;
      filter: drop-shadow(0 0 5px rgba(18, 138, 250, 0.5));
    }
  }

  .menu {
    margin-left: 45px; 
    ul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0;
      margin: 0;

      li {
        a {
          display: block;
          padding: 10px 16px 10px 16px;
          border-radius: 8px;
          font-size: 20px;
          font-weight: 600;
          color: var(--font-color-grey);
          transition: all 0.5s;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);

          &:hover {
            color: var(--font-color-gold);
            background-color: var(--btn-background);
            transform: translateY(-2px);
          }
        }
      }
    }
  }
  
  // 控制栏
  .control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin: 0;
    width: 100px;
    .search {
      cursor: pointer;
      font-size: 36px;
      color: var(--font-color-grey);
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      &:hover {
        transform: translateY(-3px);
      }
    }

    .icon-continue {
      display: flex; 
      align-items: center;
      justify-content: center;
      font-size: 36px;
      color: var(--font-color-grey);
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      &:hover {
        transform: translateY(-3px);
      }
    }
    .icon-stop {
      display: flex; 
      align-items: center;
      justify-content: center;
      font-size: 36px; 
      color: var(--font-color-grey);
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
      &:hover {
        transform: translateY(-3px);
      }
    }
  }
}

@media (min-width: 768px) {
  .menu {
    li {
      margin: 0 50px;
      a {
          font-size: 18px;
      }
    }
  }
}
</style>

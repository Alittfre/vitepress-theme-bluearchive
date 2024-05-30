<template>
  <header :class="{ postViewer: state.currPost.href }">
    <nav class="container">
      <span class="logo"><img src="../assets/icon/navLogo.svg" alt="" /></span>
      <span class="menu">
        <ul>
          <li v-for="item in menuList">
            <a :href="base + item.url">{{ item.name }}</a>
          </li>
        </ul>
      </span>
      <span class="iconfont icon-search search" @click="showDialog = true">
      </span>
    </nav>
  </header>
  <SearchDialog v-if="showDialog" @close-dialog="closeDialog"></SearchDialog>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
const base = useData().site.value.base
const themeConfig = useData().theme.value
const menuList = themeConfig.menuList

import { useStore } from '../store'
const { state } = useStore()

import SearchDialog from './Search-Dialog.vue'
import { ref } from 'vue'
const showDialog = ref(false)
const closeDialog = () => {
  showDialog.value = false
}
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

          &:hover {
            color: var(--font-color-gold);
            background-color: var(--btn-background);
          }
        }
      }
    }
  }

  .search {
    cursor: pointer;
    font-size: 36px;
    color: var(--icon-color);
  }
}

@media (min-width: 768px) {
  .menu {
    li {
      margin: 0 50px;
    }
  }
}
</style>

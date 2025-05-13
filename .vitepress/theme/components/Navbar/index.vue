<template>
  <header :class="{ postViewer: state.currPost.href }" class="container">
    <nav>
      <span class="logo">
        <img @dragstart.prevent src="../../assets/icon/navLogo.svg" alt="" />
      </span>
      <span class="menu">
        <ul>
          <li v-for="item in menuList">
            <a :href="base + item.url" @click="handleNavClick(item.url)">{{ item.name }}</a>
          </li>
        </ul>
      </span>
      <div
        class="hamburger"
        :class="{ active: state.showDropdownMenu }"
        @click="toggleDropdownMenu"
      >
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
      <DropdownMenu :showMenu="state.showDropdownMenu"></DropdownMenu>
    </nav>
  </header>
  <SearchDialog v-if="state.searchDialog" @close-dialog="closeDialog"></SearchDialog>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'

const base = useData().site.value.base
const themeConfig = useData().theme.value
const menuList = themeConfig.menuList

import { useStore } from '../../store'
const { state } = useStore()

import SearchDialog from './Search-Dialog.vue'
import DropdownMenu from './Dropdown-Menu.vue'

const closeDialog = () => {
  state.searchDialog = false
}
const toggleDropdownMenu = () => {
  state.showDropdownMenu = !state.showDropdownMenu
}
const resetPage = () => {
  state.currPage = 1
}

const handleNavClick = (url: string) => {
  // 点击首页时重置页码
  if (url === '') {
    resetPage()
  }

  // 点击标签时重置标签和页码
  if (url === 'tags/') {
    resetPage()
    state.currTag = ''
  }
}
</script>

<style scoped lang="less">
.postViewer {
  height: 50vh;
}

header {
  height: 75vh;
  position: relative;
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
    border-radius: 0 0 32px 32px;
    border-bottom: solid 2px var(--foreground-color);
    border-left: solid 2px var(--foreground-color);
    border-right: solid 2px var(--foreground-color);
    background: linear-gradient(0.25turn, transparent, var(--foreground-color) 25%),
      var(--triangle-background);
    backdrop-filter: var(--blur-val);
    box-shadow: 0px 0px 8px rgb(var(--blue-shadow-color), 0.8);
  }

  .logo {
    img {
      height: 32px;
      width: auto;
      filter: drop-shadow(0 0 8px #328cfa);
    }
  }

  .menu {
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;

      li {
        margin: 0 64px;
        a {
          display: block;
          padding: 10px 16px;
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

  .hamburger {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 32px;
    cursor: pointer;
  }

  .hamburger .line {
    display: block;
    width: 80%;
    height: 4px;
    border-radius: 4px;
    background-color: var(--font-color-grey);
    margin-bottom: 4px;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  .hamburger.active .line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }
  .hamburger.active .line:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active .line:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}

@media (max-width: 768px) {
  header {
    nav {
      height: 64px;
    }

    .logo {
      img {
        height: 32px;
      }
    }

    .menu {
      ul {
        li {
          margin: 0 10px;
          a {
            font-size: 16px;
          }
        }
      }
    }

    .hamburger {
      width: 32px;
    }
  }
}
</style>

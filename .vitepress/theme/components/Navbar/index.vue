<template>
  <header :class="{ postViewer: state.currPost.href }">
    <nav class="container">
      <span class="logo">
        <img @dragstart.prevent src="../../assets/icon/navLogo.svg" alt="" />
      </span>
      <span class="menu">
        <ul>
          <li v-for="item in menuList">
            <a :href="base + item.url">{{ item.name }}</a>
          </li>
        </ul>
      </span>
      <span class="MenuMask"></span>
      <label class="hamburger">
        <input type="checkbox" :checked="state.showDropdownMenu" @change="toggleDropdownMenu" />
        <svg viewBox="0 0 32 32">
          <path class="line line-top-bottom"
            d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22">
          </path>
          <path class="line" d="M7 16 27 16"></path>
        </svg>
      </label>
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
    z-index: 200;

    ul {
      display: flex;
      align-items: center;
      justify-content: center;
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

  // 菜单遮罩
  .MenuMask {
    position: fixed;
    top: 0;
    left: 85%;
    right: -2px;
    bottom: -2px;
    background-color: white;
    border-radius: 0 0 30px 30px;
  }


  .hamburger {
    position: relative;
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);

    &:hover {
      transform: translateY(-2px);
    }

    input {
      display: none;
    }

    svg {
      height: 3em;
      transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .line {
      fill: none;
      stroke: rgb(76, 88, 102);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 3;
      transition: stroke-dasharray 500ms cubic-bezier(0.4, 0, 0.2, 1),
        stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .line-top-bottom {
      stroke-dasharray: 12 63;
    }

    input:checked+svg {
      transform: rotate(-45deg);
    }

    input:checked+svg .line-top-bottom {
      stroke-dasharray: 20 300;
      stroke-dashoffset: -32.42;
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

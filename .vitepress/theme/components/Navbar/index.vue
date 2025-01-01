<template>
  <header :class="{ postViewer: state.currPost.href }" class="container">
    <nav>
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
      <div
        class="hamburger"
        :class="{ active: state.showDropdownMenu }"
        @click="toggleDropdownMenu"
      >
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </div>
    </nav>
    <DropdownMenu :showMenu="state.showDropdownMenu"></DropdownMenu>
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
  height: 75vh;
  position: relative;
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    height: 4.2vw;
    z-index: 100;
    box-sizing: border-box;
    padding: 0 1vw;
    border-radius: 0 0 2vw 2vw;
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
      height: 2vw;
      width: auto;
      filter: drop-shadow(0 0 5px rgba(18, 138, 250, 0.5));
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
        margin: 0 3vw;
        a {
          display: block;
          padding: 1vh 0.8vw;
          border-radius: 8px;
          font-size: 1.2vw;
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
    width: 2vw;
    cursor: pointer;
  }

  .hamburger .line {
    display: block;
    width: 80%;
    height: 0.25vw;
    border-radius: 4px;
    background-color: var(--font-color-grey);
    margin-bottom: 0.25vw;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  .hamburger.active .line:nth-child(1) {
    transform: translateY(0.5vw) rotate(45deg);
  }
  .hamburger.active .line:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active .line:nth-child(3) {
    transform: translateY(-0.5vw) rotate(-45deg);
  }
}

@media (max-width: 768px) {
  header {
    nav {
      height: 7vh;
      padding: 0 3.6vw;
      border-radius: 0 0 3vh 3vh;
    }

    .logo {
      img {
        height: 3.2vh;
      }
    }

    .menu {
      ul {
        li {
          margin: 0 5vw;
          a {
            padding: 1vh 3vw;
            font-size: 1.8vh;
          }
        }
      }
    }

    .hamburger {
      width: 3.2vh;
    }

    .hamburger .line {
      height: 0.45vh;
      margin-bottom: 0.5vh;
    }

    .hamburger.active .line:nth-child(1) {
      transform: translateY(0.95vh) rotate(45deg);
    }

    .hamburger.active .line:nth-child(3) {
      transform: translateY(-0.95vh) rotate(-45deg);
    }
  }
}
</style>

<template>
  <div class="dropdown-menu" ref="dropdownMenu">
    <div class="menu-content">
      <div class="first-row">
        <MusicControl></MusicControl>
        <SearchButton></SearchButton>
      </div>
      <ToggleSwitch></ToggleSwitch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MusicControl from './Music-Control.vue'
import SearchButton from './Search-Button.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import { useStore } from '../../store'
const { state } = useStore()

const dropdownMenu = ref(null)
// 监听点击事件并判断是否在元素内
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownMenu.value && !dropdownMenu.value.contains(event.target as Node)) {
    setTimeout(() => {
      state.showDropdownMenu = false;
    }, 1); // 避免与点击菜单控件时相冲突
  }
}

// 监听 showDropdownMenu 的变化
watch(
  () => state.showDropdownMenu,
  (newValue) => {
    if (newValue) {
      // showDropdownMenu 为 true 时，添加全局点击监听
      document.addEventListener('click', handleClickOutside);
    } else {
      // showDropdownMenu 为 false 时，移除全局点击监听
      document.removeEventListener('click', handleClickOutside);
    }
  }
);
</script>

<style scoped lang="less">
.dropdown-menu {
  position: fixed;
  top: -60.7%;
  right: -2.1px;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;

  .menu-content {
    position: relative;
    width: auto;
    max-width: 768px;
    background-color: white;
    border-radius: 0 0 30px 30px;
    padding: 23px;
    padding-top: 70px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .first-row {
    display: flex;
    gap: 5px;
    padding: 5px;
    padding-bottom: 10px;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    // 分隔条
    &::after {
      content: '';
      position: fixed;
      top: 58%;
      left: 24%;
      width: 52%;
      height: 1px;
      background-color: var(--font-color-grey);
      border-radius: 1px;
    }
  }
}

.dropdown-menu[showmenu='true'] {
  transform: translateY(40px);
  .menu-content {
    box-shadow: var(--blue-shadow);
    transition: box-shadow 0.2s;
  }
  transition:
    top 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.63s cubic-bezier(.7, .5, .2, 1.24);
}

.dropdown-menu[showmenu='false'] {
  transform: translateY(-91px);
  .menu-content {
    box-shadow: none;
    transition: box-shadow 3s;
  }
  transition: 
    top 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.6s cubic-bezier(.9, -0.33, .51, 1.07);
}
</style>

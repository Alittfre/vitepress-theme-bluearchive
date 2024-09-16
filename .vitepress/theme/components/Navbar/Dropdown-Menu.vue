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
  right: -1.2px;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  .menu-content {
    position: relative;
    width: auto;
    max-width: 768px;
    background-color: white;
    border-radius: 16px;
    padding: 23px;
    padding-top: 60px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0.8px 0 rgba(40, 135, 200, 0.6);
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
    &::after {
      content: '';
      position: fixed;
      top: 56%;
      left: 24%;
      width: 52%;
      height: 1px;
      background-color: var(--font-color-grey);
      border-radius: 50%; 
    }
  }
}

.dropdown-menu[showmenu='true'] {
  top: -110%;
  transform: translateY(80px);
  transition:
    top 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.6s cubic-bezier(.19,.83,.35,1.15);
}

.dropdown-menu[showmenu='false'] {
  top: -150%;
  transform: translateY(-80px);
  transition:
    top 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.6s cubic-bezier(.68,.1,.3,1);
  .menu-content {
    box-shadow: none;
  }
}
</style>

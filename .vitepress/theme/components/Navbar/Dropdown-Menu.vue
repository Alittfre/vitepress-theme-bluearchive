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
  if (dropdownMenu.value && !(event.target as Node).contains(dropdownMenu.value)) {
    setTimeout(() => {
      state.showDropdownMenu = false
    }, 1) // 避免与点击菜单控件时相冲突
  }
}

// 监听 showDropdownMenu 的变化
watch(
  () => state.showDropdownMenu,
  (newValue) => {
    if (newValue) {
      // showDropdownMenu 为 true 时，添加全局点击监听
      document.addEventListener('click', handleClickOutside)
    } else {
      // showDropdownMenu 为 false 时，移除全局点击监听
      document.removeEventListener('click', handleClickOutside)
    }
  },
)
</script>

<style scoped lang="less">
.dropdown-menu {
  position: absolute;
  z-index: 50;
  bottom: 100%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .menu-content {
    position: relative;
    background-color: var(--foreground-color);
    border-radius: 30px;
    padding: 20px;
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
    border-bottom: 1px dashed var(--font-color-grey);
  }
}

.dropdown-menu[showmenu='true'] {
  transform: translateY(150%);
  .menu-content {
    box-shadow: 0px 0px 8px rgb(var(--blue-shadow-color), 0.8);
    transition: box-shadow 0.2s;
  }
  transition: top 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.63s cubic-bezier(0.7, 0.5, 0.2, 1.24);
}

.dropdown-menu[showmenu='false'] {
  .menu-content {
    box-shadow: none;
    transition: box-shadow 3s;
  }
  transition: top 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.6s cubic-bezier(0.9, -0.33, 0.51, 1.07);
}
</style>

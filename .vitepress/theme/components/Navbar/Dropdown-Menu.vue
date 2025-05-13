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
import { ref, onMounted, onUnmounted } from 'vue'
import MusicControl from './Music-Control.vue'
import SearchButton from './Search-Button.vue'
import ToggleSwitch from './ToggleSwitch.vue'
import { useStore } from '../../store'

const { state } = useStore()
const dropdownMenu = ref<HTMLElement | null>(null)

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const hamburgerEl = document.querySelector('.hamburger')

  // 避免与展开按钮冲突
  if (hamburgerEl && hamburgerEl.contains(target)) {
    return
  }

  if (dropdownMenu.value && !dropdownMenu.value.contains(target) && state.showDropdownMenu) {
    state.showDropdownMenu = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="less">
.dropdown-menu {
  position: absolute;
  z-index: 50;
  top: 100%;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .menu-content {
    position: relative;
    background-color: var(--foreground-color);
    border-radius: 2vw;
    padding: 1.2vw;
    gap: 0.8vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .first-row {
    display: flex;
    gap: 0.4vw;
    padding: 0.3vw;
    padding-bottom: 1vh;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--font-color-grey);
  }
}

.dropdown-menu[showmenu='true'] {
  opacity: 1;
  transform: translateY(15px);
  .menu-content {
    box-shadow: 0px 0px 8px rgb(var(--blue-shadow-color), 0.8);
    transition: box-shadow 0.3s;
  }
  transition: opacity 0.1s ease-in-out, transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.dropdown-menu[showmenu='false'] {
  opacity: 0;
  transform: translateY(2px);
  .menu-content {
    box-shadow: none;
    transition: box-shadow 0.3s;
  }
  transition: opacity 0.2s ease-in-out, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  pointer-events: none;
}

@media (max-width: 768px) {
  .dropdown-menu {
    .menu-content {
      border-radius: 3vh;
      padding: 2vh;
      gap: 1vh;
    }

    .first-row {
      gap: 0.5vh;
      padding: 0.3vh;
      padding-bottom: 1vh;
    }
  }
}
</style>

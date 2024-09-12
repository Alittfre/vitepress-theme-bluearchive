<template>
  <div class="dropdown-menu">
    <div class="menu-content">
      <MusicControl></MusicControl>
      <SearchButton></SearchButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import MusicControl from './Music-Control.vue'
import SearchButton from './Search-Button.vue'
</script>

<style scoped lang="less">
.dropdown-menu {
  position: fixed;
  right: 0;
  z-index: 95;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.9);
  transition: top 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);

  .menu-content {
    position: relative;
    width: auto;
    max-width: 768px;
    background-color: rgb(255, 255, 255);
    border-radius: 16px;
    padding: 30px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: scale(0.9);
    transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }
}

.dropdown-menu[showmenu='true'] {
  top: 100%;
  transform: scale(1);
}

.dropdown-menu[showmenu='false'] {
  top: -200%;
}
</style>

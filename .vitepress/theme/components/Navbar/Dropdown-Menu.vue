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
  right: 1px;
  z-index: 95;
  display: flex;
  justify-content: center;
  align-items: center;
  transition:
    top 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.6s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1);

  .menu-content {
    position: relative;
    width: auto;
    max-width: 768px;
    background-color: white;
    border-radius: 16px;
    padding: 22px;
    padding-top: 60px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 4px rgba(40, 135, 200, 0.6);
    align-items: center;
    transition:
      transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
  }
}

.dropdown-menu[showmenu='true'] {
  top: -110%;
  transform: translateY(80px);
  opacity: 1;
}

.dropdown-menu[showmenu='false'] {
  top: -60%;
  transform: scaleY(0.1);
  opacity: 0;
}
</style>

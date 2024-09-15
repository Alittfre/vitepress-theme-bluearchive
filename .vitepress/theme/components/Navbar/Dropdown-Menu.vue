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
  right: -1.5px;
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
    padding: 25px;
    padding-top: 60px;
    gap: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1.5px 0 rgba(40, 135, 200, 0.6);
    align-items: center;
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

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
import MusicControl from './Music-Control.vue'
import SearchButton from './Search-Button.vue'
import ToggleSwitch from './ToggleSwitch.vue'
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

<template>
  <div ref="playerContainer" class="playerContainer" :style="containerStyle"></div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { spine } from './spine-player.js'

// Define a ref for the container
const playerContainer = ref(null)

// Import and configure the SpinePlayer after the component mounts
onMounted(() => {
  new spine.SpinePlayer(playerContainer.value, {
    skelUrl: "/spine_assets/arona_spr.skel",
    atlasUrl: "/spine_assets/arona_spr.atlas",
    animation: 'Idle_01',
    premultipliedAlpha: true,
    backgroundColor: '#00000000',
    alpha: true,
    showControls: false,
  })
})
</script>

<style scoped lang="less">
.playerContainer {
  position: fixed;
  bottom: 25px;
  left: 1%;
  z-index: 100;
  width: 200px;
  height: 400px;
  filter: drop-shadow(0 0 3px rgba(40, 42, 44, 0.42));
}
@media (max-width: 768px) {
  .playerContainer {
    left: 0;
    width: 150px;
    height: 300px;
    filter: drop-shadow(0 0 3px rgba(40, 42, 44, 0.42));
  }
}
</style>

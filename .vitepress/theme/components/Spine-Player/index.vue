<template>
  <div ref="playerContainer" class="playerContainer"></div>
</template>

<script setup lang="js">
import { onMounted, ref, onUnmounted } from 'vue'
import { spine } from './spine-player.js'

const playerContainer = ref(null)
let player = null

onMounted(() => {
  player = new spine.SpinePlayer(playerContainer.value, {
    skelUrl: "/spine_assets/arona_spr.skel",
    atlasUrl: "/spine_assets/arona_spr.atlas",
    premultipliedAlpha: true,
    backgroundColor: '#00000000',
    alpha: true,
    showControls: false,
    success: function (playerInstance) {
      playerInstance.setAnimation('Idle_01', true)

      const skeleton = playerInstance.skeleton
      const rightEyeBone = skeleton.findBone('R_Eye_01')
      const leftEyeBone = skeleton.findBone('L_Eye_01')

      const rightEyeCenterX = rightEyeBone ? rightEyeBone.data.x : 0
      const rightEyeCenterY = rightEyeBone ? rightEyeBone.data.y : 0
      const leftEyeCenterX = leftEyeBone ? leftEyeBone.data.x : 0
      const leftEyeCenterY = leftEyeBone ? leftEyeBone.data.y : 0

      const maxRadius = 15

      function moveEyes(event) {
        const containerRect = playerContainer.value.getBoundingClientRect()

        const mouseX = event.clientX - (containerRect.right - containerRect.width / 2)
        const mouseY = event.clientY - (containerRect.bottom - containerRect.height * 4 / 5)
        const offsetX = mouseX
        const offsetY = mouseY
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY)

        const angle = Math.atan2(offsetY, offsetX)
        const maxDistance = Math.min(distance, maxRadius)
        const dx = maxDistance * Math.cos(angle)
        const dy = maxDistance * Math.sin(angle)

        if (rightEyeBone) {
          rightEyeBone.x = rightEyeCenterX + dx
          rightEyeBone.y = rightEyeCenterY - dy
        }

        if (leftEyeBone) {
          leftEyeBone.x = leftEyeCenterX + dx
          leftEyeBone.y = leftEyeCenterY - dy
        }

        skeleton.updateWorldTransform()
      }

      function resetEyes() {
        if (rightEyeBone) {
          rightEyeBone.x = rightEyeCenterX
          rightEyeBone.y = rightEyeCenterY
        }

        if (leftEyeBone) {
          leftEyeBone.x = leftEyeCenterX
          leftEyeBone.y = leftEyeCenterY
        }

        skeleton.updateWorldTransform()
      }

      window.addEventListener('mousemove', moveEyes)
      window.addEventListener('mouseout', resetEyes)
    },
    error: function (playerInstance, reason) {
      alert('Spine加载失败: ' + reason)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', moveEyes)
  window.removeEventListener('mouseout', resetEyes)
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

<template>
  <div ref="playerContainer" class="playerContainer"></div>
</template>

<script setup lang="js">
import { onMounted, ref, onUnmounted } from 'vue'
import { spine } from './spine-player.js'

const playerContainer = ref(null)
let player = null
let blinkInterval = null

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
      const animationState = playerInstance.animationState

      const rightEyeBone = skeleton.findBone('R_Eye_01')
      const leftEyeBone = skeleton.findBone('L_Eye_01')
      const frontHeadBone = skeleton.findBone('Head_Rot')
      const backHeadBone = skeleton.findBone('Head_Back')

      const rightEyeCenterX = rightEyeBone ? rightEyeBone.data.x : 0
      const rightEyeCenterY = rightEyeBone ? rightEyeBone.data.y : 0
      const leftEyeCenterX = leftEyeBone ? leftEyeBone.data.x : 0
      const leftEyeCenterY = leftEyeBone ? leftEyeBone.data.y : 0
      const frontHeadCenterX = frontHeadBone ? frontHeadBone.data.x : 0
      const frontHeadCenterY = frontHeadBone ? frontHeadBone.data.y : 0
      const backHeadCenterX = backHeadBone ? backHeadBone.data.x : 0
      const backHeadCenterY = backHeadBone ? backHeadBone.data.y : 0

      const maxRadius = 15
      const frontHeadMaxRadius = 2 // 控制头部移动范围，较小以实现轻微移动
      const backHeadMaxRadius = 1

      const eyeRotationAngle = 76 * (Math.PI / 180) // 76度转换为弧度

      function rotateVector(x, y, angle) {
        const cos = Math.cos(angle)
        const sin = Math.sin(angle)
        return {
          x: x * cos - y * sin,
          y: x * sin + y * cos
        }
      }

      function moveBones(event) {
        const containerRect = playerContainer.value.getBoundingClientRect()

        const mouseX = event.clientX - (containerRect.right - containerRect.width / 2)
        const mouseY = event.clientY - (containerRect.bottom - containerRect.height * 4 / 5)

        // 将鼠标坐标偏移量进行逆旋转
        const rotatedMouse = rotateVector(mouseX, mouseY, -eyeRotationAngle)
        const offsetX = rotatedMouse.x
        const offsetY = rotatedMouse.y
        const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY)

        const angle = Math.atan2(offsetY, offsetX)
        const maxDistance = Math.min(distance, maxRadius)
        const dx = -maxDistance * Math.cos(angle)
        const dy = maxDistance * Math.sin(angle)

        // 眼睛移动
        if (rightEyeBone) {
          rightEyeBone.x = rightEyeCenterX + dx
          rightEyeBone.y = rightEyeCenterY + dy
        }

        if (leftEyeBone) {
          leftEyeBone.x = leftEyeCenterX + dx
          leftEyeBone.y = leftEyeCenterY + dy
        }

        // 头部轻微移动
        const frontHeadDx = Math.min(distance, frontHeadMaxRadius) * Math.cos(angle)
        const frontHeadDy = Math.min(distance, frontHeadMaxRadius) * Math.sin(angle)

        const backHeadDx = Math.min(distance, backHeadMaxRadius) * Math.cos(angle)
        const backHeadDy = Math.min(distance, backHeadMaxRadius) * Math.sin(angle)

        if (frontHeadBone) {
          frontHeadBone.x = frontHeadCenterX - frontHeadDx
          frontHeadBone.y = frontHeadCenterY + frontHeadDy
        }

        if (backHeadBone) {
          backHeadBone.x = backHeadCenterX + backHeadDx
          backHeadBone.y = backHeadCenterY - backHeadDy
        }

        skeleton.updateWorldTransform()
      }

      function resetBones() {
        if (rightEyeBone) {
          rightEyeBone.x = rightEyeCenterX
          rightEyeBone.y = rightEyeCenterY
        }

        if (leftEyeBone) {
          leftEyeBone.x = leftEyeCenterX
          leftEyeBone.y = leftEyeCenterY
        }

        if (frontHeadBone) {
          frontHeadBone.x = frontHeadCenterX
          frontHeadBone.y = frontHeadCenterY
        }

        skeleton.updateWorldTransform()
      }

      function playBlinkAnimation() {
        const randomTime = Math.random() * 3 + 3 // 5-8秒的随机间隔
        const shouldDoubleBlink = Math.random() > 0.5 // 随机决定是否连续播放两次

        animationState.setAnimation(1, 'Eye_Close_01', false) // 在轨道1上播放眨眼动画

        if (shouldDoubleBlink) {
          animationState.addAnimation(1, 'Eye_Close_01', false, 0.1) // 短暂停留后再播放一次
        }

        // 随机时间后再调用眨眼动画
        blinkInterval = setTimeout(playBlinkAnimation, randomTime * 1000)
      }

      window.addEventListener('mousemove', moveBones)
      playBlinkAnimation()
    },
    error: function (playerInstance, reason) {
      alert('Spine加载失败: ' + reason)
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', moveBones)
  if (blinkInterval) clearTimeout(blinkInterval)
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
  }
}
</style>

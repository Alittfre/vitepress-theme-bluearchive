<template>
  <div ref="playerContainer" class="playerContainer"></div>
</template>

<script setup lang="js">
import { onMounted, ref, onUnmounted } from 'vue'
import { spine } from './spine-player.js'

// 定义spine资产信息
const spineAssets = {
  skelUrl: "/spine_assets/arona_spr.skel",
  atlasUrl: "/spine_assets/arona_spr.atlas",
  idleAnimationName: "Idle_01",
  eyeCloseAnimationName: "Eye_Close_01",
  rightEyeBone: "R_Eye_01",
  leftEyeBone: "L_Eye_01",
  frontHeadBone: "Head_Rot",
  backHeadBone: "Head_Back",
  eyeRotationAngle: 76.307,
}
const playerContainer = ref(null)
let player = null
let blinkInterval = null

//底部贴边
const handleScroll = () => {
  const bottomReached = Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight
  if (bottomReached) {
    playerContainer.value.style.left = '-50%'
  } else {
    playerContainer.value.style.left = '0%'
  }
}

onMounted(async () => {
  // 延迟1秒后执行
  await new Promise(r => setTimeout(r, 1000));
  window.addEventListener('scroll', handleScroll)

  player = new spine.SpinePlayer(playerContainer.value, {
    skelUrl: spineAssets.skelUrl,
    atlasUrl: spineAssets.atlasUrl,
    premultipliedAlpha: true,
    backgroundColor: '#00000000',
    alpha: true,
    showControls: false,
    success: function (playerInstance) {
      playerInstance.setAnimation(spineAssets.idleAnimationName, true)
      const skeleton = playerInstance.skeleton
      const animationState = playerInstance.animationState

      const rightEyeBone = skeleton.findBone(spineAssets.rightEyeBone)
      const leftEyeBone = skeleton.findBone(spineAssets.leftEyeBone)
      const frontHeadBone = skeleton.findBone(spineAssets.frontHeadBone)
      const backHeadBone = skeleton.findBone(spineAssets.backHeadBone)

      const rightEyeCenterX = rightEyeBone ? rightEyeBone.data.x : 0
      const rightEyeCenterY = rightEyeBone ? rightEyeBone.data.y : 0
      const leftEyeCenterX = leftEyeBone ? leftEyeBone.data.x : 0
      const leftEyeCenterY = leftEyeBone ? leftEyeBone.data.y : 0
      const frontHeadCenterX = frontHeadBone ? frontHeadBone.data.x : 0
      const frontHeadCenterY = frontHeadBone ? frontHeadBone.data.y : 0
      const backHeadCenterX = backHeadBone ? backHeadBone.data.x : 0
      const backHeadCenterY = backHeadBone ? backHeadBone.data.y : 0

      // 骨骼移动限制
      const maxRadius = 15
      const frontHeadMaxRadius = 2
      const backHeadMaxRadius = 1

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
        const eyeRotation = spineAssets.eyeRotationAngle * (Math.PI / 180) // 眼睛旋转角度
        const rotatedMouse = rotateVector(mouseX, mouseY, -eyeRotation)
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

      // function resetBones() {
      //   if (rightEyeBone) {
      //     rightEyeBone.x = rightEyeCenterX
      //     rightEyeBone.y = rightEyeCenterY
      //   }

      //   if (leftEyeBone) {
      //     leftEyeBone.x = leftEyeCenterX
      //     leftEyeBone.y = leftEyeCenterY
      //   }

      //   if (frontHeadBone) {
      //     frontHeadBone.x = frontHeadCenterX
      //     frontHeadBone.y = frontHeadCenterY
      //   }

      //   skeleton.updateWorldTransform()
      // }

      function playBlinkAnimation() {
        const randomTime = Math.random() * 3 + 3 // 5-8秒的随机间隔
        const shouldDoubleBlink = Math.random() > 0.5 // 随机决定是否连续播放两次

        animationState.setAnimation(1, spineAssets.eyeCloseAnimationName, false) // 在轨道1上播放眨眼动画

        if (shouldDoubleBlink) {
          animationState.addAnimation(1, spineAssets.eyeCloseAnimationName, false, 0.1) // 短暂停留后再播放一次
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
  window.removeEventListener('scroll', handleScroll)
  if (blinkInterval) clearTimeout(blinkInterval)
})
</script>

<style scoped lang="less">
.playerContainer {
  position: fixed;
  bottom: 25px;
  left: 0%;
  z-index: 100;
  width: 200px;
  height: 400px;
  filter: drop-shadow(0 0 3px rgba(40, 42, 44, 0.42));
  transition: all 1s;
}

@media (max-width: 768px) {
  .playerContainer {
    width: 120px;
    height: 240px;
  }
}
</style>

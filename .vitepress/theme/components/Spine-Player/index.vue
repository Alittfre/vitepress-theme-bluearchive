<!--
 todo:
 1. 优化暗色描边
 2. 优化对话框三角布局
 3. 整理代码结构
 -->
<template>
  <template v-if="state.SpinePlayerEnabled">
    <div
      ref="playerContainer"
      class="playerContainer"
      @click="handlePlayerClick"
      @touchstart="handlePlayerClick"
    ></div>
    <transition name="fade">
      <div v-if="showDialog" class="chatdialog-container">
        <div class="chatdialog-triangle"></div>
        <div class="chatdialog">{{ currentDialog }}</div>
      </div>
    </transition>
  </template>
</template>

<script setup lang="js">
import { onMounted, ref, watch, computed } from 'vue'

import { useStore } from '../../store'
const { state } = useStore()

import { useData } from 'vitepress'
const themeConfig = useData().theme.value
const spineVoiceLang = themeConfig.spineVoiceLang

import { spine } from './spine-player.js'

// 定义两套spine资产信息
const spineAssets = {
  arona: {
    skelUrl: "/spine_assets/arona/arona_spr.skel",
    atlasUrl: "/spine_assets/arona/arona_spr.atlas",
    idleAnimationName: "Idle_01",
    eyeCloseAnimationName: "Eye_Close_01",
    rightEyeBone: "R_Eye_01",
    leftEyeBone: "L_Eye_01",
    frontHeadBone: "Head_01",
    backHeadBone: "Head_Back",
    eyeRotationAngle: 76.307,
    voiceConfig: [
      {
        audio: `/spine_assets/arona/audio/${spineVoiceLang}/arona_01.ogg`,
        animation: '12',
        text: '您回来了？我等您很久啦！'
      },
      {
        audio: `/spine_assets/arona/audio/${spineVoiceLang}/arona_02.ogg`,
        animation: '03',
        text: '嗯，不错，今天也是个好天气。'
      },
      {
        audio: `/spine_assets/arona/audio/${spineVoiceLang}/arona_03.ogg`,
        animation: '02',
        text: '天空真是广啊……\n另一边会有些什么呢？'
      },
      {
        audio: `/spine_assets/arona/audio/${spineVoiceLang}/arona_04.ogg`,
        animation: '18',
        text: '偶尔也要为自己的健康着想啊，\n老师，我会很担心的。'
      },
      {
        audio: `/spine_assets/arona/audio/${spineVoiceLang}/arona_05.ogg`,
        animation: '25',
        text: '来，加油吧，老师！'
      },
      {
        audio: `/spine_assets/arona/audio/${spineVoiceLang}/arona_06.ogg`,
        animation: '11',
        text: '今天又会有什么事情在等着我呢？'
      }
    ]
  },
  plana: {
    skelUrl: "/spine_assets/plana/plana_spr.skel",
    atlasUrl: "/spine_assets/plana/plana_spr.atlas",
    idleAnimationName: "Idle_01",
    eyeCloseAnimationName: "Eye_Close_01",
    rightEyeBone: "R_Eye_01",
    leftEyeBone: "L_Eye_01",
    frontHeadBone: "Head_Rot",
    backHeadBone: "Head_Back",
    eyeRotationAngle: 97.331,
    voiceConfig: [
      {
        audio: `/spine_assets/plana/audio/${spineVoiceLang}/plana_02.ogg`,
        animation: '06',
        text: '我明白了，\n老师现在无事可做，很无聊。'
      },
      {
        audio: `/spine_assets/plana/audio/${spineVoiceLang}/plana_01.ogg`,
        animation: '13',
        text: '混乱，该行动无法理解。\n请不要戳我，会出现故障。'
      },
      {
        audio: `/spine_assets/plana/audio/${spineVoiceLang}/plana_03.ogg`,
        animation: '15',
        text: '确认连接。'
      },
      {
        audio: `/spine_assets/plana/audio/${spineVoiceLang}/plana_04.ogg`,
        animation: '99',
        text: '正在待命，\n需要解决的任务还有很多。'
      },
      {
        audio: `/spine_assets/plana/audio/${spineVoiceLang}/plana_05.ogg`,
        animation: '17',
        text: '等您很久了。'
      },
    ]
  }
}

const playerContainer = ref(null)
let player = null
let blinkInterval = null
let isEyeControlDisabled = ref(false)
let eyeControlTimer = null
let currentAnimationState = null  // 添加动画状态引用
let currentCharacter = ref('arona')
let audioPlayers = []

// 添加客户端就绪状态
const clientReady = ref(false)

// 添加音频上下文管理器
const AudioManager = {
  context: null,
  buffers: new Map(),
  currentSource: null,
  gainNode: null,

  initialize() {
    if (!clientReady.value) return
    if (!this.context) {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      // 创建增益节点，设置音量为50%
      this.gainNode = this.context.createGain();
      this.gainNode.gain.value = 0.5;
      this.gainNode.connect(this.context.destination);
    }
  },

  async loadAudioFile(url) {
    if (this.buffers.has(url)) {
      const entry = this.buffers.get(url);
      entry.lastUsed = Date.now();
      return entry.buffer;
    }

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      this.buffers.set(url, { buffer: audioBuffer, lastUsed: Date.now() });
      return audioBuffer;
    } catch (error) {
      console.error('音频加载失败:', error);
      return null;
    }
  },

  async playAudio(buffer) {
    if (this.currentSource) {
      this.currentSource.stop();
    }

    return new Promise((resolve) => {
      const source = this.context.createBufferSource();
      source.buffer = buffer;
      // 连接到增益节点而不是直接连接到目标
      source.connect(this.gainNode);
      source.onended = () => {
        if (this.currentSource === source) {
          this.currentSource = null;
        }
        resolve();
      };
      this.currentSource = source;
      source.start();
    });
  },

  clear() {
    if (this.currentSource) {
      this.currentSource.stop();
      this.currentSource = null;
    }
    this.buffers.clear();
  },

  gc() {
    // 清除超过5分钟未使用的音频缓存
    const now = Date.now()
    for (const [url, entry] of this.buffers.entries()) {
      if (now - entry.lastUsed > 300000) { // 5分钟
        this.buffers.delete(url)
      }
    }
  }
}

// 修改预加载音频函数
const preloadAudio = async () => {
  if (!currentAssets.value) return false

  AudioManager.initialize()
  AudioManager.gc() // 清理过期缓存

  const loadPromises = currentAssets.value.voiceConfig.map(pair =>
    AudioManager.loadAudioFile(pair.audio)
  )

  return Promise.all(loadPromises).catch(error => {
    console.error('音频预加载失败:', error)
    return false
  })
}

const handleScroll = () => {
  if (!clientReady.value || !playerContainer.value) return
  const bottomReached = window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight
  const chatDialog = document.querySelector('.chatdialog')

  if (isMobileDevice()) {
    if (bottomReached) {
      playerContainer.value.style.left = '-50%'
      if (chatDialog) {
        chatDialog.style.left = '-50%'
      }
    } else {
      playerContainer.value.style.left = '0%'
    }
  }
}

const isMobileDevice = () => {
  if (!clientReady.value) return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

let isPlaying = false // 添加播放状态标志

const showDialog = ref(false)
const currentDialog = ref('')

let lastPlayedIndex = -1 // 添加上一次播放的索引记录

// 添加防抖处理
const debounce = (fn, delay) => {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

// 在组件作用域添加重置状态引用
const resetBonesState = ref(null)

// 点击处理函数
const handlePlayerClick = debounce(async (event) => {
  event.preventDefault();
  event.stopPropagation();

  // 检查是否正在播放
  if (!isPlaying) {
    isPlaying = true
    isEyeControlDisabled.value = true

    // 点击时重置眼睛位置
    resetBonesState.value?.()

    const currentConfig = spineAssets[currentCharacter.value].voiceConfig
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * currentConfig.length)
    } while (randomIndex === lastPlayedIndex && currentConfig.length > 1)

    lastPlayedIndex = randomIndex
    const selectedPair = currentConfig[randomIndex]

    try {
      const buffer = await AudioManager.loadAudioFile(selectedPair.audio);
      if (!buffer) throw new Error('音频加载失败');

      currentDialog.value = selectedPair.text;
      showDialog.value = true;

      currentAnimationState.addAnimation(2, selectedPair.animation, false, 0);

      // 播放音频并等待结束
      await AudioManager.playAudio(buffer);

      // 音频播放结束后清理状态
      isPlaying = false;
      isEyeControlDisabled.value = false;
      currentAnimationState.setEmptyAnimation(2, 0);
      showDialog.value = false;

    } catch (error) {
      console.error('音频播放失败:', error);
      isPlaying = false;
      isEyeControlDisabled.value = false;
      showDialog.value = false;
    }
  }
}, 300)

// 提升 moveBones 函数到组件作用域以便在其他地方使用
let moveBonesHandler = null

const initializeSpinePlayer = async (assets) => {
  try {
    // 清理旧的实例
    if (blinkInterval) {
      clearTimeout(blinkInterval);
    }

    // 清理容器内容
    if (playerContainer.value) {
      playerContainer.value.innerHTML = '';
    }

    player = new spine.SpinePlayer(playerContainer.value, {
      skelUrl: assets.skelUrl,
      atlasUrl: assets.atlasUrl,
      premultipliedAlpha: true,
      backgroundColor: '#00000000',
      alpha: true,
      showControls: false,
      success: function (playerInstance) {
        playerInstance.setAnimation(assets.idleAnimationName, true)
        const skeleton = playerInstance.skeleton
        const animationState = playerInstance.animationState
        currentAnimationState = animationState  // 保存动画状态引用

        const rightEyeBone = skeleton.findBone(assets.rightEyeBone)
        const leftEyeBone = skeleton.findBone(assets.leftEyeBone)
        const frontHeadBone = skeleton.findBone(assets.frontHeadBone)
        const backHeadBone = skeleton.findBone(assets.backHeadBone)

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
          // 如果眼睛控制被禁用，直接返回
          if (isEyeControlDisabled.value) return

          const containerRect = playerContainer.value.getBoundingClientRect()

          const mouseX = event.clientX - (containerRect.right - containerRect.width / 2)
          const mouseY = event.clientY - (containerRect.bottom - containerRect.height * 4 / 5)

          // 将鼠标坐标偏移量进行逆旋转
          const eyeRotation = assets.eyeRotationAngle * (Math.PI / 180) // 眼睛旋转角度
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

          if (backHeadBone) {
            backHeadBone.x = backHeadCenterX
            backHeadBone.y = backHeadCenterY
          }

          skeleton.updateWorldTransform()
        }

        // 保存重置函数引用
        resetBonesState.value = resetBones

        function playBlinkAnimation() {
          const randomTime = Math.random() * 3 + 3 // 5-8秒的随机间隔
          const shouldDoubleBlink = Math.random() > 0.5 // 随机决定是否连续播放两次

          animationState.setAnimation(1, assets.eyeCloseAnimationName, false) // 在轨道1上播放眨眼动画

          if (shouldDoubleBlink) {
            animationState.addAnimation(1, assets.eyeCloseAnimationName, false, 0.1) // 短暂停留后再播放一次
          }

          // 随机时间后再调用眨眼动画
          blinkInterval = setTimeout(playBlinkAnimation, randomTime * 1000)
        }

        // 修改鼠标移动监听器的添加逻辑
        if (!isMobileDevice()) {
          moveBonesHandler = moveBones
          window.addEventListener('mousemove', moveBonesHandler)
        }
        playBlinkAnimation()
      },
      error: function (playerInstance, reason) {
        console.error('Spine加载失败: ' + reason)
      }
    })
  } catch(err) {
    console.error('Failed to initialize spine player:', err);
  }
}

// 将需要监听的状态提取为响应式引用
const isDarkMode = computed(() => state.darkMode === 'dark')
const isEnabled = computed(() => state.SpinePlayerEnabled)
const currentAssets = computed(() => spineAssets[currentCharacter.value])

// 事件委托
const handleEvents = (event) => {
  if (event.type === 'scroll') {
    handleScroll()
  } else if (['mousemove', 'touchmove'].includes(event.type)) {
    moveBonesHandler?.(event)
  }
}

// 统一的清理函数
const cleanup = () => {
  if (blinkInterval) clearTimeout(blinkInterval)
  if (eyeControlTimer) clearTimeout(eyeControlTimer)

  // 清理监听事件
  window.removeEventListener('scroll', handleEvents)
  if (moveBonesHandler && !isMobileDevice()) {
    window.removeEventListener('mousemove', moveBonesHandler)
    moveBonesHandler = null
  }

  if (playerContainer.value) {
    playerContainer.value.innerHTML = ''
  }
  if (player) {
    AudioManager.clear()
    player = null
    currentAnimationState = null
  }

  // 使用 WeakRef 来管理音频资源
  if (clientReady.value && window.WeakRef) {
    audioPlayers = audioPlayers.filter(player => {
      const ref = new WeakRef(player)
      return ref.deref() !== null
    })
  }
}

// 初始化函数
const initializeCharacter = async () => {
  cleanup()

  if (!isEnabled.value || !playerContainer.value) return

  currentCharacter.value = isDarkMode.value ? 'plana' : 'arona'

  try {
    await Promise.all([
      preloadAudio(),
      initializeSpinePlayer(currentAssets.value)
    ])
  } catch (err) {
    console.error('初始化失败:', err)
  }
}

const debouncedInitialize = debounce(initializeCharacter, 300)

// 监听主题切换和spine开关
watch([isDarkMode, isEnabled], async ([dark, enabled], [prevDark, prevEnabled]) => {
  if (enabled !== prevEnabled) {
    if (enabled) {
      // 启用时初始化
      debouncedInitialize()
    } else {
      // 禁用时清理资源
      cleanup()
    }
  } else if (enabled && dark !== prevDark) {
    // 主题变更且启用状态下重新初始化
    debouncedInitialize()
  }
}, { immediate: true })


onMounted(() => {
  // 设置客户端就绪状态
  clientReady.value = true

  const options = { passive: true }
  window.addEventListener('scroll', handleEvents, options)
  if (!isMobileDevice()) {
    window.addEventListener('mousemove', handleEvents, options)
  }

  // 如果启用了Spine播放器，初始化
  if (state.SpinePlayerEnabled) {
    debouncedInitialize()
  }
})
</script>

<style scoped lang="less">
.playerContainer {
  position: fixed;
  bottom: 25px;
  left: 0%;
  z-index: 100;
  width: 12vw;
  height: 24vw;
  filter: drop-shadow(0 0 3px rgba(40, 42, 44, 0.42));
  transition: all 1s;
  cursor: pointer;
}
.chatdialog-container {
  position: fixed;
  bottom: 10vw;
  left: 2vw;
  z-index: 101;
  transition: all 1s;
  pointer-events: none;
  filter: drop-shadow(0 0 3px rgba(36, 36, 36, 0.6));
}

.chatdialog-triangle {
  position: absolute;
  left: 2vw;
  top: -10px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid rgba(255, 255, 255, 0.9);
  z-index: 101;
}

.chatdialog {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  padding: 12px 24px;
  word-wrap: break-word;
  white-space: pre-wrap;
  line-height: 1.4;
  color: #000000;
  font-size: 0.8vw;
  user-select: none;
  pointer-events: auto;
}

// 添加淡入淡出动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .chatdialog-container {
    left: 2vh;
    bottom: 10vh;
  }

  .chatdialog {
    min-width: auto;
    padding: 12px 20px;
    font-size: 1vh;
    border-radius: 20px;
  }

  .chatdialog-triangle {
    left: 35px;
    border-width: 8px;
    top: -8px;
  }

  .playerContainer {
    width: 15vh;
    height: 30vh;
  }
}
</style>

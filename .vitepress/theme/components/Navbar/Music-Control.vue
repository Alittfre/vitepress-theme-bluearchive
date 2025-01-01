<template>
  <span class="music-control" @click="toggleMusic">
    <i :class="isPlaying ? 'iconfont icon-continue continue' : 'iconfont icon-stop stop'"></i>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isPlaying = ref(false) // 音乐播放状态
const music = ref<HTMLAudioElement | null>(null)

const toggleMusic = () => {
  if (music.value) {
    if (isPlaying.value) {
      music.value.pause()
    } else {
      music.value.play().catch((err) => console.log('播放失败: ', err))
    }
    isPlaying.value = !isPlaying.value
  }
}

onMounted(() => {
  music.value = document.getElementById('background-music') as HTMLAudioElement
  if (music.value) {
    music.value.volume = 0.3 // 设置音量为30%
    music.value.pause() // 初始状态为暂停
  }
})
</script>
<style scoped lang="less">
.iconfont {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vw;
  color: var(--font-color-grey);
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  &:hover {
    transform: translateY(-3px);
  }
}

@media (max-width: 768px) {
  .iconfont {
    font-size: 4vh;
  }
}
</style>

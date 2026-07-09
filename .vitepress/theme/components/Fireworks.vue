<template>
  <!-- BAClickFX creates its own full-screen canvas -->
</template>

<script setup lang="ts">
import { onMounted, watch, onUnmounted } from 'vue'
import { useStore } from '../store'
import { BAClickFX } from 'ba-click-fx'

const { state } = useStore()

let fxInstance: BAClickFX | null = null

function createFX() {
  if (fxInstance) {
    fxInstance.destroy()
    fxInstance = null
  }

  const color: [number, number, number] = state.darkMode === 'dark'
    ? [252, 146, 174]
    : [105, 161, 255]

  fxInstance = new BAClickFX({
    color,
    scale: 1.0,
    opacity: 0.5,
    trailEnabled: true,
    trailAlways: false,
  })
}

onMounted(() => {
  createFX()
})

watch(() => state.darkMode, () => {
  createFX()
})

onUnmounted(() => {
  if (fxInstance) {
    fxInstance.destroy()
    fxInstance = null
  }
})
</script>

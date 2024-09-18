<template>
  <span class="iconfont icon-search search" @click="showDialog"></span>
</template>

<script setup lang="ts">
import { useStore } from '../../store'
const { state } = useStore()

const showDialog = () => {
  state.searchDialog = true
  state.showDropdownMenu = false
}
</script>

<style scoped lang="less">
.search {
  cursor: pointer;
  font-size: 32px;
  color: var(--font-color-grey);
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);

  &:hover {
    transform: translateY(-3px);
  }
}
</style>

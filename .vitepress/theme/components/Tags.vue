<template>
  <ul class="tags">
    <li :class="['item', { active: active === tag }]" v-for="(_, tag) in tagData">
      <a href="#" @click="setTag(tag)"><i class="iconfont icon-tag"></i> {{ tag }}</a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { data as posts, type PostData } from '../utils/posts.data'
import { ref, watch, onUnmounted } from 'vue'
import { useStore } from '../store'

const active = ref<string | null>(null)
const tagData: Record<string, PostData[]> = {}
const { state } = useStore()

const setTag = (tag: string) => {
  active.value = tag
  state.selectedPosts = tagData[tag] || []
  state.currTag = tag
}

for (const post of posts) {
  if (!post.tags) continue
  for (const tag of post.tags) {
    if (!tagData[tag]) tagData[tag] = []
    tagData[tag].push(post)
  }
}

setTag(state.currTag)

watch(() => state.currTag, () => {
  setTag(state.currTag)
})

onUnmounted(() => {
  setTag('')
})
</script>
<style scoped lang="less">
.active a {
  background-color: var(--btn-hover) !important;
}

.tags {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 32px;
  border: solid 2px white;
  backdrop-filter: var(--blur-val);
  margin: 50px 8px 0 8px;
  width: 768px;
  z-index: 100;
  transition: all 0.5s;

  li {
    margin: 8px;

    a {
      color: var(--font-color-grey);
      padding: 3px 5px 3px 5px;
      color: var(--font-color-gold);
      background-color: var(--btn-background);
      border-radius: 5px;
      transition: all 0.5s;

      &:hover {
        background-color: var(--btn-hover);
      }
    }
  }
}

@media (max-width: 768px) {
  .tags {
    width: auto;
  }
}
</style>

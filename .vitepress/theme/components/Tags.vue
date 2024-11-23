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

watch(
  () => state.currTag,
  () => {
    setTag(state.currTag)
  },
)

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
  padding: 1vw;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 3vw;
  border: solid 2px var(--foreground-color);
  backdrop-filter: var(--blur-val);
  width: 768px;
  z-index: 100;

  li {
    margin: 0.5vw;

    a {
      font-size: 1vw;
      color: var(--font-color-grey);
      padding: 0.5vh 0.3vw;
      color: var(--font-color-gold);
      background-color: var(--btn-background);
      border-radius: 5px;
      transition: background-color 0.5s;

      .icon-tag {
        font-size: 1vw;
      }

      &:hover {
        background-color: var(--btn-hover);
      }
    }
  }
}

@media (max-width: 768px) {
  .tags {
    padding: 1vh;
    border-radius: 4vh;

    width: 95%;
    li {
      margin: 1vh;

      a {
        font-size: 1.8vh;
        padding: 0.7vh 2vw;

        .icon-tag {
          font-size: 1.8vh;
        }
      }
    }
  }
}
</style>

<template>
  <ul class="tags">
    <li :class="['item', { active: active === tag }]" v-for="(_, tag) in tagData">
      <a href="#" @click="setTag(tag)">{{ tag }}</a>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { data as posts, type PostData } from '../utils/posts.data'
import { ref, onMounted } from 'vue'
import { useStore } from '../store'

const active = ref<string | null>(null)
const tagData: Record<string, PostData[]> = {}
const { state } = useStore()
const setTag = (tag: string) => {
  active.value = tag
  history.replaceState(null, document.title, '?q=' + tag)
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

onMounted(() => {
  state.selectedPosts = []
  active.value = new URLSearchParams(location.search).get('q')
  setTag(active.value || '')
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
  margin-top: 50px;
  margin-bottom: 10px;
  width: 720px;
  transition: all 0.5s;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    margin-right: 16px;

    a {
      color: var(--font-color-grey);
      padding: 3px 5px 3px 5px;
      color: var(--font-color-gold);
      background-color: var(--btn-background);
      border-radius: 5px;
      transition: all 0.5s;

      &::before {
        display: inline-block;
        content: '';
        margin-right: 5px;
        width: 5px;
        height: 5px;
        background-color: var(--font-color-gold);
        border-radius: 50%;
        vertical-align: middle;
        transition: all 0.5s;
      }

      &:hover {
        background-color: var(--btn-hover);
      }
    }
  }
}

@media (max-width: 720px) {
  .tags {
    width: 100%;
  }
}
</style>

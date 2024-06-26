<template>
  <div class="search-dialog">
    <div class="dialog-cover" @click="closeDialog"></div>
    <div class="dialog-content">
      <button type="button" class="close-btn" @click="closeDialog">×</button>
      <span class="title">搜索</span>
      <input type="text" name="" id="search-input" placeholder="请输入关键字" v-model="searchStr" @input="search" />
      <ul class="search-list">
        <span>{{ status }}</span>
        <li v-for="res in resultList" @click="closeDialog">
          <a :href="base + res.href">{{ res.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const emit = defineEmits(['closeDialog'])
const closeDialog = (): void => {
  emit('closeDialog')
}

import { data as posts } from '../utils/posts.data'
import MiniSearch, { SearchResult } from 'minisearch'
import { useData } from 'vitepress'
const base = useData().site.value.base
const miniSearch = new MiniSearch({
  fields: ['title', 'content'],
  storeFields: ['title', 'href'],
  searchOptions: {
    fuzzy: 0.3,
  },
})
miniSearch.addAll(posts)
const searchStr = defineModel<string>()
const resultList = ref<SearchResult[]>([])
const status = ref('这里空空的')
let timerId: ReturnType<typeof setTimeout> | null = null
function search(): void {
  status.value = '搜索中……'
  if (timerId) {
    clearTimeout(timerId)
  }
  timerId = setTimeout(() => {
    resultList.value = miniSearch.search(searchStr.value || '').slice(0, 5)
    if (resultList.value.length) {
      status.value = '搜到了~'
    } else {
      status.value = '这里空空的'
    }
  }, 500)
}
</script>
<style scoped lang="less">
.search-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-cover {
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.dialog-content {
  position: relative;
  width: 90%;
  max-width: 768px;
  height: auto;
  background-color: rgb(239, 239, 239);
  border-radius: 16px;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dialog-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  border-bottom: 3px solid rgb(213, 217, 219);
  background-color: rgb(239, 242, 244);
  background-image: var(--deco2);
  background-repeat: no-repeat;
  background-position: left;
  background-size: contain;
}

.title {
  font-weight: bold;
  font-size: 25px;
  padding: 5px 0;
  border-bottom: 5px solid var(--font-color-gold);
  z-index: 100;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
  width: 56px;
  height: 56px;
  font-size: 36px;
  border: none;
  background: transparent;
  cursor: pointer;
}

#search-input {
  width: 100%;
  height: 48px;
  margin: 10px;
  padding: 0 16px;
  background-color: rgb(230, 234, 235);
  border: 3px solid rgb(209, 213, 218);
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    outline: 3px solid rgba(209, 213, 218, 0.539);
  }
}

.search-list {
  width: 100%;
  min-height: 100px;
  box-sizing: border-box;
  background-color: rgb(174, 193, 202);
  border-radius: 8px;
  padding: 10px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    text-align: center;
  }
}

li {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 3px 3px 3px rgba(69, 73, 78, 0.548);
  padding: 10px;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    height: 50px;
    line-height: 50px;
    color: var(--font-color-grey);
  }
}

@media (max-width: 768px) {
  .dialog-content {
    top: 5%;
  }
}
</style>

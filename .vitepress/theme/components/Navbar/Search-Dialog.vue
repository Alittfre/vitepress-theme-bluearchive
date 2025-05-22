<template>
  <div class="search-dialog">
    <div class="dialog-cover" @click="closeDialog"></div>
    <div class="dialog-content">
      <button type="button" class="close-btn" @click="closeDialog">×</button>
      <span class="title">搜索</span>
      <input
        type="text"
        name=""
        id="search-input"
        placeholder="请输入关键字"
        v-model="searchStr"
        @input="search"
      />
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
import { ref, onMounted } from 'vue'

const emit = defineEmits(['closeDialog'])
const closeDialog = (): void => {
  // 添加关闭动画
  const dialog = document.querySelector('.search-dialog') as HTMLElement
  if (dialog) {
    dialog.classList.add('hide-dialog')
    setTimeout(() => {
      emit('closeDialog')
    }, 200)
  }
}

import { data as posts } from '../../utils/posts.data'
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

onMounted(() => {
  const dialog = document.querySelector('.search-dialog') as HTMLElement
  if (dialog) {
    dialog.classList.add('show-dialog')
  }
})
</script>

<style scoped lang="less">
.search-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: fadein 0.2s forwards;
}
// 遮罩
.dialog-cover {
  background: rgba(0, 0, 0, 0.614);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  animation: cover-fadein 0.2s forwards;
}
// 搜索框
.dialog-content {
  position: relative;
  width: 90%;
  max-width: 768px;
  height: auto;
  background-color: var(--search-dialog-bg);
  border-radius: 16px;
  padding: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: scale(0.9);
  opacity: 0;
  animation: pop-up 0.2s forwards;
}

.dialog-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  border-bottom: 3px solid var(--search-dialog-border);
  background-color: var(--search-dialog-header-bg);
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
  color: var(--font-color-grey);
  width: 100%;
  height: 48px;
  margin: 10px;
  padding: 0 16px;
  background-color: var(--search-input-bg);
  border: 3px solid var(--search-input-border);
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    outline: 3px solid var(--search-input-border);
  }
}

.search-list {
  width: 100%;
  min-height: 100px;
  box-sizing: border-box;
  background-color: var(--search-list-bg);
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
  background-color: var(--search-item-bg);
  border-radius: 5px;
  box-shadow: 3px 3px 3px var(--search-item-shadow);
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

// 动画
@keyframes fadein {
  to {
    opacity: 1;
  }
}

@keyframes cover-fadein {
  to {
    opacity: 1;
  }
}

@keyframes pop-up {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes cover-fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.show-dialog {
  animation: fadein 0.3s forwards;
}

.hide-dialog {
  animation: fadeout 0.3s forwards;
}

.dialog-cover.show-dialog {
  animation: cover-fadein 0.3s forwards;
}

.dialog-cover.hide-dialog {
  animation: cover-fadeout 0.3s forwards;
}

.dialog-content.show-dialog {
  animation: pop-up 0.3s forwards;
}

.dialog-content.hide-dialog {
  animation: pop-down 0.3s forwards;
}

@keyframes pop-down {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>

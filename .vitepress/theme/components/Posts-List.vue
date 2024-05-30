<template>
  <div class="container posts-content">
    <TransitionGroup class="posts-list" name="list" tag="div">
      <article class="post" v-for="post in postsList" :key="post.href">
        <header class="post-header">
          <div class="title">
            <div class="title-dot"></div>
            <h1 class="name"><a :href="base + post.href">{{ post.title }}</a></h1>
          </div>
          <div class="meta-info-bar">
            <div class="time-info">
              <time datetime="">{{ formatDate(post.create) }}</time>
            </div>
            <div class="wordcount seperator">约{{ post.wordCount }}字</div>
          </div>
          <ul class="tags">
            <li v-for="tag in post.tags">
              <a :href="`${base}tags/`" @click="state.currTag = tag"><i class="iconfont icon-tag"></i> {{ tag }}</a>
            </li>
          </ul>
        </header>
        <div class="excerpt">
          <p>{{ post.excerpt }}</p>
        </div>
      </article>
    </TransitionGroup>
    <span v-if="totalPage != 1" class="pagination">
      <button :disabled="currPage === 1" :class="{ hide: currPage === 1 }" id="up" @click="currPage--">
        <i class="iconfont icon-arrow"></i>
      </button>
      <span>{{ currPage }} / {{ totalPage }}</span>
      <button :disabled="currPage >= totalPage" :class="{ hide: currPage >= totalPage }" id="next" @click="currPage++">
        <i class="iconfont icon-arrow"></i>
      </button>
    </span>
  </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, computed } from 'vue'
import { data as posts } from '../utils/posts.data'
import { useStore } from '../store'
const { state } = useStore()
const { page } = useData()
const base = useData().site.value.base

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date)
}
const currPage = ref(1)
const pageSize = ref(5)
const postsList = computed(() => {
  return finalPosts.value.slice((currPage.value - 1) * pageSize.value, currPage.value * pageSize.value)
})
const totalPage = computed(() => {
  return Math.ceil(finalPosts.value.length / pageSize.value) || 1
})

// 文章传值
const finalPosts = computed(() => {
  if (page.value.filePath === 'index.md') {
    currPage.value = 1
    return posts
  } else if (page.value.filePath === 'tags/index.md') {
    currPage.value = 1
    return state.selectedPosts
  }
  return []
})
</script>
<style scoped lang="less">
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
  right: 0;
  left: 0;
}

.posts-content {

  article,
  h1,
  ul {
    margin: 0;
    padding: 0;
  }

}


.posts-list {
  position: relative;
  overflow-wrap: break-word;

  .post {
    display: flex;
    flex-direction: column;
    margin: 0 0 50px 0;
    padding-bottom: 16px;
    background-color: white;
    border-radius: 32px;
    border-left: solid 16px #c7e4f6;
    background-image: var(--deco1);
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
    box-shadow: var(--blue-shadow);
  }


}

.post-header {
  padding: 32px 40px 0;

  .title {
    position: relative;
    margin-bottom: 6px;

    .title-dot {
      width: 4px;
      height: 20px;
      position: absolute;
      left: -16px;
      top: 9.5px;
      background: #c7e4f6;
      border-radius: 2px;
    }

    a {
      color: var(--font-color-grey);
      transition: text-shadow .5s;

      &:hover {
        text-shadow: 0 0 3px var(--font-color-grey);
      }
    }
  }

  .meta-info-bar {
    display: flex;
    margin-bottom: 6px;

    .seperator::before {
      content: '';
      display: inline-block;
      border-radius: 50%;
      height: 4px;
      width: 4px;
      vertical-align: middle;
      background-color: var(--font-color-grey);
      margin: 0 16px;
    }
  }

}



.tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;
  margin-bottom: 6px;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 6px;
    margin-right: 16px;

    a {
      color: var(--font-color-grey);
      padding: 3px 5px;
      color: var(--font-color-gold);
      background-color: var(--btn-background);
      border-radius: 5px;
      transition: all 0.5s;

      &:hover {
        background-color: var(--btn-hover);
        color: var(--font-color-gold);
      }
    }
  }
}

.excerpt {
  padding: 0 40px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  padding: 0;

  button {
    background-color: transparent;
    border-style: none;
    cursor: pointer;
  }

  .hide {
    opacity: 0;
    cursor: auto;
  }


  .icon-arrow {
    font-size: 36px;
    color: var(--icon-color);
  }

  #up {
    animation: arrow-pre 1s ease-in-out infinite alternate;
  }

  #next {
    animation: arrow-next 1s ease-in-out infinite alternate;
  }
}

@keyframes arrow-pre {
  from {
    transform: translateX(0) rotate(-0.25turn);
  }

  to {
    transform: translateX(10px) rotate(-0.25turn);
  }
}

@keyframes arrow-next {
  from {
    transform: translateX(0) rotate(0.25turn);
  }

  to {
    transform: translateX(-10px) rotate(0.25turn);
  }
}

@media (max-width: 768px) {

  .post {
    margin: 0 8px 30px 8px !important;
    background-size: cover !important;

  }

}
</style>

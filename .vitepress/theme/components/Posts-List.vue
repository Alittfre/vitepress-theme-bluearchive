<template>
  <div class="container posts-content">
    <TransitionGroup class="posts-list" name="list" tag="div">
      <article class="post" v-for="post in postsList" :key="post.href">
        <header class="post-header">
          <div class="title">
            <div class="title-dot"></div>
            <h1 class="name">
              <a :href="base + post.href">{{ post.title }}</a>
            </h1>
          </div>
          <div class="meta-info-bar">
            <div class="time-info">
              <time datetime="">{{ formatDate(post.create) }}</time>
            </div>
            <div class="wordcount seperator">约{{ post.wordCount }}字</div>
          </div>
          <ul class="tags">
            <li v-for="tag in post.tags">
              <a :href="`${base}tags/`" @click="state.currTag = tag"
                ><i class="iconfont icon-tag"></i> {{ tag }}</a
              >
            </li>
          </ul>
        </header>
        <div class="excerpt">
          <p>{{ post.excerpt }}</p>
        </div>
      </article>
    </TransitionGroup>
    <span v-if="totalPage != 1" class="pagination">
      <button
        :disabled="currPage === 1"
        :class="{ hide: currPage === 1 }"
        id="up"
        @click="currPage--"
      >
        <i class="iconfont icon-arrow"></i>
      </button>
      <span>{{ currPage }} / {{ totalPage }}</span>
      <button
        :disabled="currPage >= totalPage"
        :class="{ hide: currPage >= totalPage }"
        id="next"
        @click="currPage++"
      >
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
  return finalPosts.value.slice(
    (currPage.value - 1) * pageSize.value,
    currPage.value * pageSize.value,
  )
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
    margin-bottom: 5vh;
    background-color: var(--foreground-color);
    border-radius: 2vw;
    border-left: solid 1vw #c7e4f6;
    background-image: var(--deco1);
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
    box-shadow: 0px 0px 8px rgb(var(--blue-shadow-color), 0.8);
  }
}

.post-header {
  padding: 3vh 2.5vw 0;

  .title {
    position: relative;
    margin-bottom: 0.8vh;
    font-size: 1vw;

    .title-dot {
      width: 4px;
      height: 1.5vw;
      position: absolute;
      left: -1vw;
      top: 1vh;
      background: #c7e4f6;
      border-radius: 2px;
    }

    a {
      color: var(--font-color-grey);
      transition: text-shadow 0.5s;

      &:hover {
        text-shadow: 0 0 3px var(--font-color-grey);
      }
    }
  }

  .meta-info-bar {
    display: flex;
    margin-bottom: 0.4vh;
    font-size: 0.9vw;

    .seperator::before {
      content: '';
      display: inline-block;
      border-radius: 50%;
      height: 0.3vw;
      width: 0.3vw;
      vertical-align: middle;
      background-color: var(--font-color-grey);
      margin: 0 0.8vw;
    }
  }
}

.tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0.8vh;
    margin-right: 1vw;

    a {
      font-size: 1vw;
      color: var(--font-color-grey);
      padding: 0.4vh 0.3vw;
      color: var(--font-color-gold);
      background-color: var(--btn-background);
      border-radius: 5px;
      transition: all 0.5s;
      .icon-tag {
        font-size: 1vw;
      }
      &:hover {
        background-color: var(--btn-hover);
        color: var(--font-color-gold);
      }
    }
  }
}

.excerpt {
  padding: 0 2.5vw;
  margin-bottom: 1vh;
  font-size: 0.85vw;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5vh;
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
    font-size: 2vw;
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
  .posts-list {
    .post {
      margin-bottom: 3vh;
      border-radius: 3vh;
      border-left: solid 1.5vh #c7e4f6;
    }
  }

  .post-header {
    padding: 2vh 6vw 0;

    .title {
      margin-bottom: 1vh;
      font-size: 1.5vh;

      .title-dot {
        width: 4px;
        height: 2vh;
        left: -3vw;
        top: 0.8vh;
      }
    }

    .meta-info-bar {
      margin-bottom: 0.4vh;
      font-size: 1.3vh;

      .seperator::before {
        height: 0.4vh;
        width: 0.4vh;
        margin: 0 0.8vh;
      }
    }
  }

  .tags {
    li {
      padding-top: 0.8vh;
      margin-right: 1vh;

      a {
        font-size: 1.3vh;
        padding: 0.5vh 1.2vw;
        .icon-tag {
          font-size: 1.2vh;
        }
      }
    }
  }

  .excerpt {
    padding: 0 6vw;
    margin-bottom: 1vh;
    font-size: 1.2vh;
  }

  .pagination {
    margin-top: 5vh;

    .icon-arrow {
      font-size: 4vh;
    }
  }
}
</style>

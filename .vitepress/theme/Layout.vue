<template>
  <template v-if="!page.isNotFound">
    <Navbar></Navbar>
    <Banner>
      <transition name="opac" mode="out-in">
        <WelcomeBox v-if="path === ''"></WelcomeBox>
        <Tags v-else-if="path === 'tags/'"></Tags>
        <PostInnerBanner v-else></PostInnerBanner>
      </transition>
    </Banner>
    <transition name="opac" mode="out-in">
      <PostsList
        :key="path + state.currTag"
        :posts="finalPosts"
        v-if="path === '' || path === 'tags/'"
      >
      </PostsList>
      <PostViewer v-else></PostViewer>
    </transition>
    <ToTop></ToTop>
  </template>
  <NotFound v-else></NotFound>
</template>
<script setup lang="ts">
// 组件导入
import Navbar from './components/Navbar.vue'
import Banner from './components/Banner.vue'
import WelcomeBox from './components/Welcome-box.vue'
import PostsList from './components/Posts-List.vue'
import Tags from './components/Tags.vue'
import PostViewer from './components/Post-Viewer.vue'
import PostInnerBanner from './components/Post-innerBanner.vue'
import NotFound from './components/NotFound.vue'
import ToTop from './components/ToTop.vue'

// 路径切换
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
const { page } = useData()
const base = useData().site.value.base
const route = useRoute()
const path = computed(() => route.path.replace(base, '').replace('index.html', ''))

// 文章传值
import { data as posts } from './utils/posts.data'
import { useStore } from './store'
const { state } = useStore()
const finalPosts = computed(() => {
  if (path.value === '') {
    return posts
  } else if (path.value === 'tags/') {
    return state.selectedPosts
  }
  return []
})
</script>

<style lang="less">
.opac-enter-active,
.opac-leave-active {
  transition: all 0.2s;
}

.opac-enter-from,
.opac-leave-to {
  opacity: 0;
}

html {
  scroll-behavior: smooth;
  --font-color-grey: rgb(76, 88, 102);
  --font-color-gold: rgb(255, 228, 1);
  --color-blue: rgb(18, 138, 250);
  --btn-background: rgb(66, 92, 139);
  --btn-hover: rgb(51, 73, 93);
  --blur-val: blur(10px);
  --general-background-color: #eaeff5;
  --blue-shadow: 0 0 15px rgb(108, 154, 196);
  --triangle-background: repeating-linear-gradient(
      60deg,
      rgba(190, 242, 255, 0.3),
      transparent 35px
    ),
    repeating-linear-gradient(180deg, transparent, rgba(108, 230, 255, 0.3) 30px),
    repeating-linear-gradient(120deg, rgba(16, 179, 215, 0.3), transparent 46px);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

body {
  background-image: url('./assets/background.svg');
  background-color: var(--general-background-color);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  overflow-y: scroll;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: var(--color-blue);
}
</style>

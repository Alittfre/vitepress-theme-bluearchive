<template>
  <Splash></Splash>
  <template v-if="!page.isNotFound">
    <main style="min-height: 100vh">
      <Navbar></Navbar>
      <Banner>
        <transition name="fade" mode="out-in">
          <WelcomeBox v-if="!state.splashLoading && page.filePath === 'index.md'"></WelcomeBox>
          <Tags v-else-if="page.filePath === 'tags/index.md'"></Tags>
          <PostInnerBanner v-else></PostInnerBanner>
        </transition>
      </Banner>
      <transition name="fade" mode="out-in">
        <PostsList
          v-if="page.filePath === 'index.md' || page.filePath === 'tags/index.md'"
        ></PostsList>
        <PostViewer v-else></PostViewer>
      </transition>
    </main>
    <Footer></Footer>
    <Fireworks v-if="state.fireworksEnabled"></Fireworks>
    <ClientOnly><SpinePlayer></SpinePlayer></ClientOnly>
    <ToTop></ToTop>
    <!-- 背景音乐元素 -->
    <audio id="background-music" loop>
      <source src="./assets/banner/bgm.mp3" type="audio/mpeg" />
    </audio>
  </template>
  <NotFound v-else></NotFound>
</template>

<script setup lang="ts">
// 组件导入
import Splash from './components/Splash.vue'
import Navbar from './components/Navbar/index.vue'
import Banner from './components/Banner.vue'
import WelcomeBox from './components/Welcome-Box.vue'
import PostsList from './components/Posts-List.vue'
import Tags from './components/Tags.vue'
import PostViewer from './components/Post-Viewer.vue'
import PostInnerBanner from './components/Post-InnerBanner.vue'
import NotFound from './components/NotFound.vue'
import ToTop from './components/ToTop.vue'
import Fireworks from './components/Fireworks.vue'
import Footer from './components/Footer.vue'
// @ts-ignore
import SpinePlayer from './components/Spine-Player/index.vue'
// 路径切换
import { useData } from 'vitepress'
const { page } = useData()

import { useStore } from './store'
const { state } = useStore()
</script>

<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

html {
  scroll-behavior: smooth;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

body {
  background-image: var(--theme-background-image);
  background-color: var(--general-background-color);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  color: var(--font-color-grey);
  font-family: 'Blueaka', sans-serif;
  transition: background-image 0.5s, background-color 0.5s;
}

:root[theme='light'] {
  --theme-background-image: url('./assets/background.svg');
}

:root[theme='dark'] {
  --theme-background-image: url('./assets/background_dark.svg');
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
  cursor: pointer;
}

@media (max-width: 768px) {
  .container {
    width: 100vw;
  }
}
</style>

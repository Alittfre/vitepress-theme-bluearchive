<template>
  <template v-if="!page.isNotFound">
    <main style="min-height: 100vh">
      <Navbar></Navbar>
      <Banner>
        <transition name="opac" mode="out-in">
          <WelcomeBox v-if="page.filePath === 'index.md'"></WelcomeBox>
          <Tags v-else-if="page.filePath === 'tags/index.md'"></Tags>
          <PostInnerBanner v-else></PostInnerBanner>
        </transition>
      </Banner>
      <transition name="opac" mode="out-in">
        <PostsList
          v-if="page.filePath === 'index.md' || page.filePath === 'tags/index.md'"
        ></PostsList>
        <PostViewer v-else></PostViewer>
      </transition>
    </main>
    <Footer></Footer>
    <Fireworks></Fireworks>
    <SpinePlayer></SpinePlayer>
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
import Fireworks from './components/Fireworks.vue'
import Footer from './components/Footer.vue'
// @ts-ignore
import SpinePlayer from './components/Spine-Player/index.vue'
// 路径切换
import { useData } from 'vitepress'
const { page } = useData()
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
  color: var(--font-color-grey);
  font-family: 'Blueaka', sans-serif;
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
</style>

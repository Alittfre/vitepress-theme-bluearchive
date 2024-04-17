<template>
    <div v-if="!page.isNotFound">
        <Navbar></Navbar>
        <Banner>
            <transition name="scale" mode="out-in">
                <WelcomeBox v-if="path === ''"></WelcomeBox>
                <Tags v-else-if="path === 'tags/'"></Tags>
                <PostInnerBanner v-else></PostInnerBanner>
            </transition>
        </Banner>
        <transition name="scale" mode="out-in">
            <PostsList :key="path + state.currTag" :posts="finalPosts" v-if="path === '' || path === 'tags/'">
            </PostsList>
            <PostViewer v-else></PostViewer>
        </transition>
        <ToTop></ToTop>
    </div>
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
import { useData, useRoute } from 'vitepress';
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

<style lang='less'>
.scale-enter-active,
.scale-leave-active {
    transition: all 0.5s;
}

.scale-enter-from,
.scale-leave-to {
    transform: scale(0);
}

html {
    scroll-behavior: smooth;
    --font-color-grey: rgb(76, 88, 102);
    --font-color-gold: rgb(255, 228, 1);
    --hover-color: rgb(51, 73, 93);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

body {
    background-image: url('./assets/background.svg');
    background-color: #eaeff5;
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
    background: rgb(18, 138, 250);
}
</style>
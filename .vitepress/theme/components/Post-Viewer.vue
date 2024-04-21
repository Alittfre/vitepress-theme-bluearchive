<template>
    <div class="viewBox container">
        <content class="content" />
        <Gitalk v-if="themeConfig.clientID"></Gitalk>
    </div>
</template>
<script setup lang="ts">
import Gitalk from './Gitalk.vue';
import { data as posts } from '../utils/posts.data';
import { useData, useRoute } from 'vitepress'
import { useStore } from '../store';
const route = useRoute()
const data = useData()
const base = data.site.value.base
const { state } = useStore()
import { onUnmounted, onMounted } from 'vue'
onMounted(() => {
    const currPost = posts.findIndex(p => p.href === route.path.replace(base, ''))
    state.currPost = posts[currPost]
})

onUnmounted(() => {
    state.currPost = {
        id: 1,
        title: '',
        content: '',
        href: '',
        create: 0,
        update: 0,
        tags: [],
        wordCount: 0,
        cover: '',
        excerpt: ''
    }
})

const themeConfig = useData().theme.value
</script>
<style lang='less'>
.viewBox {
    box-sizing: border-box;
    position: relative;
    padding: 50px;
    border-radius: 32px;
    border: solid 2px white;
    transition: all .5s;
    background:
        linear-gradient(.5turn, transparent, white 10%),
        var(--triangle-background);
    backdrop-filter: var(--blur-val);
    box-shadow: var(--blue-shadow);
}

html {
    --vp-icon-copy: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'/%3E%3C/svg%3E");
    --vp-icon-copied: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' height='20' width='20' stroke='rgba(128,128,128,1)' stroke-width='2' viewBox='0 0 24 24'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4'/%3E%3C/svg%3E");
}

.content {
    color: var(--font-color-grey);

    a {
        color: var(--color-blue);
        position: relative;

        &.header-anchor {
            float: left;
        }

        &.header-anchor::before {
            content: '#';
            opacity: 0;
            position: absolute;
            right: 0;
            color: var(--color-blue);
            transition: opacity .5s;

        }

        &:hover::before {
            opacity: 1;
        }

    }

    h2 {
        padding-bottom: 0.3em;
        margin-bottom: 1em;
        border-bottom: 2px dashed #ced4da;
    }

    hr {
        border: 0;
        border-top: 2px dashed #ced4da;
    }

}

code {
    border-radius: 4px;
    padding: 0.2em 0.4em;
    background-color: rgba(27, 31, 35, 0.05);
}

div[class*="language-"] {
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    background-color: rgb(255, 255, 255);
    border: 3px solid rgb(237, 241, 243);
    border-radius: 16px;
    overflow: hidden;

    padding-top: 48px;

    .lang {
        position: absolute;
        transform: translate(-50%, -36px);
        left: 50%;
        user-select: none;
        font-weight: bold;
        padding-bottom: 10px;
        border-bottom: 5px solid var(--font-color-gold);
    }

    pre {
        margin: 0;
        flex-grow: 1;
        overflow-x: scroll;
        overflow-y: hidden;
    }

    code {
        background-color: transparent;
        padding: 0;
    }

    button.copy {
        position: absolute;
        top: 0;
        right: 0;
        width: 48px;
        height: 48px;
        cursor: pointer;
        background-image: var(--vp-icon-copy);
        background-repeat: no-repeat;
        background-position: center center;
        background-color: transparent;
        border: 0;

        &.copied {
            background-image: var(--vp-icon-copied);
        }
    }


    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 48px;
        border-bottom: 3px solid rgb(222, 224, 223);
        box-sizing: border-box;
        background-color: rgb(239, 242, 244);
    }


    .line-numbers-wrapper {
        padding: 0 10px 0 10px;
        user-select: none;
        font-weight: lighter;
    }

}

.custom-block {

    &.tip,
    &.info,
    &.warning,
    &.danger {
        margin: 1rem 0;
        border-left: 0.5rem solid;
        padding: 0.1rem 1.5rem;
        overflow-x: auto;
    }

    &.tip {
        background-color: #f3f5f7;
        border-color: #3eaf7c;
    }

    &.info {
        background-color: #f3f5f7;
        border-color: #476582;
    }

    &.warning {
        border-color: #e7c000;
        color: #6b5900;
        background-color: #fff7d0;

        .custom-block-title {
            color: #b29400;
        }
    }

    &.danger {
        border-color: #c00;
        color: #4d0000;
        background-color: #ffe6e6;

        .custom-block-title {
            color: #900000;
        }
    }
}

.custom-block-title {
    font-weight: bold;
}

@media (max-width: 720px) {
    .viewBox {
        padding: 16px;
    }
}
</style>
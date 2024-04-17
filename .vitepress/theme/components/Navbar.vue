<template>
    <header :class="{ 'postViewer': state.currPost.href }">
        <nav class="container">
            <span class="logo"><img src="../assets/icon/navLogo.svg" alt=""></span>
            <span class="menu">
                <ul>
                    <li v-for="item in menu"><a :href="base + item.url">{{ item.name }}</a></li>
                </ul>
            </span>
            <span class="search" @click="showDialog = true">
                <a href=""><img src="../assets/icon/search.svg" alt=""></a>
            </span>
        </nav>
    </header>
    <SearchDialog v-if="showDialog" @close-dialog="closeDialog"></SearchDialog>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
const base = useData().site.value.base
interface MenuList { name: string, url: string }
const menu: MenuList[] = [
    { name: '首页', url: '' },
    { name: '标签', url: 'tags/' },
]

import { useStore } from '../store';
const { state } = useStore()

import SearchDialog from './Search-Dialog.vue'
import { ref } from 'vue'
const showDialog = ref(false)
const closeDialog = () => {
    showDialog.value = false
}
</script>
<style scoped lang='less'>
.postViewer {
    height: 50vh;
}

header {
    height: 70vh;

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        height: 72px;
        z-index: 100;
        border-radius: 0 0 30px 30px;
        border-bottom: solid 2px white;
        border-left: solid 2px white;
        border-right: solid 2px white;

        background:
            linear-gradient(.25turn, transparent, rgb(248, 252, 253) 25%),
            repeating-linear-gradient(60deg,
                rgba(190, 242, 255, 0.15),
                transparent 35px),
            repeating-linear-gradient(180deg, transparent, rgba(108, 230, 255, 0.20) 30px),
            repeating-linear-gradient(120deg,
                rgba(16, 179, 215, 0.2),
                transparent 46px);
        backdrop-filter: blur(2px);
        box-shadow: 0 0 15px rgb(108, 154, 196);
        transition: all .5s;

        &:hover {
            background-position: 0 25px;
        }
    }

    .logo {
        padding-left: 16px;

        img {
            height: 36px;
            width: auto;
            filter: drop-shadow(0 0 5px rgb(18, 138, 250));
        }
    }

    .menu {
        ul {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0;
            margin: 0;

            li {

                a {
                    display: block;
                    padding: 10px 16px 10px 16px;
                    border-radius: 8px;
                    font-size: 20px;
                    font-weight: 600;
                    color: var(--font-color-grey);
                    transition: all .5s;

                    &:hover {
                        color: var(--font-color-gold);
                        background-color: var(--hover-color);
                    }
                }

            }
        }
    }

    .search {
        padding-right: 16px;

        img {
            height: 36px;
            width: auto;
        }
    }
}

@media (min-width: 720px) {
    .menu {
        li {
            margin: 0 50px 0 50px;
        }
    }
}
</style>
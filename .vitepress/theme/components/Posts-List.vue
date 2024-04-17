<template>
    <div class="container">
        <ul class="DocsList">
            <TransitionGroup name="list" tag="ul" style="padding: 0;">
                <li class="Doc" v-for="post in postsList" :key="post.href">
                    <span class="title"><a :href="base + post.href">{{ post.title }}</a></span>
                    <span class="publishTime HeadLine">发布于 {{ formatDate(post.create) }} | 约{{ post.wordCount }}字</span>
                    <ul class="tags HeadLine" v-if="click">
                        <li v-for="tag in post.tags"><a href="#" @click="click(tag)">{{ tag }}</a></li>
                    </ul>
                    <ul class="tags HeadLine" v-else>
                        <li v-for="tag in post.tags"><a :href="`${base}tags/?q=${tag}`">{{ tag }}</a></li>
                    </ul>
                    <span class="summary HeadLine">{{ post.excerpt }}</span>
                </li>
            </TransitionGroup>
        </ul>
        <span v-if="totalPage != 1" class="pagination">
            <button :disabled="currPage === 1" :class="{ 'hide': currPage === 1 }" @click="currPage--"><img class="up"
                    src="../assets/icon/arrow.svg" alt=""></button>
            <span>{{ currPage }} / {{ totalPage }}</span>
            <button :disabled="currPage >= totalPage" :class="{ 'hide': currPage >= totalPage }"
                @click="currPage++"><img class="next" src="../assets/icon/arrow.svg" alt=""></button>
        </span>
    </div>
</template>
<script setup lang="ts">
import { type PostData } from '../utils/posts.data';
import { useData } from 'vitepress'
import { ref, computed } from 'vue'
const base = useData().site.value.base
const { posts, click = null } = defineProps<{
    posts: PostData[]
    click?: (tag: string) => void
}>()

function formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}
const currPage = ref(1)
const pageSize = ref(5)
const postsList = computed(() => {
    return posts.slice((currPage.value - 1) * pageSize.value, currPage.value * pageSize.value)
})
const totalPage = computed(() => {
    return Math.ceil(posts.length / pageSize.value) || 1
})

</script>
<style scoped lang='less'>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all .5s;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: scale(0);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
    position: absolute;
}

.HeadLine {
    margin-left: 16 + 10px;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.DocsList {
    position: relative;
    top: 50px;
    padding: 0;
    padding-inline-start: 0;

    .Doc {
        display: flex;
        flex-direction: column;
        margin-bottom: 50px;
        padding: 32px 40px 32px 40px;
        background-color: rgb(248, 252, 253);
        border-radius: 32px;
        border: solid 2px white;
        transition: all .5s;
        background:
            linear-gradient(.5turn, transparent, rgb(248, 252, 253) 50%),
            repeating-linear-gradient(60deg,
                rgba(190, 242, 255, 0.6),
                transparent 35px),
            repeating-linear-gradient(180deg, transparent, rgba(18, 211, 249, 0.2) 30px),
            repeating-linear-gradient(120deg,
                rgba(16, 179, 215, 0.2),
                transparent 46px);
        backdrop-filter: blur(2px);
        box-shadow: 0 0 15px rgb(108, 154, 196);

        &:hover {
            background-position: 25px;
        }
    }

    .title {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 10px;

        &::before {
            display: inline-block;
            content: '';
            margin-right: 10px;
            width: 6px;
            height: 24px;
            vertical-align: middle;
            border-radius: 3px;
            background-color: rgb(18, 138, 250);
        }

        a {
            padding: 3px 10px 3px 10px;
            color: rgb(76, 88, 102);
            transition: all .5s;

            &:hover {
                text-shadow: 0 0 3px rgb(76, 88, 102);
            }
        }
    }

    .publishTime {
        color: rgb(76, 88, 102);
    }

    .tags {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 0;
        margin-bottom: 10px;

        li {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 15px;
            margin-right: 16px;

            a {
                color: rgb(76, 88, 102);
                padding: 3px 5px 3px 5px;
                color: rgb(255, 228, 1);
                background-color: rgb(66, 92, 139);
                border-radius: 5px;
                transition: all .5s;

                &::before {
                    display: inline-block;
                    content: '';
                    margin-right: 5px;
                    width: 5px;
                    height: 5px;
                    background-color: rgb(255, 228, 1);
                    border-radius: 50%;
                    vertical-align: middle;
                    transition: all .5s;

                }

                &:hover {
                    background-color: rgb(51, 73, 93);
                    color: rgb(255, 228, 1);

                }
            }
        }
    }

    .summary {
        color: rgb(76, 88, 102);

    }
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
    }

    img {
        height: 32px;
        padding: 0
    }

    .hide {
        opacity: 0;
    }

    .up {
        animation: arrowUp 1s ease-in-out infinite alternate;
    }

    .next {
        animation: arrowNext 1s ease-in-out infinite alternate;
    }
}

@keyframes arrowUp {
    from {
        transform: translateX(0) rotate(-0.25turn)
    }

    to {
        transform: translateX(10px) rotate(-0.25turn)
    }
}

@keyframes arrowNext {
    from {
        transform: translateX(0) rotate(0.25turn)
    }

    to {
        transform: translateX(-10px) rotate(0.25turn)
    }
}

@media(max-width: 720px) {
    .HeadLine {
        margin-left: 16px;
    }

    .Doc {
        margin-bottom: 30px !important;
    }

    .title {
        a {
            padding: 0 !important;
        }
    }
}
</style>
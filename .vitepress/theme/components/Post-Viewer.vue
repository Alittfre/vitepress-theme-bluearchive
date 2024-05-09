<template>
  <div class="viewBox container">
    <content class="content" />
    <Gitalk v-if="themeConfig.clientID"></Gitalk>
  </div>
</template>
<script setup lang="ts">
import Gitalk from './Gitalk.vue'
import { data as posts } from '../utils/posts.data'
import { useData, useRoute } from 'vitepress'
import { useStore } from '../store'
const route = useRoute()
const data = useData()
const base = data.site.value.base
const { state } = useStore()
import { onUnmounted, onMounted } from 'vue'
onMounted(() => {
  const currPost = posts.findIndex((p) => p.href === route.path.replace(base, ''))
  state.currPost = posts[currPost]
})

onUnmounted(() => {
  state.currPost = {
    id: 0,
    title: '',
    content: '',
    href: '',
    create: 0,
    update: 0,
    tags: [],
    wordCount: 0,
    cover: '',
    excerpt: '',
  }
})

const themeConfig = useData().theme.value
</script>
<style lang="less">
.viewBox {
  box-sizing: border-box;
  position: relative;
  padding: 50px;
  border-radius: 32px;
  border: solid 2px white;
  transition: all 0.5s;
  background: linear-gradient(0.5turn, transparent, white 5%), var(--triangle-background);
  // backdrop-filter: var(--blur-val);
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
      transition: opacity 0.5s;
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

div[class*='language-'] {
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
    border-radius: 16px;
  }

  .custom-block-title {
    &::before {
      vertical-align: middle;
      margin-right: 10px;
    }
  }

  &.tip {
    background-color: #f1f6fa;
    border-color: #57b6f6;
    color: #005e86;
    .custom-block-title {
      &::before {
        content: url('data:image/svg+xml,%3Csvg%20t%3D%221714540975392%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2230556%22%20width%3D%2216%22%20height%3D%2216%22%3E%3Cpath%20d%3D%22M672%20856v56c0%2020.898-13.36%2038.668-32%2045.258V976c0%2026.51-21.49%2048-48%2048h-160c-26.51%200-48-21.49-48-48v-18.742c-18.64-6.59-32-24.36-32-45.258v-56c0-13.254%2010.746-24%2024-24h272c13.254%200%2024%2010.746%2024%2024z%20m-286.214-88c-19.814%200-37.652-12.156-44.752-30.654C263.394%20535.082%20160%20555.462%20160%20352%20160%20157.606%20317.61%200%20512%200s352%20157.606%20352%20352c0%20203.462-103.394%20183.082-181.032%20385.346-7.1%2018.498-24.94%2030.654-44.752%2030.654H385.786zM352%20352c0-88.224%2071.776-160%20160-160%2017.674%200%2032-14.328%2032-32s-14.326-32-32-32c-123.514%200-224%20100.486-224%20224%200%2017.672%2014.328%2032%2032%2032s32-14.328%2032-32z%22%20fill%3D%22%23005e86%22%20p-id%3D%2230557%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
      }
    }
  }

  &.info {
    background-color: #f3f5f7;
    border-color: var(--font-color-grey);
    .custom-block-title {
      &::before {
        content: url('data:image/svg+xml,%3Csvg%20t%3D%221714541076675%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2230910%22%20width%3D%2216%22%20height%3D%2216%22%3E%3Cpath%20d%3D%22M512%2016C238.086%2016%2016%20238.166%2016%20512c0%20273.994%20222.086%20496%20496%20496s496-222.006%20496-496C1008%20238.166%20785.914%2016%20512%2016z%20m0%20220c46.392%200%2084%2037.608%2084%2084s-37.608%2084-84%2084-84-37.608-84-84%2037.608-84%2084-84z%20m112%20508c0%2013.254-10.746%2024-24%2024h-176c-13.254%200-24-10.746-24-24v-48c0-13.254%2010.746-24%2024-24h24v-128h-24c-13.254%200-24-10.746-24-24v-48c0-13.254%2010.746-24%2024-24h128c13.254%200%2024%2010.746%2024%2024v200h24c13.254%200%2024%2010.746%2024%2024v48z%22%20fill%3D%22%234c5866%22%20p-id%3D%2230911%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
      }
    }
  }

  &.warning {
    border-color: #e7c000;
    color: #6b5900;
    background-color: #fff7d0;

    .custom-block-title {
      color: #b29400;
      &::before {
        content: url('data:image/svg+xml,%3Csvg%20t%3D%221714540884184%22%20class%3D%22icon%22%20viewBox%3D%220%200%201024%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2230202%22%20width%3D%2216%22%20height%3D%2216%22%3E%3Cpath%20d%3D%22M1008%20512c0%20273.994-222.086%20496-496%20496S16%20785.994%2016%20512C16%20238.166%20238.086%2016%20512%2016s496%20222.166%20496%20496z%20m-496%20100c-50.81%200-92%2041.19-92%2092s41.19%2092%2092%2092%2092-41.19%2092-92-41.19-92-92-92z%20m-87.346-330.692l14.836%20272c0.694%2012.728%2011.218%2022.692%2023.964%2022.692h97.092c12.746%200%2023.27-9.964%2023.964-22.692l14.836-272c0.75-13.748-10.196-25.308-23.964-25.308h-126.766c-13.768%200-24.712%2011.56-23.962%2025.308z%22%20fill%3D%22%23b29400%22%20p-id%3D%2230203%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
      }
    }
  }

  &.danger {
    border-color: #d58d86;
    color: #4d0000;
    background-color: #ffe6e6;

    .custom-block-title {
      color: #900000;
      &::before {
        content: url('data:image/svg+xml,%3Csvg%20t%3D%221714538808886%22%20class%3D%22icon%22%20viewBox%3D%220%200%201152%201024%22%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20p-id%3D%2229800%22%20width%3D%2216%22%20height%3D%2216%22%3E%3Cpath%20d%3D%22M1139.035378%20880.026003C1175.951377%20944.014002%201129.613378%201024%201055.881379%201024H96.109398c-73.873999%200-119.997998-80.109998-83.153998-143.973997L492.84739%2047.970019c36.933999-64.017999%20129.439997-63.901999%20166.307997%200l479.879991%20832.055984zM576.001389%20708.000006c-50.809999%200-91.999998%2041.189999-91.999998%2091.999998s41.189999%2091.999998%2091.999998%2091.999999%2091.999998-41.189999%2091.999998-91.999999-41.189999-91.999998-91.999998-91.999998z%20m-87.345999-330.691993l14.836%20271.999994c0.694%2012.728%2011.218%2022.692%2023.964%2022.692h97.091998c12.746%200%2023.27-9.964%2023.963999-22.692l14.836-271.999994c0.75-13.748-10.196-25.308-23.963999-25.308h-126.765998c-13.768%200-24.712%2011.56-23.962%2025.308z%22%20fill%3D%22%23900000%22%20p-id%3D%2229801%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
      }
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

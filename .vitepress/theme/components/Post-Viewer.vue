<template>
  <div class="view-box container">
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
import { onMounted, onUnmounted, watch } from 'vue'

function getCurrpost() {
  let currPost = posts.findIndex((p) => p.href === route.path.replace(base, ''))
  state.currPost = posts[currPost]
}

onMounted(() => {
  getCurrpost()
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

watch(
  () => route.path,
  () => {
    getCurrpost()
  },
)

const themeConfig = useData().theme.value
</script>
<style lang="less">
.view-box {
  box-sizing: border-box;
  position: relative;
  padding: 36px;
  border-radius: 32px;
  border: solid 2px var(--foreground-color);
  background: var(--foreground-color);
  box-shadow: 0px 0px 8px rgb(var(--blue-shadow-color), 0.8);
  transition: opacity 0.5s ease-out, transform 1s cubic-bezier(0.61, 0.15, 0.26, 1), border 0.5s,
    background 0.5s, box-shadow 0.5s;
}

.content {
  background-image: linear-gradient(90deg, rgba(159, 219, 252, 0.15) 3%, transparent 0),
    linear-gradient(1turn, rgba(159, 219, 252, 0.15) 3%, transparent 0);
  background-size: 20px 20px;
  background-position: 50%;
  html[theme='dark'] & {
    background-image: linear-gradient(90deg, rgba(207, 198, 254, 0.08) 3%, transparent 0),
      linear-gradient(1turn, rgba(207, 198, 254, 0.08) 3%, transparent 0);
  }
  /**
 * Paragraph and inline elements
 * -------------------------------------------------------------------------- */

  p,
  summary {
    margin: 16px 0;
  }

  p {
    line-height: 28px;
  }

  blockquote {
    margin: 16px 0;
    border-left: 3px solid #5cd3ff;
    padding-left: 16px;
    background-color: #5cd4ff25;
    border-radius: 8px;
    html[theme='dark'] & {
      background-color: rgba(157, 124, 216, 0.1); // 更改引用块背景色
      border-left: 3px solid #9d7cd8; // 更改引用块边框颜色
    }
  }
  blockquote > p {
    margin: 0;
    font-size: 16px;
  }

  a {
    font-weight: 500;
    color: var(--color-blue);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.25s, opacity 0.25s;
  }

  strong {
    font-weight: 600;
  }

  code {
    background-color: #f0f0f0;
    border-radius: 3px;
    html[theme='dark'] & {
      background-color: rgba(157, 124, 216, 0.1);
    }
  }

  /**
 * Headings
 * -------------------------------------------------------------------------- */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    font-weight: 600;
    outline: none;
  }

  h1 {
    letter-spacing: -0.02em;
    line-height: 40px;
    font-size: 28px;
  }

  h2 {
    margin: 48px 0 16px;
    border-top: 2px solid #ced4da;
    padding-top: 24px;
    letter-spacing: -0.02em;
    line-height: 32px;
    font-size: 24px;

    .header-anchor {
      top: 24px;
    }
  }

  h3 {
    margin: 32px 0 0;
    letter-spacing: -0.01em;
    line-height: 28px;
    font-size: 20px;
  }

  h4,
  h5,
  h6 {
    margin: 0;
    line-height: 24px;
    font-size: 16px;
  }

  .header-anchor {
    position: absolute;
    top: 0;
    left: 0;
    margin-left: -0.87em;
    font-weight: 500;
    user-select: none;
    opacity: 0;
    text-decoration: none;
    transition: color 0.25s, opacity 0.25s;
  }

  .header-anchor:before {
    content: '#';
  }

  h1:hover .header-anchor,
  h1 .header-anchor:focus,
  h2:hover .header-anchor,
  h2 .header-anchor:focus,
  h3:hover .header-anchor,
  h3 .header-anchor:focus,
  h4:hover .header-anchor,
  h4 .header-anchor:focus,
  h5:hover .header-anchor,
  h5 .header-anchor:focus,
  h6:hover .header-anchor,
  h6 .header-anchor:focus {
    opacity: 1;
  }

  @media (min-width: 768px) {
    h1 {
      letter-spacing: -0.02em;
      line-height: 40px;
      font-size: 32px;
    }
  }

  /**
 * Decorational elements
 * -------------------------------------------------------------------------- */
  hr {
    border: 0;
    border-top: 2px dashed #ced4da;
    html[theme='dark'] & {
      border-top: 2px dashed rgba(157, 124, 216, 0.3); // 更改分割线颜色
    }
  }

  /**
 * Lists
 * -------------------------------------------------------------------------- */

  ul,
  ol {
    padding-left: 1.25rem;
    margin: 16px 0;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  li + li {
    margin-top: 8px;
  }

  li > ol,
  li > ul {
    margin: 8px 0 0;
  }

  /**
 * Table
 * -------------------------------------------------------------------------- */

  table {
    width: 100%;
    border-collapse: collapse;
    border: 2px solid #cad4d5;
    html[theme='dark'] & {
      border: 2px solid #383852; // 更改表格边框颜色
    }
  }

  th,
  td {
    padding: 10px;
    color: #3c3e41;
    text-align: center;
    border-bottom: 2px solid #cad4d5;
  }

  th {
    background-color: #e7f6fa;
    color: var(--btn-hover);
    html[theme='dark'] & {
      background-color: rgba(157, 124, 216, 0.1);
      color: #e0e0e6;
    }
  }

  th:nth-child(odd) {
    background-color: #e0f0f2;
    html[theme='dark'] & {
      background-color: rgba(157, 124, 216, 0.15);
    }
  }

  td {
    background-color: #f7f7f6;
    html[theme='dark'] & {
      background-color: rgba(31, 31, 44, 0.6);
      color: #c8c8dc;
    }
  }

  td:nth-child(odd) {
    background-color: #ececeb;
    html[theme='dark'] & {
      background-color: rgba(31, 31, 44, 0.8);
    }
  }

  /**
 * Code
 * -------------------------------------------------------------------------- */

  div[class*='language-'] {
    display: flex;
    flex-direction: row-reverse;
    position: relative;
    background-color: #efefef;
    border: 2px solid var(--foreground-color);
    border-radius: 16px;
    box-shadow: 0px 0px 5px #c1c1c1;
    overflow: hidden;
    padding-top: 48px;
    margin-bottom: 10px;
    html[theme='dark'] & {
      background-color: #1f1f2c;
      border: 2px solid #383852;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }

    .lang {
      position: absolute;
      transform: translate(-50%, -36px);
      left: 50%;
      user-select: none;
      font-weight: bold;
      padding-bottom: 10px;
      border-bottom: 5px solid var(--font-color-gold);
    }

    code {
      background-color: transparent;
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
      border-bottom: 3px solid rgb(213, 217, 219);
      box-sizing: border-box;
      background-color: rgb(239, 242, 244);
      background-image: var(--deco2);
      background-repeat: no-repeat;
      background-position: left;
      background-size: contain;
      html[theme='dark'] & {
        border-bottom: 3px solid #383852;
        background-color: rgba(31, 31, 44, 0.8);
      }
    }

    pre {
      margin: 0;
      flex-grow: 1;
      overflow-x: scroll;
      overflow-y: hidden;
    }

    .line-numbers-wrapper {
      border-right: 2px solid #dfdfdf;
      text-align: center;
      user-select: none;
      html[theme='dark'] & {
        border-right: 2px solid #383852;
      }
    }

    pre,
    .line-numbers-wrapper {
      padding: 8px;
    }
  }

  /**
 * Custom Block
 * -------------------------------------------------------------------------- */

  .custom-block {
    transition: background-color 0.5s, border-color 0.5s, color 0.5s;

    &.tip,
    &.info,
    &.warning,
    &.danger {
      margin: 1rem 0;
      border-left: 0.35rem solid;
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
          content: var(--icon-tip);
        }
      }

      html[theme='dark'] & {
        background-color: rgba(158, 124, 216, 0.18);
        border-color: #9e7cd8ae;
        color: #e0e0e6;
      }
    }

    &.info {
      background-color: #f3f5f7;
      border-color: var(--font-color-grey);

      .custom-block-title {
        &::before {
          content: var(--icon-info);
        }
      }

      html[theme='dark'] & {
        background-color: rgba(108, 182, 255, 0.161);
        border-color: #6cb6ffcf;
        color: #e0e0e6;

        .custom-block-title {
          color: #89c4ff;
        }
      }
    }

    &.warning {
      border-color: #e7c000;
      color: #6b5900;
      background-color: #fff7d0;

      .custom-block-title {
        &::before {
          content: var(--icon-warning);
        }
      }

      html[theme='dark'] & {
        background-color: rgba(231, 192, 0, 0.1);
        color: #f0d87d;

        .custom-block-title {
          color: #e7c000;
        }
      }
    }

    &.danger {
      border-color: #d58d86;
      color: #4d0000;
      background-color: #ffe6e6;

      .custom-block-title {
        &::before {
          content: var(--icon-danger);
        }
      }

      html[theme='dark'] & {
        background-color: rgba(213, 141, 134, 0.1);
        color: #ffc4c0;

        .custom-block-title {
          color: #ff9b93;
        }
      }
    }

    &.details {
      summary {
        font-weight: bold;
      }
      margin: 1rem 0;
      padding: 1rem 1.5rem;
      overflow-x: auto;
      border-radius: 16px;
      background-color: #f3f5f7;
      border-color: var(--font-color-grey);

      html[theme='dark'] & {
        background-color: rgba(158, 124, 216, 0.168);
        border-color: #383852;
      }
    }
  }

  .custom-block-title {
    font-weight: bold;
  }

  /**
 * others
 * -------------------------------------------------------------------------- */

  img,
  svg,
  video,
  iframe {
    max-width: 100%;
    border-radius: 8px;
    filter: var(--img-brightness);
    transition: filter 0.5s;
  }
}

@media (max-width: 768px) {
  .view-box {
    padding: 24px;
    border-radius: 32px;
  }
  .content {
    /**
 * Code
 * -------------------------------------------------------------------------- */

    div[class*='language-'] {
      padding-top: 36px;
      font-size: 12px;

      .lang {
        transform: translate(-50%, -32px);
        padding-bottom: 5px;
        border-bottom: 4px solid var(--font-color-gold);
      }

      code {
        line-height: 12px;
      }

      button.copy {
        width: 36px;
        height: 36px;
      }

      &::before {
        height: 36px;
      }
    }
  }
}
</style>

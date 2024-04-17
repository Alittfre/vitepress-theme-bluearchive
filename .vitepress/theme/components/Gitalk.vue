<template>
    <div class="gitalk-container">
        <div id="gitalk-container"></div>
    </div>
</template>
<script setup lang="ts">
import md5 from "md5"
import Gitalk from "gitalk"
import "gitalk/dist/gitalk.css"
import { onMounted } from 'vue'

import { useData } from 'vitepress'
const themeConfig = useData().theme.value

onMounted(() => {
    const commentConfig = {
        clientID: themeConfig.clientID,
        clientSecret: themeConfig.clientSecret,
        repo: themeConfig.repo,
        owner: themeConfig.owner,
        admin: themeConfig.admin,
        id: md5(location.pathname).toString(),
        distractionFreeMode: false,
    }
    const gitalk = new Gitalk(commentConfig)
    gitalk.render("gitalk-container")
})
</script>
<style>
.gt-container .gt-header-textarea {
    color: #000;
}
</style>
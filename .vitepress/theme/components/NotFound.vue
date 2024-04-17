<template>
    <div class="NotFound">
        <p>404</p>
        <p>PAGE NOT FOUND</p>
        <a :href="base">home</a>
    </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress';
const base = useData().site.value.base
</script>
<style scoped lang='less'>
.NotFound {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--font-color-grey);
    font-size: large;
    width: 720px;
    margin: 100px auto;
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 32px;
    border: solid 2px white;
    backdrop-filter: var(--blur-val);
    a {
        color: var(--font-color-grey);
    }
}
</style>
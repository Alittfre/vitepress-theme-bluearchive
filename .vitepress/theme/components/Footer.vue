<template>
  <footer class="container">
    <div class="footer-info">
      <span>© {{ new Date().getFullYear() }} {{ footerName }} </span>
      <br>
      <span>Powered by <span class="powered-list" v-for="(obj, ind) in poweredList" :key="obj.url"><a :href="obj.url">{{
        obj.name }}</a>{{ ind < poweredList.length - 1 ? ' & ' : '' }}</span></span>
    </div>
    <div class="footer-logo">
      <img src="../assets/icon/footLogo.svg" alt="logo-vitepress">
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
const themeConfig = useData().theme.value
const footerName = themeConfig.footerName
const poweredList = themeConfig.poweredList

</script>
<style scoped lang='less'>
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  z-index: 100;
  margin-top: 50px;
  padding: 0 16px;
  box-sizing: border-box;
  border-radius: 30px 30px 0 0;
  border-top: solid 2px white;
  border-left: solid 2px white;
  border-right: solid 2px white;
  background: linear-gradient(0.75turn, transparent, white 25%), var(--triangle-background);
  backdrop-filter: var(--blur-val);
  box-shadow: var(--blue-shadow);
}

.footer-info {
  a {
    color: var(--color-blue);
  }
}

.footer-logo {
  img {
    height: 36px
  }
}

@media(max-width:768px) {
  .footer-info {
    font-size: 12px;
  }

  .footer-logo {
    img {
      height: 26px;
    }
  }
}
</style>

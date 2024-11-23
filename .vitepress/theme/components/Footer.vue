<template>
  <footer class="container">
    <div class="footer-info">
      <span>© {{ new Date().getFullYear() }} {{ footerName }} </span>
      <br />
      <span
        >Powered by
        <span class="powered-list" v-for="(obj, ind) in poweredList" :key="obj.url"
          ><a :href="obj.url">{{ obj.name }}</a
          >{{ ind < poweredList.length - 1 ? ' & ' : '' }}</span
        ></span
      >
    </div>
    <div class="footer-logo">
      <img @dragstart.prevent src="../assets/icon/footLogo.svg" alt="logo-vitepress" />
    </div>
  </footer>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
const themeConfig = useData().theme.value
const footerName = themeConfig.footerName
const poweredList = themeConfig.poweredList
</script>
<style scoped lang="less">
footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1vw;
  height: 4.2vw;
  z-index: 100;
  margin-top: 5vh;
  padding: 0 1vw;
  box-sizing: border-box;
  border-radius: 2vw 2vw 0 0;
  border-top: solid 2px var(--foreground-color);
  border-left: solid 2px var(--foreground-color);
  border-right: solid 2px var(--foreground-color);
  background: linear-gradient(0.75turn, transparent, var(--foreground-color) 25%),
    var(--triangle-background);
  backdrop-filter: var(--blur-val);
  box-shadow: 0px 0px 8px rgb(var(--blue-shadow-color), 0.8);
}

.footer-info {
  a {
    color: var(--color-blue);
  }
}

.footer-logo {
  img {
    height: 2vw;
  }
}

@media (max-width: 768px) {
  footer {
    font-size: 1.5vh;
    height: 7vh;
    padding: 0 3vw;
    border-radius: 3vh 3vh 0 0;
  }

  .footer-logo {
    img {
      height: 3vh;
    }
  }
}
</style>

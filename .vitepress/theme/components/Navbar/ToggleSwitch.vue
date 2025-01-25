<template>
    <div class="toggle-container">
      <div class="theme-select">
        <span class="label">主题</span>
        <div class="select-wrapper">
          <select v-model="selectedTheme" @change="changeTheme">
            <option value="light">Arona</option>
            <option value="dark">Plana</option>
            <option value="system">System</option>
          </select>
          <span class="select-arrow">▼</span>
        </div>
      </div>
      <div v-for="(label, id) in toggles" 
           :key="id" 
           class="toggle-item">
        <span class="label">{{ label }}</span>
        <input type="checkbox" 
               :id="id" 
               :checked="state[id]" 
               @change="toggleSwitch(id)">
        <label :for="id" class="toggleSwitch"></label>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useStore } from '../../store'
  import { onMounted, ref } from 'vue'
  const { state } = useStore()
  
  const selectedTheme = ref('system')
  
  const toggles = {
      fireworksEnabled: '烟花',
      SpinePlayerEnabled: 'Spine',
  }
  
  let darkModeMediaQuery: MediaQueryList
  let handleSystemThemeChange: (e: MediaQueryListEvent | MediaQueryList) => void
  
  // 页面加载时从 localStorage 读取状态
  onMounted(() => {
      // 读取主题设置,如果没有存储值则默认使用system
      const storedTheme = localStorage.getItem('darkMode')
      selectedTheme.value = storedTheme || 'system'
      
      // 定义系统主题变化处理函数
      darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
          if (selectedTheme.value === 'system') {
              const theme = e.matches ? 'dark' : 'light'
              document.documentElement.setAttribute('theme', theme)
              state.darkMode = theme
          }
      }
  
      // 如果是system模式,启动监听
      if (selectedTheme.value === 'system') {
          handleSystemThemeChange(darkModeMediaQuery)
          darkModeMediaQuery.addEventListener('change', handleSystemThemeChange)
      }
  
      applyTheme(selectedTheme.value)
  
      // 读取其他开关状态
      Object.keys(toggles).forEach((key) => {
          const storedValue = localStorage.getItem(key);
          if (storedValue !== null) {
              state[key] = JSON.parse(storedValue);
          }
      });
  });
  
  const changeTheme = () => {
      state.darkMode = selectedTheme.value as 'system' | 'dark' | 'light';
      localStorage.setItem('darkMode', selectedTheme.value);
      
      // 根据选择决定是否启用系统主题监听
      if (selectedTheme.value === 'system') {
          handleSystemThemeChange(darkModeMediaQuery)
          darkModeMediaQuery.addEventListener('change', handleSystemThemeChange)
      } else {
          darkModeMediaQuery.removeEventListener('change', handleSystemThemeChange)
      }
      
      applyTheme(selectedTheme.value);
  };
  
  const toggleSwitch = (key: string) => {
      const isChecked = state[key];
      state[key] = !isChecked;
      localStorage.setItem(key, JSON.stringify(!isChecked));
  };
  
  const applyTheme = (theme: string) => {
      let effectiveTheme = theme
      if (theme === 'system') {
          effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      document.documentElement.setAttribute('theme', effectiveTheme)
      state.darkMode = effectiveTheme as 'light' | 'dark' | 'system'
  }
  </script>
  
  <style scoped lang="less">
  .toggle-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .toggle-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: rgba(var(--blue-shadow-color), 0.05);
    border-radius: 12px;
    transition: all 0.3s;
  
    &:hover {
      background: rgba(var(--blue-shadow-color), 0.06);
    }
  
    .label {
      font-size: 15px;
      color: var(--font-color-grey);
      font-weight: 500;
    }
  }
  
  input[type="checkbox"] {
    display: none;
  }
  
  .toggleSwitch {
    position: relative;
    width: 46px;
    height: 24px;
    background: rgba(82, 82, 82, 0.3);
    border-radius: 24px;
    cursor: pointer;
    transition: all 0.4s ease;
  
    &::after {
      content: "";
      position: absolute;
      left: 3px;
      top: 3px;
      width: 18px;
      height: 18px;
      background: var(--foreground-color);
      border-radius: 50%;
      transition: all 0.4s cubic-bezier(0.3, 1.5, 0.7, 1);
    }
  }
  
  input:checked + .toggleSwitch {
    background: rgb(66, 92, 139);
    
    &::after {
      transform: translateX(22px);
    }
  }
  
  .cooling {
    opacity: 0.5;
    pointer-events: none;
  }
  
  .theme-select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: rgba(var(--blue-shadow-color), 0.05);
    border-radius: 12px;
  
    .select-wrapper {
      position: relative;
      width: 90px;
      margin-left: 10px;
      .select-arrow {
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--font-color-grey);
        font-size: 12px;
        pointer-events: none;
        opacity: 0.6;
      }
    }
  
    select {
      width: 100%;
      padding: 6px 28px 6px 10px;
      font-size: 14px;
      border-radius: 10px;
      border: 1px solid rgba(var(--blue-shadow-color), 0.15);
      background: var(--foreground-color);
      color: var(--font-color-grey);
      cursor: pointer;
      appearance: none;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: rgba(var(--blue-shadow-color), 0.3);
        background: rgba(var(--blue-shadow-color), 0.03);
      }
      
      &:focus {
        outline: none;
        border-color: rgba(var(--blue-shadow-color), 0.4);
        box-shadow: 0 0 0 2px rgba(var(--blue-shadow-color), 0.1);
      }
  
      option {
        padding: 8px;
        background: var(--foreground-color);
        
        &:hover {
          background: rgba(var(--blue-shadow-color), 0.1);
        }
      }
    }
  }
  </style>
  
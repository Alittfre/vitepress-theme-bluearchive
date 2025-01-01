<template>
    <div v-for="(label, id) in toggles" :key="id">
        <input type="checkbox" :id="id" :checked="state[id]" @change="toggleSwitch(id)">
        <label :for="id" class="toggleSwitch" :class="{ 'cooling': id === 'darkMode' && isButtonCooling }">
            <span class="text">{{ label }}</span>
        </label>
    </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store'
import { onMounted, ref } from 'vue'
const { state } = useStore()

// 定义可切换的项
const toggles = {
    fireworksEnabled: '烟花',
    SpinePlayerEnabled: '阿罗娜',
    darkMode: 'Dark',
}

// 页面加载时从 localStorage 读取状态并应用
onMounted(() => {
    Object.keys(toggles).forEach((key) => {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            state[key] = JSON.parse(storedValue);
        }
    });
    // 应用主题
    applyTheme(state.darkMode);
});

const isButtonCooling = ref(false);

const toggleSwitch = (key: string) => {
    if (key === 'darkMode' && isButtonCooling.value) {
        return;
    }

    const isChecked = state[key];
    state[key] = !isChecked;
    // 切换开关状态并保存到 localStorage
    localStorage.setItem(key, JSON.stringify(!isChecked));
    
    if (key === 'darkMode') {
        applyTheme(!isChecked);
        isButtonCooling.value = true;
        setTimeout(() => {
            isButtonCooling.value = false;
        }, 800); // 设置0.8秒冷却时间
    }
};

const applyTheme = (isDark: boolean) => {
  document.documentElement.setAttribute('theme', isDark ? 'dark' : 'light');
}
</script>

<style scoped lang="less">
input[type="checkbox"] {
    display: none;
}

.toggleSwitch {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    right: 22px;
    width: 35px;
    height: 20px;
    background-color: rgb(82, 82, 82);
    border-radius: 20px;
    cursor: pointer;
    transition-duration: .2s;

    .text {
        position: relative;
        cursor: default;
        white-space: nowrap;
        right: -42px;
        font-size: 12px;
        user-select: none;
        white-space: pre-line;
    }
}

.toggleSwitch::after {
    content: "";
    position: absolute;
    height: 8px;
    width: 8px;
    left: 5px;
    background-color: transparent;
    border-radius: 50%;
    transition: transform 0.26s cubic-bezier(0.27, 0.2, 0.25, 1.51), background-color 0.1s;
    box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
    border: 3px solid var(--foreground-color);
}

input:checked + .toggleSwitch::after {
    transform: translateX(85%);
    background-color: var(--foreground-color);
}

input:checked + .toggleSwitch {
    background-color: rgb(66, 92, 139);
}

.cooling {
    pointer-events: none;
    opacity: 0.7;
}
</style>

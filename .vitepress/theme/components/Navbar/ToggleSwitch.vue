<template>
    <div>
        <input type="checkbox" id="fireworksCheckbox" :checked="state.fireworksEnabled" @change="SwitchFireworks">
        <label for="fireworksCheckbox" class="toggleSwitch"><span class="text">烟花</span></label>
    </div>
    <div>
        <input type="checkbox" id="spinePlayerCheckbox" :checked="state.SpinePlayerEnabled" @change="SwitchSpinePlayer">
        <label for="spinePlayerCheckbox" class="toggleSwitch"><span class="text">阿罗娜</span></label>
    </div>
</template>



<script setup lang="ts">
import { useStore } from '../../store'
import { onMounted } from 'vue'
const { state } = useStore()

// 页面加载时从 localStorage 读取状态并应用
onMounted(() => {
    const fireworkslocal = localStorage.getItem('fireworksEnabled');
    const spinePlayerlocal = localStorage.getItem('SpinePlayerEnabled');
    // 如果 localStorage 中有存储的状态，应用到 state
    if (fireworkslocal!== null) {
        state.fireworksEnabled = JSON.parse(fireworkslocal);
    }
    if (spinePlayerlocal!== null) {
        state.SpinePlayerEnabled = JSON.parse(spinePlayerlocal);
    }
});

const SwitchFireworks = (event: Event) => {
    const isChecked = (event.target as HTMLInputElement).checked;
    state.fireworksEnabled = isChecked;
    // 保存状态到 localStorage
    localStorage.setItem('fireworksEnabled', JSON.stringify(isChecked));
};

const SwitchSpinePlayer = (event: Event) => {
    const isChecked = (event.target as HTMLInputElement).checked;
    state.SpinePlayerEnabled = isChecked;
    localStorage.setItem('SpinePlayerEnabled', JSON.stringify(isChecked));
};
</script>



<style scoped lang="less">
#fireworksCheckbox, #spinePlayerCheckbox {
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
    transition-duration: .2s;
    box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
    border: 3px solid white;
}

#fireworksCheckbox:checked + .toggleSwitch::after,
#spinePlayerCheckbox:checked + .toggleSwitch::after {
    transform: translateX(90%);
    transition-duration: .2s;
    background-color: white;
}

#fireworksCheckbox:checked + .toggleSwitch,
#spinePlayerCheckbox:checked + .toggleSwitch {
    background-color: rgb(66, 92, 139);
    transition-duration: .2s;
}
</style>

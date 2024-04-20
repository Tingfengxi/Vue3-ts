<template>
    <div class="menuIcon">
        <!-- 公共图标封装 -->
        <el-icon :size="size" :color="color">
            <!-- <House /> -->
            <!-- component:组件标签，is：组件名称 -->
            <component :is="name"></component>
        </el-icon>
    </div>
</template>

<script setup lang="ts">
// 子组件接受父组件的方法
defineProps<{
     name:any,
     size?:string,
     color?:string
}>()



</script>

<style scoped>

</style>
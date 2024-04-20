<template>
  <div class="header">
    <div class="header-left">
      <!-- 展开菜单 -->
      <el-icon
        size="30"
        color="#00000"
        v-show="menuStore.menuBoo"
        @click="menuStore.changeMenuBoo()"
        ><Expand
      /></el-icon>
      <!-- 折叠图标 -->
      <el-icon
        size="30"
        color="#00000"
        v-show="!menuStore.menuBoo"
        @click="menuStore.changeMenuBoo()"
        ><Fold
      /></el-icon>
      <!-- 面包屑导航组件 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ route.meta.title }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-right" v-if="loginStore.userInfo">
      <el-avatar :size="30" :src="circleUrl" />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ loginStore.userInfo.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click="clickOut">注销</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// 引入pinia定义的模块
import { useMenuStore } from "@/stores/menu";
import { useRoute ,useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import {useLoginStore} from "@/stores/login"

// 调用菜单模块的仓库
const menuStore = useMenuStore();
const loginStore = useLoginStore()

const route = useRoute();
const router = useRouter();
// 保存图标网址
const circleUrl = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);

// 取出缓存中的用户信息
// JSON.parse:将json字符串转为json对象
// const userInfo =ref(JSON.parse(<string>localStorage.getItem('userInfo')))

// 点击注销跳转登录页
const clickOut = () =>{
    // 清除保存在pinia 和浏览器缓存中的用户信息
     loginStore.changeUserInfo(null)
     localStorage.removeItem('userInfo')
    router.push('/login')
}

</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .header-left {
    display: flex;
    align-items: center;
    .el-icon {
      margin-right: 30px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .el-avatar{
        margin-right: 10px;
    }
    .example-showcase {
      .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

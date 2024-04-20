<template>
  <div id="app">
   <!-- 第一种：不需要展示页面架构（登录、注册...） -->
   <RouterView v-show="!route.meta.requiresAuth" />
   
    <!-- 第二种：需要展示页面架构（仪表盘，用户管理...） -->
    <!-- 路由视图 -->
    <el-container v-show="route.meta.requiresAuth">
      <el-aside>
        <!-- 菜单 -->
        <MenuAside/>
      </el-aside>
      <el-container>
      <el-header>
        <!-- 头部 -->

        <HeaderCom/>
      </el-header>
        <el-main>
          <!-- 路由视图站位 -->
          <!--  -->
          <RouterView/>
        </el-main>
      </el-container>
    </el-container>
    
  </div>
</template>

<script setup lang="ts">
// 引入侧边菜单
import MenuAside from './components/MenuAside.vue';
// 引入头部组件
import HeaderCom from './components/HeaderCom.vue'
// 引入路由配置的方法
import { useRoute } from 'vue-router';

const route =useRoute()
</script>

<style lang="less" scoped>
  #app{
    .el-container{
      .el-aside{
        width: auto;
        min-height: 100vh;
        background-color: gray;
      }
      .el-container{
        .el-header{
          border-bottom: 1px solid #f5f5f5;
        }
      }
    }
  }
</style>
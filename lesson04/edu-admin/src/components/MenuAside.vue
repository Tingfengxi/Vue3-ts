<template>
  <div class="menu">
    <!-- <h5 class="mb-2" style="text-align: center; font-size: 20px; color: white">
      <el-icon><Monitor /></el-icon>
      <span>课堂后台管理系统</span>
    </h5> -->
    <el-menu
      :collapse="menuStore.menuBoo"
      active-text-color="#ffd04b"
      background-color="4#545c6"
      class="el-menu-vertical-demo"
      :default-active="active2"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
      router
    >
    <!-- 路由模式 -->
    <el-menu-item :index="null">
      <el-icon><Platform /></el-icon>
      <template #title> 课堂后台管理系统</template>
    </el-menu-item>
     <template v-for="menu in menuList" :key="menu.id">
      <!--如果没有子菜单就不显示否则就显示  -->
    <el-menu-item :index="menu.path" v-if="!menu.subMenu">
      <MenuIcon :name="menu.icon" />
      <template #title> {{ menu.title }}</template>
    </el-menu-item>
    <!-- 循环的时候会有多个2 或者多个2-1 所以会同时打开多个菜单 -->
      <el-sub-menu :index="menu.path" v-else>
        <!-- 调用二次封装的图标组件-->
        <template #title>
          <MenuIcon :name="menu.icon" />
          <span>{{ menu.title }}</span>
        </template>
       
          <el-menu-item :index="sub.path" v-for="sub in menu.subMenu" :key="sub.id">
            <template #title>
            <MenuIcon :name="sub.icon" />
            <span>{{sub.title}}</span>
          </template>
          </el-menu-item>

      </el-sub-menu>
    </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { ref,watch } from "vue";
import { useMenuStore } from "@/stores/menu";
// 引入二次封装的图标组件
import MenuIcon from "./MenuIcon.vue"
import { useRoute } from "vue-router"

const route = useRoute()
const active2 = ref('/');

watch(()=>route.path,()=>{
   active2.value=route.path
})


const menuStore = useMenuStore()


const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const isCollapse = ref(true);

const menuList = ref<Array<any>>([
   {
    id:1,
    title: '仪表盘',
    path:'/',
    icon:'Odometer'
   },
   {
    id:2,
    title: '权限管理',
    path:'/user',
    icon:'Lock',
    subMenu:[
      {
        id:3,
        title:'用户管理',
        path:'/user',
        icon:'User'
      },
      {
        id:4,
        title:'角色管理',
        path:'/ls',
        icon:'UserFilled'
      },
      {
        id:5,
        title:'权限管理',
        path:'/auth',
        icon:'Unlock'
      }
    ]
   },
   {
    id:6,
    title:'讲师管理',
    path:'/teacher',
    icon:'Avatar',
    subMenu:[
      {
        id:7,
        title:"讲师列表",
        path:'/teacherList',
        icon:'Tickets',
      },
      {
        id:8,
        title:"添加讲师",
        path:'/teacherAdd',
        icon:'Plus'
      }
    ]
   },
   {
    id:'9',
    title:'课程分类管理',
    path:'/courseCate',
    icon:'Menu',
    subMenu:[
      {
        id:10,
        title:"课程分类列表",
        path:'/coursecatelist',
        icon:'Promotion',
      },
      {
        id:11,
        title:"导入课程类别",
        path:'/importcate',
        icon:'HelpFilled'
      }
    ]
   },
   {
    id:'12',
    title:'课程管理',
    path:'/course',
    icon:'Notebook',
    subMenu:[
      {
        id:13,
        title:"课程列表",
        path:'/courselist',
        icon:'DataLine',
      },
      {
        id:14,
        title:"添加课程",
        path:'/courseAdd',
        icon:'Rank'
      }
    ]
   },
   {
    id:'15',
    title:'轮播图管理',
    path:'/lunBo',
    icon:'CameraFilled',
    subMenu:[
      {
        id:13,
        title:"轮播图列表",
        path:'/lunBoList',
        icon:'DataLine',
      },
      {
        id:14,
        title:"添加轮播图",
        path:'/lunBoAdd',
        icon:'Rank'
      }
    ]
   },
   {
    id:15,
    title: '统计分析',
    path:'/anaLyse',
    icon:'TrendCharts',
    subMenu:[
      {
        id:16,
        title:"生成数据",
        path:'/anaLysep',
        icon:'ColdDrink',
      },
      {
        id:17,
        title:"图标显示",
        path:'/anaLyseo',
        icon:'Dish'
      },
     
    ]
   },
   {
    id:18,
    title: '订单列表',
    path:'/orders',
    icon:'ShoppingTrolley'
   },
   {
    id:19,
    title: '文章管理',
    path:'/essay',
    icon:'Management',
    subMenu:[
      {
        id:20,
        title:'文章列表',
        path:'/essayList',
        icon:'List'
      },
      {
        id:21,
        title:'添加文章',
        path:'/essayAdd',
        icon:'CirclePlusFilled'
      },
      {
        id:22,
        title:'文章类别',
        path:'/essayL',
        icon:'Histogram'
      }
    ]

   },
   {
    id:23,
    title: '留言列表',
    path:'/message',
    icon:'Pointer'
   },


])


</script>

<style scoped></style>

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useLoginStore } from '@/stores/login'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta:{
       title:"仪表盘",
       requiresAuth:true
      },
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      meta:{
        title:"关于",
        requiresAuth:true
       },
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta:{
        title:"登录",
        requiresAuth:false
       },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/user',
      name: 'user',
      meta:{
        title:"权限管理/用户管理",
        requiresAuth:true
       },
      component: () => import('../views/auth/UserView.vue')
    },
    {
      path: '/userAdd',
      name: 'userAdd',
      meta:{
        title:"权限管理/用户添加",
        requiresAuth:true
       },
      component: () => import('../views/auth/UserAdd.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      meta:{
        title:"权限管理",
        requiresAuth:true
       },
      component: () => import('../views/auth/AuthView.vue')
    },
    {
      path: '/coursecatelist',
      name: 'coursecatelist',
      meta:{
        title:"课程分类管理 / 课程分类列表",
        requiresAuth:true
       },
      component: () => import('../views/courseCate/courseCateList.vue')
    },
    {
      path: '/importcate',
      name: 'importcate',
      meta:{
        title:"课程分类管理 / 导入课程分类",
        requiresAuth:true
       },
      component: () => import('../views/courseCate/ImportCate.vue')
    },
    {
      path: '/courselist',
      name: 'courselist',
      meta:{
        title:"课程管理 / 课程列表",
        requiresAuth:true
       },
      component: () => import('../views/course/CourseList.vue')
    },
  ]
})


//导航守卫
router.beforeEach((to,from,next)=>{
  // 用户登录正常进行下一步路由操作，未登录不执行
  // 取出保存到pina和浏览器缓存中用户信息进行判断
  const loginStore = useLoginStore()
  const userInfo = localStorage.getItem('userInfo')
  if(loginStore.userInfo || userInfo){
    next()
  }else{
    //避免死循环
    if(to.path =='/login'){
      next()
      return
    }
    next('/login')
  }
})

export default router

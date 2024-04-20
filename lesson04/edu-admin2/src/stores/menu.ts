import { ref } from "vue";
import {defineStore} from "pinia";

// 导出一个菜单状态仓库
export const useMenuStore =defineStore('menuId',()=>{
    // 菜单折叠展开的状态false：展开 true ：折叠
    const menuBoo =ref<boolean>(false)

    // 修改状态的方法
    const changeMenuBoo = () =>{
        menuBoo.value = !menuBoo.value
    }

    // 返回状态和方法
    return{
        menuBoo,
        changeMenuBoo
    }
})

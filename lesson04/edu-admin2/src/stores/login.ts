import { ref } from "vue"
import {defineStore} from "pinia"

// 定义登录业务的仓库
export const useLoginStore = defineStore("loginId",()=>{
    // 定义一个保存用户登录信息的状态
    const userInfo =ref<any>(JSON.parse(<string>localStorage.getItem('userInfo')))
    
    // 修改登录信息的方法
    const changeUserInfo = (params:any)=>{
        userInfo.value=params
    }
    
    return{
        userInfo,
        changeUserInfo
    }

})
<template>
    <div class="login">
        <div class="content">
            <h3><span>欢迎登录</span></h3>
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
              <el-form-item prop="username">
                <el-input
                v-model="ruleForm.username"
                style="width: 240px;margin: 0 auto;"
                placeholder="请输入账号"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
              type="password"
              v-model="ruleForm.password"
              style="width: 240px;margin: 0 auto;"
              placeholder="请输入账号"
              :prefix-icon="Lock"
            />
            </el-form-item> 
            <el-form-item >
                <el-button type="primary" style="width: 220px;margin: 30px auto;" @click="submitForm(ruleFormRef)">登录</el-button>
            </el-form-item>  

            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref,reactive} from "vue"
import {User,Lock} from '@element-plus/icons-vue';
import type { FormInstance,FormRules} from 'element-plus';
import { useRouter } from "vue-router";
import {useLoginStore} from "../stores/login"

const router = useRouter()
const loginStore = useLoginStore()
// 获取表单组件的标识
const ruleFormRef = ref<FormInstance>()

// 定义表单绑定的数据
const ruleForm = reactive({
    username:"",
    password:"",
})

// 自定义密码的校验规则
const checkPass=(rule:any,value:any,callback:any) =>{
    if(value==''){
        callback(new Error('请输入密码'))
    } else{
        //校验密码规则，通过正则
        const regPwd = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z])[0-9!@#$%^&*A-Za-z]{6,18}$/
        if(!regPwd.test(value)) {
            callback(new Error("密码6-18位的大小写字母数字特殊字符"))
        }else{
            callback()
        }
    }
}


// 定义验证规则
const rules = reactive<FormRules>({
       username:[
        {
            required:true,
            message:"请输入账号",
            trigger:'blur'
        },
        {
            min:2,
            max:20,
            message:'输入的账号2-20个字符',
            trigger:'blur'
        }
       ],
       password:[
        {
            required:true,
            validator:checkPass,
            trigger:'blur'
        }
       ]


}) 
// 点击登录触发表单提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {//表单校验
        // 保存登录信息到pina
        loginStore.changeUserInfo(ruleForm)
        // 保存登录信息到浏览器缓存的localStorge中
        // JSON.stringify  把json对象转换成json字符串
        localStorage.setItem('userInfo',JSON.stringify(ruleForm))

        // 跳转首页
      router.push('/')
    } else {
      console.log('error submit!', fields)
    }
  })
}



</script>

<style lang="less" scoped>

.login{
    width: 100%;
    height: 100vh;
    background: url(../assets/img/R-C.jpg);
    background-size: cover;
    position: relative;
    .content{
      width: 400px;
      height: 300px;
      background-color: #fff;
      position: absolute;
      left: 50%;
      top: 20%;
      transform: translate(-50%,0);
      box-shadow: 0 0 5px #CCC;
      border-radius: 8px;
      padding: 20px 10px;
      h3{
          text-align: center;
          font-size: 25px;
          margin-bottom: 30px;
          span{
            border-bottom: 3px solid #409EFF;
          }
          
      }
      .el-form{
        // 如果想修改elment-plus组件底层的样式，需要加deep属性进行穿透才能够使用
        :deep .el-input__wrapper{
            border-radius: 0;
            box-shadow: none;
            border-bottom: 1px solid #CCC;
        }
        :deep .el-form-item__error{
            left: 70px;
        }
      }
    }
}


</style>
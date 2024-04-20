<template>
    <div class="userAdd">
        <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="ruleForm.nickname" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" />
          </el-form-item>
        <el-form-item label="是否可用" prop="status">
          <el-switch v-model="ruleForm.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            保存
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

interface RuleForm {
  username: string
  nickname: string
  password: string
  status: number
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username:'',
  nickname:'',
  password:'',
  status:0
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

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度需在2-20个长度', trigger: 'blur' },
  ],
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名长度需在2-20个长度', trigger: 'blur' },
  ],
  password:[
    {required:true, validator: checkPass, trigger: 'blur'},
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!',ruleForm)
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const route = useRoute()
//接收传递的id
console.log('id:',route.query.id);
if(route.query.id){
    route.meta.title = '权限管理 / 用户编辑'
}
</script>

<style scoped>

</style>
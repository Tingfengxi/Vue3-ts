<template>
    <div class="UserAdd">
        <el-form
    ref="ruleFormRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    status-icon
    
  >
  
          <el-form-item label="用户名" prop="name" >
            <el-input  v-model="ruleForm.name"/>
          </el-form-item>
          <el-form-item label="用户昵称" prop="ni" >
            <el-input v-model="ruleForm.ni" />
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input  v-model="ruleForm.password" />
          </el-form-item>
          <el-form-item label="是否可用" prop="delivery">
            <el-switch v-model="ruleForm.delivery" />
          </el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
    </el-form>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router';
function onSubmit() {
  router.push('/gl')
}
interface RuleForm {
  name: string
  ni: string
  password: string
  delivery: boolean
}
const ruleForm = reactive<RuleForm>({
  name: '',
  ni: '',
  password: '',
  delivery: false,
  
})
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入名字' },
    { min: 3, max: 7, message: '请输入3到7个字符', trigger: 'blur' },
  ],
  ni: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 3, max: 5, message: '请输入3到5个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 11, message: '请输入3到11位密码', trigger: 'blur' },
  ],
  
  
 
})



</script>

<style scoped>

</style>
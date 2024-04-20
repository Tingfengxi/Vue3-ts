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
  
          <el-form-item label="角色名称" prop="name" >
            <el-input  v-model="ruleForm.name"/>
          </el-form-item>
          <el-form-item label="角色code" prop="ni" >
            <el-input v-model="ruleForm.ni" />
          </el-form-item>
          <el-form-item label="角色描述" prop="roled">
            <el-input  v-model="ruleForm.roled" />
          </el-form-item>

          <el-button type="primary" >保存</el-button>
    </el-form>

    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import router from '@/router';

interface RuleForm {
  name: string
  ni: string
  roled: string
}
const ruleForm = reactive<RuleForm>({
  name: '',
  ni: '',
  roled: '',

})
const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: '请输入角色名称' },
    { min: 3, max: 7, message: '请输入3到7个字符', trigger: 'blur' },
  ],
  ni: [
    { required: true, message: '请输入角色code', trigger: 'blur' },
    { min: 3, max: 5, message: '请输入3到5个字符', trigger: 'blur' },
  ],
  roled: [
    { required: true, message: '请输入角色描述称', trigger: 'blur' },
    { min: 3, max: 20, message: '请输入3到20个字符', trigger: 'blur' },
  ],
  
})



</script>

<style scoped>

</style>
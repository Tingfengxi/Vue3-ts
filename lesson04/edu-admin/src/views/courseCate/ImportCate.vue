<template>
  <div class="importCate">
    <el-form label-width="100px">
      <el-form-item label="信息描述">
        <el-button type="info" plain>Excel模板说明</el-button>
        <el-button type="primary" plain :icon="Download"
          >点击下载模板</el-button
        >
      </el-form-item>
      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
        >
          <template #trigger>
            <el-button type="primary">选择文件</el-button>
          </template>
          <el-button style="margin-top: -3px;margin-left: 20px;" type="success" @click="submitUpload">
            上传至服务器
          </el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Download } from "@element-plus/icons-vue";
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
//上传组件标识
const upload = ref<UploadInstance>()
//上传文件超出限制处理
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}
//点击上传至服务器按钮
const submitUpload = () => {
  upload.value!.submit()
}
</script>

<style lang="less" scoped></style>

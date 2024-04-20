<template>
    <div class="import">
        <div class="top">
        <p>信息描述</p>
        <el-button type="info" plain>excel模板说明</el-button>
        <el-button type="primary" plain>点击下载模板</el-button>
    </div>
    <div class="bottom">
        <p>选择Excel</p>
        <el-upload
        ref="upload"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
        <template #trigger>
          <el-button type="primary" style="margin-right: 10px;">选择文件</el-button>
        </template>
        <el-button class="ml-3" type="success" @click="submitUpload">
          上传至服务器
        </el-button>
      </el-upload>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

const submitUpload = () => {
  upload.value!.submit()
}
</script>

<style lang='less' scoped>
 .import{
   .top{
    display: flex;
    margin-bottom: 20px;
    p{
        margin-right: 10px;
    }
   }
   .bottom{
    display: flex;
    p{
        margin-right: 10px;
    }
   }
 }
</style>
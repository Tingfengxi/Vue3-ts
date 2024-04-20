<template>
  <div class="ClassAdd">
    <!-- 进度条 -->
    <el-steps :active="1" align-center>
      <el-step description="填写课程基本信息" />
      <el-step description="创建课程大纲" />
      <el-step description="最终发布" />
    </el-steps>

    <!--课程标题 -->
    <div class="title">
      <p id="ptitle">课程标题</p>
      <el-input v-model="input" placeholder="示例: 机器学习项目课" />
    </div>

    <!--课程分类 -->
    <div class="title">
      <p>课程分类</p>
      <el-select v-model="value" placeholder="一级分类" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
      <el-select v-model="value" placeholder="二级分类" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <!--课程讲师 -->
    <div class="title">
      <p>课程讲师</p>
      <el-select v-model="value" placeholder="请选择" style="width: 240px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <!-- 总课时 -->
    <div class="title">
      <p>总课时</p>
      <el-input-number v-model="num" class="mx-4" :min="0" controls-position="right" @change="handleChange" />
    </div>

    <!-- 课程简介 -->
    <div class="title">
      <p id="ptitle">课程简介</p>
      <el-input v-model="textarea" :rows="2" type="textarea" placeholder="课程简介" />
    </div>

    <!-- 课程封面 -->
    <div class="title">
      <p>课程封面</p>
      <el-upload action="#" list-type="picture-card" :auto-upload="false">
        <el-icon>
          <Plus />
        </el-icon>

        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                <el-icon><zoom-in /></el-icon>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                <el-icon>
                  <Download />
                </el-icon>
              </span>
              <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                <el-icon>
                  <Delete />
                </el-icon>
              </span>
            </span>
          </div>
        </template>
      </el-upload>

      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </div>

    <!-- 课程价格 -->
    <div class="title">
      <p>课程价格</p>
      <el-input-number v-model="num2" class="mx-4" :min="0" controls-position="right" @change="handlePrice" />
      <p>元</p>
    </div>

    <!-- 保存按钮 -->
    <div class="btn">
      <el-button type="primary" @click="nextBtn">保存并下一步</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'
import { useRouter } from 'vue-router'

const input = ref('')

// 课程分类
const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

// 总课时
const num = ref(0)
const handleChange = (value: number) => {
  console.log(value)
}

// 课程简介
const textarea = ref('')

// 课程封面
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
  console.log(file)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}

//课程价格
const num2 = ref(0)
const handlePrice = (value: number) => {
  console.log(value)
}

//保存按钮
const router = useRouter()
const nextBtn = ()=> {
  ElMessage.success('保存成功')
  router.push('/classadd2')
}
</script>

<style lang="less" scoped>

.title {
  display: flex;
  margin: 20px 0px;

  #ptitle {
    margin-right: 5px;
  }

  p {
    margin-top: 10px;
    width: 80px;
  }
}

.btn {
  margin-left: 80px;
}
</style>
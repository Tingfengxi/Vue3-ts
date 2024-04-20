<template>
    <div class="courseList">
        <el-input
    v-model="filterText"
    placeholder="Filter keyword"
  />
  <el-button
  key="primary"
  type="primary"
  link @click="dialogFormVisible = true"
  style="margin-top: 40px;"
  >添加一级分类</el-button>

  <el-dialog v-model="dialogFormVisible" title="添加一级分类" >
    <el-form :model="form">
      <el-form-item label="分类标题" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类排序" :label-width="formLabelWidth">
        <el-input-number v-model="num" :min="1" :max="10" @change="handleChange" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>

<el-tree
  :data="dataSource"
  node-key="id"
  default-expand-all
  :expand-on-click-node="false"
  style="margin-top: 10px;"
>
  <template #default="{ node, data }">
    <span class="custom-tree-node">
      <span>{{ node.label }}</span>
      <span>
        <el-icon color="#409EFF" v-if="data.children"><Plus /></el-icon>
        <el-icon color="#409EFF"><DeleteFilled /></el-icon>
        <el-icon color="#409EFF"><EditPen /></el-icon>
      </span>
    </span>
  </template>
</el-tree>


    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
const filterText = ref('')

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const num = ref(1)
const handleChange = (value: number) => {
  console.log(value)
}

import type Node from 'element-plus/es/components/tree/src/model/node'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
let id = 1000



const remove = (node: Node, data: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
}



const dataSource = ref<Tree[]>([
  {
    id: 1,
    label: '前端开发',
    children: [
      {
        id: 6,
        label: 'JavaScript',
      },
      {
        id: 7,
        label: 'Jquery',
      },
    ],
  },
  {
    id: 2,
    label: '编程语言',
    children: [
      {
        id: 8,
        label: 'Java',
      },
      {
        id: 9,
        label: 'C++',
      },
      {
        id: 10,
        label: '编程语言',
      },
    ],
  },
  {
    id: 3,
    label: '后端开发',
    children: [
      {
        id: 11,
        label: 'SpringBoot',
      },
      {
        id: 12,
        label: 'Mysql',
      },
    ],
  },
  {
    id: 4,
    label: '系统运维',
    children: [
      {
        id: 13,
        label: 'Linux',
      },
      {
        id: 14,
        label: 'Docker',
      },
    ],
  },
  {
    id: 5,
    label: '大数据',
    children: [
      {
        id: 15,
        label: 'MongoDB',
      },
      {
        id: 16,
        label: 'Hadoop',
      },
      {
        id: 17,
        label: 'Spark',
      },
      {
        id: 18,
        label: '云计算',
      },
    ],
  },
])

</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>
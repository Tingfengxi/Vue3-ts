<template>
  <div class="auth">
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="title" label="名称" sortable />
      <el-table-column prop="path" label="访问路径" sortable />
      <el-table-column prop="auth" label="权限值" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            text
            v-if="scope.row.flag == 1"
            @click="addMenu"
            >添加菜单</el-button
          >
          <el-button type="primary" text v-if="scope.row.flag == 2" @click="addFun"
            >添加功能</el-button
          >
          <el-button
            type="info"
            text
            v-if="scope.row.flag == 1 || scope.row.flag == 2" @click="changeMenu(scope.row.id)"
            >修改</el-button
          >
          <el-button type="info" text v-else @click="changeFun(scope.row.id)">修改功能</el-button>
          <el-button type="danger" text @click="del">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加菜单弹窗 -->
    <el-dialog v-model="dialogFormVisible" :title="menuTitle" width="500" @close="cancelMenuForm(menuFormRef)">
      <el-form :model="form" :rules="rules" ref="menuFormRef">
        <el-form-item label="菜单名称" :label-width="formLabelWidth" prop="title" >
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelMenuForm(menuFormRef)">取消</el-button>
          <el-button type="primary" @click="confirmMenuForm(menuFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 添加/修改功能弹窗 -->
    <el-dialog v-model="dialogFormVisible2" :title="funTitle" width="500" @close="cancelMenuForm2(menuFormRef2)">
      <el-form :model="form2" :rules="rules2" ref="menuFormRef2">
        <el-form-item label="功能名称" :label-width="formLabelWidth" prop="title" >
          <el-input v-model="form2.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="访问路径" :label-width="formLabelWidth" prop="path" >
          <el-input v-model="form2.path" autocomplete="off" />
        </el-form-item>
        <el-form-item label="权限值" :label-width="formLabelWidth" prop="auth" >
          <el-input v-model="form2.auth" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelMenuForm2(menuFormRef2)">取消</el-button>
          <el-button type="primary" @click="confirmMenuForm2(menuFormRef2)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from 'element-plus';
import { ElMessage, ElMessageBox } from "element-plus";

interface User {
  id: number;
  title: string;
  flag?: number;
  path?: string;
  auth?: string;
  hasChildren?: boolean;
  children?: User[];
}
const tableData = ref<User[]>([
  {
    id: 1,
    title: "全部数据",
    flag: 1,
    children: [
      {
        id: 2,
        title: "轮播图管理",
        flag: 1,
        children: [
          {
            id: 3,
            title: "banner操作",
            flag: 2,
            children: [
              {
                id: 4,
                title: "删除banner",
                path: "/banner/del",
                auth: "banner.del",
              },
              {
                id: 5,
                title: "修改banner",
                path: "/banner/change",
                auth: "banner.change",
              },
              {
                id: 6,
                title: "获取banner",
                path: "/banner/get",
                auth: "banner.get",
              },
            ],
          },
          {
            id: 7,
            title: "banner列表",
            flag: 2,
            children: [
              {
                id: 8,
                title: "banner列表",
                path: "/banner/list",
                auth: "banner.list",
              },
            ],
          },
        ],
      },
      {
        id: 9,
        title: "统计分析",
        flag: 1,
        children: [
          {
            id: 10,
            title: "分析数据",
            flag: 2,
          },
        ],
      },
    ],
  },
]);

//菜单弹窗数据
const menuFormRef = ref<FormInstance>()
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const menuTitle = ref('添加菜单')

const form = reactive({
    title: '',
});
const rules = reactive({
    title: [
        {required: true, message: "请输入功能名称", trigger: 'blur'},
        {min: 2, max: 10 ,message: '功能名称2-10个字符长度', trigger: 'blur'}
    ],
})
//点击菜单确认
const confirmMenuForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      //关闭菜单弹窗
      dialogFormVisible.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
//点击取消
const cancelMenuForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  //关闭菜单弹窗
  dialogFormVisible.value = false
}
//点击菜单添加
const addMenu = ()=>{
  menuTitle.value = '添加菜单'
  dialogFormVisible.value = true
}

//点击菜单修改
const changeMenu = (id:number) =>{
  menuTitle.value = '修改菜单'
  //数据回显服务端时写
  dialogFormVisible.value = true
}


//功能弹窗数据
const menuFormRef2 = ref<FormInstance>()
const dialogFormVisible2 = ref(false);
const funTitle = ref('添加功能')

const form2 = reactive({
    title: '',
    path: '',
    auth: '',
});
const rules2 = reactive({
    title: [
        {required: true, message: "请输入菜单名称", trigger: 'blur'},
        {min: 2, max: 10 ,message: '菜单名称2-10个字符长度', trigger: 'blur'}
    ],
    path: [
      {required: true,message: '请输入访问路径', trigger: 'blur'}
    ],
    auth: [
      {required: true,message: '请输入权限值', trigger: 'blur'}
    ]
})
//点击功能确认
const confirmMenuForm2 = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      //关闭功能弹窗
      dialogFormVisible2.value = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
//点击取消
const cancelMenuForm2 = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  //关闭功能弹窗
  dialogFormVisible2.value = false
}
//点击功能添加
const addFun = ()=>{
  funTitle.value = '添加功能'
  dialogFormVisible2.value = true
}

//点击功能修改
const changeFun = (id:number) =>{
  funTitle.value = '修改功能'
  //数据回显服务端时写
  dialogFormVisible2.value = true
}
//点击删除
const del = (index: number) => {
  ElMessageBox.confirm("确定要删除这条数据吗", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消",
      });
    });
};
</script>

<style scoped></style>

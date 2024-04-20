<template>
  <div class="user">
    <!-- 表单组件 -->
    <el-form
      ref="formInlineRef"
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item prop="user">
        <el-input
          v-model="formInline.user"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input
          v-model="formInline.nickName"
          placeholder="请输入昵称"
          clearable
        />
      </el-form-item>
      <el-form-item label="注册时间" prop="createTime">
        <el-date-picker
          v-model="formInline.createTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :icon="Search"
          >查询</el-button
        >
        <el-button @click="resetForm(formInlineRef)">清空</el-button>
      </el-form-item>
    </el-form>
    <!-- 按钮组件 -->
    <el-row>
      <el-button type="primary" @click="touseradd">添加</el-button>
      <el-button type="danger" @click="delMore">批量删除</el-button>
    </el-row>
    <!-- 表格组件 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelection"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="name" label="用户名" />
      <el-table-column prop="nickname" label="昵称" />
      <el-table-column prop="logintime" label="最近登录时间" />
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag type="success" v-if="scope.row.status === 1">正常</el-tag>
          <el-tag type="danger" v-else>异常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" />
      <el-table-column prop="updatetime" label="更新时间" />
      <el-table-column prop="createuser" label="创建人" />
      <el-table-column prop="updateuser" label="修改人" />
      <el-table-column label="状态" width="260">
        <template #default="scope">
          <el-popover placement="top" :width="200" trigger="click" v-model:visible="scope.row.radioVisible">
            <template #reference>
              <el-button type="info">分配角色</el-button>
            </template>
            <!-- 单选框组件 -->
            <el-radio-group
              v-model="scope.row.role"
            >
              <el-radio value="管理员">管理员</el-radio>
              <el-radio value="普通用户">普通用户</el-radio>
            </el-radio-group>
            <el-button type="primary" @click="saveRole(scope.$index)">保存</el-button>
          </el-popover>
          <el-button type="primary" @click="toEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[10, 20, 30, 40]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { reactive } from "vue";
import type { FormInstance } from "element-plus";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";

const router = useRouter();
const formInlineRef = ref<FormInstance>();

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
// 搜索表单的数据
const formInline = reactive({
  user: "",
  nickName: "",
  createTime: "",
});
// 表格数据
const tableData = ref([
  {
    id: 1,
    name: "张三",
    nickname: "小张",
    logintime: "2024-4-15 16:00:00",
    status: 1,
    role: '管理员',
    radioVisible:false,
    createtime: "2024-4-15 16:00:00",
    updatetime: "2024-4-15 16:00:00",
    createuser: "管理员",
    updateuser: "张三",
  },
  {
    id: 2,
    name: "李四",
    nickname: "小李",
    logintime: "2024-4-15 16:00:00",
    status: 0,
    role: '普通用户',
    radioVisible:false,
    createtime: "2024-4-15 16:00:00",
    updatetime: "2024-4-15 16:00:00",
    createuser: "管理员",
    updateuser: "张三",
  },
]);

//保存多选框选中的数据
const selectIds = ref<number[]>([]);

//分页组件数据
const currentPage4 = ref(1);
const pageSize4 = ref(10);
const small = ref(false);
const background = ref(true);
const disabled = ref(false);
// 点击搜索
const onSubmit = () => {
  console.log("submit!", formInline);
};
// 点击清空
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // 调用表单重置方法
  formEl.resetFields();
};
// 点击添加
const touseradd = () => {
  // 跳转用户添加页
  router.push("/useradd");
};

//表格多选框发生改变时触发
const handleSelection = (val: any[]) => {
  console.log("多选框选中：", val);
  selectIds.value = val.map((item) => item.id);
};

//点击批量删除
const delMore = () => {
  if (selectIds.value.length > 0) {
    console.log("选中保存的id:", selectIds.value);
    for (let i = 0; i < selectIds.value.length; i++) {
      for (let y = 0; y < tableData.value.length; y++) {
        if (selectIds.value[i] == tableData.value[y].id) {
          tableData.value.splice(y, 1);
        }
      }
    }
    ElMessage({
      message: "删除数据成功",
      type: "success",
    });
  } else {
    ElMessage({
      message: "请选择数据,再执行删除",
      type: "warning",
    });
  }
};

//点击删除
const del = (index: number) => {
  ElMessageBox.confirm("确定要删除这条数据吗", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      tableData.value.splice(index, 1);
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

//点击编辑
const toEdit = (id: number) => {
  //跳转用户添加页，传递id
  router.push({ path: "/userAdd", query: { id: id } });
};

//分配角色
const radioVisible = ref(false)
//角色保存
const saveRole = (index:number) => {
  //关闭弹出层
  tableData.value[index].radioVisible = false 
  //后面修改数据库中的身份
}
</script>

<style lang="less" scoped>
.demo-form-inline {
  .el-input {
    --el-input-width: 220px;
  }
  .el-select {
    --el-select-width: 220px;
  }
}

.el-table {
  margin: 30px 0;
}
</style>

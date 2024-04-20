<template>
  <div class="courseList">
    <!-- 表单组件 -->
    <el-form
      ref="formInlineRef"
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
    >
      <el-form-item prop="courseCate">
        <el-cascader
          v-model="formInline.courseCate"
          :options="options"
          placeholder="请选择课程分类"
          clearable
        />
      </el-form-item>
      <el-form-item prop="title">
        <el-input
          v-model="formInline.title"
          placeholder="请输入课程标题"
          clearable
        />
      </el-form-item>
      <el-form-item prop="teacher">
        <el-select v-model="formInline.teacher" placeholder="请选择讲师" clearable >
            <el-option
              v-for="item in teacherList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="formInline.status" placeholder="请选择课程状态" clearable>
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :icon="Search"
          >查询</el-button
        >
        <el-button @click="resetForm(formInlineRef)">清空</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格组件 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelection"
      border
    >
      <el-table-column type="index" label="序号" width="55" />
      <el-table-column prop="" label="课程信息" width="400px">
        <template #default="scope">
            <div class="courseInfo">
                <img :src="scope.row.cover" alt="">
                <div class="info-right">
                    <h3>{{ scope.row.title }}</h3>
                    <span>{{ scope.row.lesson }}课时</span>
                </div>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template #default="scope">
            ￥{{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column prop="moneyPeople" label="付费学员">
        <template #default="scope">
            {{ scope.row.moneyPeople }}人
        </template>
      </el-table-column>
      <el-table-column label="课程状态">
        <template #default="scope">
          <el-button type="primary" v-if="scope.row.status === 1">上架</el-button>
          <el-button type="danger" v-else>下架</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="createtime" label="创建时间" />
      <el-table-column prop="updatetime" label="更新时间" />
      <el-table-column label="操作" width="260">
        <template #default="scope">
          <el-popover
            placement="top"
            :width="200"
            trigger="click"
            v-model:visible="scope.row.radioVisible"
          >
            <template #reference>
              <el-button type="info">分配角色</el-button>
            </template>
            <!-- 单选框组件 -->
            <el-radio-group v-model="scope.row.role">
              <el-radio value="管理员">管理员</el-radio>
              <el-radio value="普通用户">普通用户</el-radio>
            </el-radio-group>
            <el-button type="primary" @click="saveRole(scope.$index)"
              >保存</el-button
            >
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
  courseCate: "",
  title: "",
  teacher: "",
  status: "",
});

import imgUrl from "../../assets/img/login_bg.webp"
// 表格数据
const tableData = ref([
  {
    id: 1,
    title: "Python全栈",
    cover: imgUrl,
    lesson: 64,
    status: 1,
    price: 88.88,
    moneyPeople: 10,
    createtime: "2024-4-15 16:00:00",
    updatetime: "2024-4-15 16:00:00",
  },
  {
    id: 2,
    title: "Java全栈",
    cover: imgUrl,
    lesson: 32,
    status: 0,
    price: 98.88,
    moneyPeople: 7,
    createtime: "2024-4-15 16:00:00",
    updatetime: "2024-4-15 16:00:00",
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
const radioVisible = ref(false);
//角色保存
const saveRole = (index: number) => {
  //关闭弹出层
  tableData.value[index].radioVisible = false;
  //后面修改数据库中的身份
};

const value = ref([]);

const props = {
  expandTrigger: "hover" as const,
};

const handleChange = (value) => {
  console.log(value);
};
//级联选择器课程分类数据
const options = ref([
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
]);
//下拉选择框讲师数据
const teacherList = [
  {
    value: 'zhang',
    label: '张老师',
  },
  {
    value: 'li',
    label: '李老师',
  },
  {
    value: 'wang',
    label: '王老师',
  },
]
//下拉框课程状态数据
const statusList = [
  {
    value: 1,
    label: '上架',
  },
  {
    value: 0,
    label: '下架',
  },
]
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
  .courseInfo{
    display:flex;
    img{
        width:200px;
        height:140px;
    }
    .info-right{
        margin-left:10px;
        flex:1;
        text-align:center;
        h3{
            color:#409EFF;
            margin-bottom:30px;
        }
    }
  }
}
</style>

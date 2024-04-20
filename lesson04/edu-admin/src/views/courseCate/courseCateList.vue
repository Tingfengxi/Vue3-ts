<template>
  <div class="courseCateList">
    <!-- 树形控件搜索 -->
    <el-input v-model="filterText" placeholder="Filter keyword" />
    <!-- 添加按钮 -->
    <el-row>
      <el-button type="primary" text @click="addCate('添加一级分类')">添加一级分类</el-button>
    </el-row>
    <!-- 树形控件 -->
    <el-tree
      ref="treeRef"
      class="filter-tree"
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      :expand-on-click-node="false"
    >
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <el-icon color="#409EFF" v-if="data.children" @click="addCate('添加二级分类')"><Plus /></el-icon>
            <el-icon color="#F56C6C" style="margin: 0 20px" @click="del" ><Delete /></el-icon>
            <el-icon color="#E6A23C" @click="changeCate(data.children)"><EditPen /></el-icon>
          </span>
        </span>
      </template>
    </el-tree>
    <!-- 添加分类弹窗 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="cateTitle"
      width="500"
      @close="cancelCateForm(cateFormRef)"
    >
      <el-form :model="form" :rules="rules" ref="cateFormRef">
        <el-form-item
          label="分类标题"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="分类排序"
          :label-width="formLabelWidth"
          prop="sort"
        >
          <el-input-number v-model="form.sort" :min="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancelCateForm(cateFormRef)">取消</el-button>
          <el-button type="primary" @click="confirmCateForm(cateFormRef)">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from "vue";
import type { FormInstance } from 'element-plus';
import { ElTree, ElMessage, ElMessageBox } from "element-plus";

interface Tree {
  [key: string]: any;
}

const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: "children",
  label: "label",
};

watch(filterText, (val) => {
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree) => {
  if (!value) return true;
  return data.label.includes(value);
};

const data = ref<Tree[]>([
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

//课程分类弹窗数据
const cateFormRef = ref<FormInstance>();
const dialogFormVisible = ref(false);
const formLabelWidth = "100px";
const cateTitle = ref("添加一级分类");

const form = reactive({
  title: "",
  sort: 0,
});
const rules = reactive({
  title: [
    { required: true, message: "请输入分类标题", trigger: "blur" },
    { min: 2, max: 20, message: "分类标题2-20个字符长度", trigger: "blur" },
  ],
});
//点击课程分类弹窗确认
const confirmCateForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      //关闭弹窗
      dialogFormVisible.value = false;
    } else {
      console.log("error submit!", fields);
    }
  });
};
//点击课程分类弹窗取消
const cancelCateForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  //关闭弹窗
  dialogFormVisible.value = false;
};
//点击课程分类添加
const addCate = (title:string) => {
  cateTitle.value = title;
  dialogFormVisible.value = true;
};

//点击课程分类修改
const changeCate = (params: any | undefined) => {
  if(params) {
    cateTitle.value = "修改一级分类";
  }else{
    cateTitle.value = "修改二级分类";
  }
  //数据回显服务端时写
  dialogFormVisible.value = true;
};
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

<style lang="less" scoped>
.courseCateList {
  .el-row {
    margin-top: 30px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>

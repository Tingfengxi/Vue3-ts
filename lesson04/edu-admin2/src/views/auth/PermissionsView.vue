<template>
    <div class="permissions">
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column prop="name" label="名称" sortable />
        <el-table-column prop="route" label="访问路径" sortable />
        <el-table-column prop="admin" label="权限值" />
        <el-table-column prop="操作" label="操作">
          <template #default>
            <el-button
              link
              type="primary"
              size="small"
              plain
              @click="dialogVisible1 = true"
              >添加菜单</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              plain
              @click="dialogVisible2 = true"
              >修改</el-button
            >
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog
        v-model="dialogVisible1"
        title="添加菜单"
        width="500"
        :before-close="handleClose1"
      >
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="菜单名称" prop="name1" :rules="rules">
            <el-input v-model="ruleForm.name1" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible1 = false">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
      <el-dialog
        v-model="dialogVisible2"
        title="修改功能"
        width="500"
        :before-close="handleClose1"
      >
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
          status-icon
        >
          <el-form-item label="功能名称" prop="name2" :rules="rules">
            <el-input v-model="ruleForm.name2" />
          </el-form-item>
          <el-form-item label="访问路径" prop="name2" :rules="rules">
            <el-input v-model="ruleForm.name2" />
          </el-form-item>
          <el-form-item label="访问权限值" prop="name2" :rules="rules">
            <el-input v-model="ruleForm.name2" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible2 = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible2 = false">
              确定
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from "vue";
  import { ElMessageBox } from "element-plus";
  import type { FormInstance, FormRules } from "element-plus";
  const dialogVisible1 = ref(false);
  const dialogVisible2 = ref(false);
  interface RuleForm {
    name1: string;
    name2:string;
    route:string;
    admin:string;
  }
  const rules = reactive<FormRules<RuleForm>>({
    name1: [
      { required: true, message: "e", trigger: "blur" },
      { min: 1, max: 10, message: "Length should be 1 to 10", trigger: "blur" },
    ],
    name2: [
      { required: true, message: "", trigger: "blur" },
      { min: 1, max: 10, message: "Length should be 1 to 10", trigger: "blur" },
    ],
    route: [
      { required: true, message: "", trigger: "blur" },
      { min: 1, max: 10, message: "Length should be 1 to 10", trigger: "blur" },
    ],
    admin: [
      { required: true, message: "", trigger: "blur" },
      { min: 1, max: 10, message: "Length should be 1 to 10", trigger: "blur" },
    ],
  });
  
  const ruleForm = reactive<RuleForm>({
    name1: "全部数据",
    name2: "",
    route:'',
    admin:''
  });
  
  const handleClose1 = (done: () => void) => {
    ElMessageBox.confirm("你确定关闭吗")
      .then(() => {
        done();
      })
      .catch(() => {
        // catch error
      });
  };
  interface User {
    id: number;
    name: string;
    route: string;
    admin: string;
    caozuo: string;
    hasChildren?: boolean;
    children?: User[];
  }
  
  const tableData: User[] = [
    {
      id: 1,
      name: "全部数据",
      route: "",
      admin: "",
      caozuo: "",
      children: [
        {
          id: 2,
          name: "轮播图操作",
          route: "",
          admin: "",
          caozuo: "",
          children: [
            {
              id: 3,
              name: "banner操作",
              route: "",
              admin: "",
              caozuo: "",
              children: [
                {
                  id: 4,
                  name: "删除banner",
                  route: "/educms/banneradmin/remove/{id}",
                  admin: "banner.remove",
                  caozuo: "",
                },
                {
                  id: 5,
                  name: "修改banner",
                  route: "/educms/banneradmin/updateBanner",
                  admin: "banner.update",
                  caozuo: "",
                },
                {
                  id: 6,
                  name: "获取banner",
                  route: "/educms/banneradmin/get/{id}",
                  admin: "banner.get",
                  caozuo: "",
                },
              ],
            },
          ],
        },
        {
          id: 7,
          name: "banner列表",
          route: "",
          admin: "",
          caozuo: "",
          children: [
            {
              id: 8,
              name: "banner列表",
              route: "/educms/banneradmin/pageBanner/{page}/{limit}",
              admin: "banner.list",
              caozuo: "",
            },
          ],
        },
        {
          id: 9,
          name: "统计分析",
          route: "",
          admin: "",
          caozuo: "",
          children: [
            {
              id: 10,
              name: "统计分析",
              route: "",
              admin: "",
              caozuo: "",
            },
          ],
        },
        {
          id: 11,
          name: "课程管理",
          route: "",
          admin: "",
          caozuo: "",
          children: [
            {
              id: 12,
              name: "课程管理",
              route: "",
              admin: "",
              caozuo: "",
            },
          ],
        },
      ],
    },
  ];
  </script>
  
  <style scoped></style>
  
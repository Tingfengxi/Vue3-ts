<template>
<div>
  <div
    class="flex flex-wrap gap-4 items-center"
    style="display: flex; line-height: 40px"
    id="selectsum"
  >
    <p>课程类别</p>
    <el-select v-model="value" placeholder="请选择" style="width: 180px;margin-left: 10px;" size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="value" placeholder="请选择" style="width: 180px" size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input v-model="input" style="width: 180px;margin-left: 10px;height: 40px;" placeholder="课程标题" size="large" />
    <el-select v-model="value" placeholder="请选择讲师" style="width: 180px;margin-left: 10px;" size="large">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-model="value"
      placeholder="请选择上架状态"
      style="width: 180px;margin:0px 10px;"
      size="large"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button type="primary" size="large"><el-icon><Search /></el-icon> 查询</el-button>
    <el-button  size="large">清空</el-button>
    </div>

    <!-- table表 -->
    <div>
    <el-table :data="tableData" border style="width: 100%">
    <el-table-column type="index" label="序号" width="60" />
    <el-table-column prop="classmessage" label="课程信息">
      <template #default="scope">
          <div>
            <div style="float: left;width: 100px;"><img :src="scope.row.img" alt="" style="width: 100px;height: 100px;"></div>
            <div>
              <div style="color:#409EFF;margin: 0px 20px;text-align: center;">{{ scope.row.classmessage }}</div>
              <div style="text-align: center;margin-top: 50px;">{{ scope.row.times }}</div>
            </div>
          </div>
        </template>
    </el-table-column>
    <el-table-column prop="date" label="创建时间" width="120" />
    <el-table-column prop="date2" label="创建时间" width="120" />
    <el-table-column prop="outclass" label="课程发布" width="120" >
      <template #default="scope">
          <el-button type="primary" v-if="scope.row.status === 1">上架</el-button>
          <el-button type="danger" v-else>下架</el-button>
        </template>
    </el-table-column>
    <el-table-column prop="price" label="价格" width="120" />
    <el-table-column prop="vip" label="付费学员" width="120" />
    <el-table-column label="操作" width="200">
      <template #default="scope">
          <el-button type="primary"text><el-icon><EditPen /></el-icon>编辑课程信息</el-button>
          <el-button type="primary" text><el-icon><EditPen /></el-icon>编辑课程大纲</el-button>
          <el-button type="primary" text @click="del"><el-icon><Delete /></el-icon>删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>
  
</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance } from 'element-plus';
import { ElMessage, ElMessageBox } from "element-plus";

const input = ref("");

const value = ref("");

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
];

const indexMethod = (index: number) => {
  return index * 2
}
const tableData = ref([
  {
    img: "https://img.yzcdn.cn/vant/cat.jpeg",
    classmessage: "XHTML CSS2 JS整站制作教程课程学习",
    times: "3课时",
    date: "2018-04-02",
    date2: "2018-04-02",
    status: 0,
    price: "￥1.00",
    vip: "3人"
  },
  {
    img: "https://img.yzcdn.cn/vant/cat.jpeg",
    classmessage: "XHTML CSS2 JS整站制作教程课程学习",
    times: "3课时",
    date: "2018-04-02",
    date2: "2018-04-02",
    status: 1,
    price: "￥1.00",
    vip: "3人"
  },
  {
    img: "https://img.yzcdn.cn/vant/cat.jpeg",
    classmessage: "XHTML CSS2 JS整站制作教程课程学习",
    times: "3课时",
    date: "2018-04-02",
    date2: "2018-04-02",
    status: 0,
    price: "￥1.00",
    vip: "3人"
  },
  {
    img: "https://img.yzcdn.cn/vant/cat.jpeg",
    classmessage: "XHTML CSS2 JS整站制作教程课程学习",
    times: "3课时",
    date: "2018-04-02",
    date2: "2018-04-02",
    status: 0,
    price: "￥1.00",
    vip: "3人"
  },
  {
    img: "https://img.yzcdn.cn/vant/cat.jpeg",
    classmessage: "XHTML CSS2 JS整站制作教程课程学习",
    times: "3课时",
    date: "2018-04-02",
    date2: "2018-04-02",
    status: 1,
    price: "￥1.00",
    vip: "3人"
  },
])

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

</style>

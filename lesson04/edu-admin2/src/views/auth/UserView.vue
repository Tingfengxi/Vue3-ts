<template>

<div class="user" >
    <div class="top" >
        <el-input  style="width: 240px;margin-right: 20px;" placeholder="用户名" size="large" />
        <el-input  style="width: 240px;margin-right: 20px;" placeholder="昵称" size="large" />
        <div class="block">
      <span style="margin-right: 20px;">注册时间</span>
      <el-date-picker
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        size="large"
        style="margin-right: 20px;"
      />
    </div>
    
    <el-button type="primary" size="large"><el-icon><Search /></el-icon> 查询</el-button>
    <el-button  size="large">清空</el-button>
     </div>
     <div style="margin-top: 30px;">
     <el-button type="danger"  style="margin-right: 5px;" @click="Btn">添加</el-button>
     <el-button type="danger" >批量删除</el-button>
    </div>

    <div class="mid">
        <el-table ref="multipleTableRef" :data="tableData" style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column property="index" label="序号" width="70" />
            <el-table-column property="name" label="用户名" width="80" />
            <el-table-column property="nicheng" label="用户昵称" width="80" />
            <el-table-column property="logindate" label="最近登录时间" width="160">
                <template #default="scope">{{ scope.row.logindate }}</template>
            </el-table-column>

            <el-table-column property="status" label="用户状态" width="80">
                <template #default="scope"><el-tag type="success">{{ scope.row.status }}</el-tag></template>
            </el-table-column>

            <el-table-column property="nicheng2" label="用户昵称" width="80" />

            <el-table-column property="createdate" label="创建时间" width="160">
                <template #default="scope">{{ scope.row.createdate }}</template>
            </el-table-column>

            <el-table-column property="update" label="更新时间" width="160">
                <template #default="scope">{{ scope.row.update }}</template>
            </el-table-column>

            <el-table-column property="creater" label="创建人" width="80" />
            <el-table-column property="fixer" label="修改人" width="80" />

            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="roleEdit(scope.$index, scope.row)">分配角色</el-button>
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    
    <div class="page">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[10]" :small="small" :disabled="disabled" :background="true"
                layout="total, sizes, prev, pager, next, jumper" :total="3" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />页
        </div>
</div>

</template>

<script setup lang='ts'>
import router from '@/router';
import { ref , reactive } from 'vue'

interface User {
    index: number
    name: string
    nicheng: string
    nicheng2: string
    logindate: string
    status: string
    createdate: string
    update: string
    creater: string
    fixer: string
}
const tableData: User[] = [
    {
        index: 1,
        name: 'admin',
        nicheng: '小林',
        nicheng2: '小林',
        logindate: '2023-06-28 14:44:51',
        status: '正常',
        createdate: '2023-06-20 02:32:16',
        update: '2023-09-18 00:00:00',
        creater: '无',
        fixer: '无',
    },
    {
        index: 2,
        name: 'test',
        nicheng: '测试',
        nicheng2: '测试',
        logindate: '2023-06-28 14:44:51',
        status: '正常',
        createdate: '2023-06-20 02:32:16',
        update: '2023-09-18 00:00:00',
        creater: 'admin',
        fixer: '无',
    },
    {
        index: 3,
        name: '666',
        nicheng: '666',
        nicheng2: '666',
        logindate: '2023-06-28 14:44:51',
        status: '正常',
        createdate: '2023-06-20 02:32:16',
        update: '2023-09-18 00:00:00',
        creater: 'test',
        fixer: '无',
    },

]

function Btn() {
  router.push('/userAdd')
}
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val
}
const multipleSelection = ref<User[]>([])

const roleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleEdit = (index: number, row: User) => {
    console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
    console.log(index, row)
}

const currentPage4 = ref(4)
const pageSize4 = ref(10)
const small = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

</script>
<style lang='less' scoped>
.user{
    .top{
        display: flex;
    }
    .page{
        margin-top: 2px;
        display: flex;
    }
}
</style>
<template>

<div class="role">
    <div class="top" >
        <el-input  style="width: 240px;margin-right: 20px;" placeholder="用户名" size="large" />
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
            <el-table-column property="name" label="角色名称" width="80" />
            <el-table-column property="nicheng" label="角色code" width="100" />


            <el-table-column property="status" label="角色描述" width="130px">
                <template #default="scope">{{ scope.row.roledescription }}</template>
            </el-table-column>

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
                    <el-button type="primary" size="small" @click="roleEdit(scope.$index, scope.row)">授权</el-button>
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="page">
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[10]" :small="small" :disabled="disabled" :background="true"
                layout="total, sizes, prev, pager, next, jumper" :total="2" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />页
        </div>
    </div>



</div>

</template>

<script setup lang='ts'>
import { ref , reactive } from 'vue'
import router from '@/router';
interface User {
    index: number
    name: string
    nicheng: string
    roledescription:string
    createdate: string
    update: string
    creater: string
    fixer: string
}
const tableData: User[] = [
    {
        index: 1,
        name: '管理员',
        nicheng: 'admin',
        roledescription:'管理员.拥有所有权限',
        createdate: '2023-06-20 02:32:16',
        update: '2023-09-18 00:00:00',
        creater: '无',
        fixer: '无',
    },
    {
        index: 2,
        name: '普通用户',
        nicheng: 'user',
        roledescription:'普通用户.拥有部分权限',
        createdate: '2023-06-20 02:32:16',
        update: '2023-09-18 00:00:00',
        creater: '无',
        fixer: '无',
    },
    

]

function Btn() {
  router.push('/roleAdd')
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

const currentPage4 = ref(1)
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

.role{
    .top{
        display: flex;
    }
    .page{
        display: flex;
        margin-top: 5px;
    }
}
</style>
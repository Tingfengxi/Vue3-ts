<template>
    <div class="ClassAdd2">
        <!-- 进度条 -->
        <el-steps :active="2" align-center>
            <el-step description="填写课程基本信息" />
            <el-step description="创建课程大纲" />
            <el-step description="最终发布" />
        </el-steps>
        <el-button type="primary" text link @click="dialogFormVisible = true">添加章节</el-button>
        <el-dialog v-model="dialogFormVisible" title="添加章节">
            <el-form :model="form">
                <el-form-item label="章节标题" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="章节排序" :label-width="formLabelWidth">
                    <el-input-number v-model="num" :min="0" @change="handleChange" />
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
        <!-- 章节 -->
        <!-- 树形控件 -->
        <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps" default-expand-all
            :filter-node-method="filterNode" :expand-on-click-node="false">
            <template #default="{ node, data }">
                <span class="custom-tree-node">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="primary" text v-if="data.children" link
                            @click="dialogFormVisible2 = true">添加小节</el-button>
                        <el-button type="text" style="color: #999;margin-left:20px">编辑</el-button>
                        <el-button type="text" style="color: #F56C6C;margin: 0 20px">删除</el-button>
                    </span>
                </span>
            </template>
        </el-tree>

        <!-- 添加小节弹窗 -->
        <el-dialog v-model="dialogFormVisible2" title="添加小节">
            <el-form :model="form2">
                <el-form-item label="课时标题" :label-width="formLabelWidth2">
                    <el-input v-model="form2.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="课时排序" :label-width="formLabelWidth2">
                    <el-input-number v-model="num2" :min="0" @change="handleChange2" />
                </el-form-item>
                <el-form-item label="是否免费" :label-width="formLabelWidth2">
                    <el-radio-group v-model="radio1" class="ml-4">
                        <el-radio value="1" size="large">免费</el-radio>
                        <el-radio value="2" size="large">默认</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上传视频" :label-width="formLabelWidth2">
                    <div style="display: flex;">
                        <el-upload v-model:file-list="fileList" class="upload-demo"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" multiple
                            :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3"
                            :on-exceed="handleExceed">
                            <el-button type="primary">上传视频</el-button>
                        </el-upload>
                    </div>
                    <div style="flex: 1;">
                        <span>最大支持1G,<br />
                            支持3GP、ASF、AVI、DAT、DV、FLV、F4V、SIF、M2T、M4V、MJ2、MIPEG、MKV、MOV、MP4.MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB.SWF、TS、VOB、WMV、WEBM
                            等视频格式上传</span>
                    </div>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible2 = false">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 上\下一步 -->
        <div class="btn">
            <el-button type="default" @click="upBtn">上一步</el-button>
            <el-button type="primary" @click="nextBtn">下一步</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch, reactive } from 'vue'
import { ElTree, ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, UploadUserFile } from 'element-plus'

//添加章节
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
const num = ref(0)
const handleChange = (value: number) => {
    console.log(value)
}
//章节
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
        label: "第一章",
        children: [
            {
                id: 2,
                label: "1-1",
            },
            {
                id: 3,
                label: "1-1",
            },
            {
                id: 4,
                label: "1-1",
            },
        ],
    },
    {
        id: 5,
        label: "第二章",
        children: [
            {
                id: 6,
                label: "2-1",
            },
            {
                id: 7,
                label: "2-2",
            },
        ],
    },

]);
//添加小节
const dialogFormVisible2 = ref(false)
const formLabelWidth2 = '140px'
const form2 = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
const num2 = ref(0)
const handleChange2 = (value: number) => {
    console.log(value)
}
//单选钮
const radio1 = ref('1')

//上传视频
const fileList = ref<UploadUserFile[]>([

])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
    console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
    console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
    ElMessage.warning(
        `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
        } totally`
    )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
    return ElMessageBox.confirm(
        `Cancel the transfer of ${uploadFile.name} ?`
    ).then(
        () => true,
        () => false
    )
}

//上一步按钮
const router = useRouter()
const upBtn = () => {
    router.push('/classadd')
}
//下一步按钮
const nextBtn = () => {
    router.push('/classadd3')
}
</script>

<style lang="less" scoped>
.ClassAdd2 {
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
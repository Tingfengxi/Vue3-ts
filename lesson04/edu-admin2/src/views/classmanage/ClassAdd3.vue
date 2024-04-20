<template>
    <div class="ClassAdd3">
        <!-- 进度条 -->
        <el-steps :active="3" align-center>
            <el-step description="填写课程基本信息" />
            <el-step description="创建课程大纲" />
            <el-step description="最终发布" />
        </el-steps>

        <!-- 主体 -->
        <div class="main">
            <div>
                <div class="imges">
                    <img src="../../assets/img/vue3.png" alt="" style="width: 400px;height: 270px;" />
                </div>
                <div class="message">
                    <h3>完善版课程</h3>
                    <p>共64课时</p>
                    <p>所需分类: 后端开发——Python</p>
                    <p>课程讲师:测试6</p>
                    <div class="price">￥1.00</div>
                </div>
            </div>
        </div>
        <!-- 上\下一步 -->
        <div class="btn">
            <el-button type="default" @click="upBtn">返回修改</el-button>
            <el-button type="primary" @click="nextBtn">发布课程</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

//上一步按钮
const router = useRouter()
const upBtn = () => {
    router.push('/classadd2')
}
//下一步按钮
const nextBtn = () => {
    ElMessage.success('发布成功')
    // router.push('/classadd3')
}
</script>

<style lang="less" scoped>
.ClassAdd3 {
    .main{
        width: 100%;
        height: 300px;
        background-color: #eee;
        padding: 15px 15px;
        .imges{
            width: 400px;
            height: 270px;
            background-color: #ccc;
            float: left;
            margin-right: 20px
        }
        .message{
            h3{
                padding-bottom: 20px;
            }
            p{
                padding-bottom: 10px;
            }
            .price{
                margin-top: 90px;
                color: #d61717;
                font-size: 20px;
            }
        }
    }
    .btn{
        margin-top: 20px;
    }
}
</style>
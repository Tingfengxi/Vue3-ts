<template>
  <div class="home">
    <el-row :gutter="20"> 
      <el-col :span="8">
          <div class="user-card">
           
            <div class="user-top">
                <el-avatar :size="100" shape="square" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                  <div class="user-right">
                    <h3>张三</h3>
                    <el-tag type="primary" size="large">管理员</el-tag>
                    <el-tag type="success" size="large">普通用户</el-tag>
                  </div>
              </div>
             
            <p>上次登录时间：2024/4/11 13:40:11</p>

          </div>

      </el-col>
      <el-col :span="16">
        <el-row :gutter="20">
          <el-col :span="4" v-for="item in dataList " :key="item.id" >
            <div class="data-card">
              <div class="data-top" :style="{background:item.bgColor}">
                
                <!-- 调用公共图标组件 -->
                <MenuIcon :name="item.icon" size="40" color="#fff" />
                <span>{{ item.num }}</span>
              </div>
              <p>{{ item.title }}</p>
            </div>
          </el-col>
        </el-row>
        
      </el-col>
    </el-row>
    <br/>
     <el-row :gutter="20">
      <el-col :span="8">
        <el-card >
          <template #header>
            <div class="card-header">
              <span>上架课程讲师占比详情（仅展示前8）</span>
            </div>
          </template>
         <!-- 进度条组件列表 -->
            <div v-for="item in progressList" :key="item.id">
              <h6>{{ item.name }}</h6>
            
         <el-progress :percentage="item.progress" :indeterminate="true" :color="item.color" />
        </div>
        </el-card>
    
      </el-col>
      <el-col :span="16">
        <el-card >
          <template #header>
            <div class="card-header">
              <span>最近上架课程（仅展示前5）</span>
            </div>
          </template>
         <!-- 表格组件 -->
         <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="课程名称"  />
          <el-table-column prop="date" label="上架时间"  />
        </el-table>
        </el-card>

      </el-col>
     </el-row>


  </div>
</template>

<script setup lang="ts">
import { ITEM_RENDER_EVT } from 'element-plus/es/components/virtual-list/src/defaults.mjs';
import {ref} from 'vue';
import MenuIcon from '@/components/MenuIcon.vue';

// 定义数据统计卡片的数据

const dataList =ref<Array<any>>([

  {
    id:1,
    title:"用户数",
    icon:'User',
    num:26,
    bgColor:'#409EFF'
  },
  {
    id:2,
    title:"讲师数",
    icon:'Avatar',
    num:19,
    bgColor:'#67C23A'
  },
  {
    id:3,
    title:"文章总数",
    icon:'Reading',
    num:20,
    bgColor:'#409EFF'
  },
  {
    id:4,
    title:"上架课程数",
    icon:'Sell',
    num:18,
    bgColor:'#67C23A'
  },
  {
    id:5,
    title:"已售的课程数",
    icon:'SoldOut',
    num:2,
    bgColor:'#409EFF'
  },
  {
    id:6,
    title:"成交金额",
    icon:'Wallet',
    num:2,
    bgColor:'#F56C6C'
  }
])


// 定义进度条数据列表
const progressList=ref<Array<any>>([
{
  id:1,
  name:'张三',
  progress:50,
  color:"#67CE3C"
},
{
  id:2,
  name:'李四',
  progress:12,
  color:"#E6A23C"
},
{
  id:3,
  name:'王五',
  progress:76,
  color:"#F56C6C"
},
{
  id:4,
  name:'666',
  progress:32,
  color:"#67CE3C"
},
{
  id:5,
  name:'张三',
  progress:22,
  color:"#67CE3C"
},
{
  id:6,
  name:'张三',
  progress:78,
  color:"#409EFF"
},
{
  id:7,
  name:'张三',
  progress:45,
  color:"#67CE3C"
},
{
  id:8,
  name:'张三',
  progress:33,
  color:"#909399"
}





])


const tableData =ref<Array<any>> ([
  {
    name:'python全栈开发',
    date:'2023.09.06 11:00:00'
  },
  {
    name:'python全栈开发',
    date:'2023.09.06 11:00:00'
  },
  {
    name:'python全栈开发',
    date:'2023.09.06 11:00:00'
  },
  {
    name:'python全栈开发',
    date:'2023.09.06 11:00:00'
  },
  {
    name:'python全栈开发',
    date:'2023.09.06 11:00:00'
  }
])





</script>

<style lang='less' scoped>

.home{
  .user-card{
    height: 260px;
    border: 1px solid #f3f3f3;
    border-radius: 8px;
    box-shadow: 0 0 5px #ccc;
    padding: 30px;
    .user-top{
      display: flex;
      border-bottom: 1px solid #f3f3f3;
      padding-bottom: 30px;
      margin-bottom: 30px;
      .el-avatar{
        margin-right: 40px;
      }
      h3{
        font-size: 30px;
        color: pink;
      }
      .el-tag{
        margin-right: 15px;
      }
    }
  }
  .data-card{
      height: 240px;
      border: 1px solid #f3f3f3;
      border-radius: 8px;
      box-shadow: 0 0 5px #ccc;
      .data-top{
        height: 180px;
        background-color: aqua;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        span{
          font-size: 25px;
          color: white;
        }
      }
      p{
        text-align: center;
        margin-top: 20px;
      }
    }
    .el-card{
      height: 370px;
    }
  }

</style>
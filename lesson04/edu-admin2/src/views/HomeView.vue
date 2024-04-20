<template>
  <div class="home">
    <div class="top">
     <div class="top-left">
       <div class="top-1" style="display: flex;">
        <el-icon size="55px"><User /></el-icon>
        <div style="color: red; margin-left: 55px ;margin-top: 42px;">
         <h2 style="font-size: 30px;">测试</h2>
         <el-button style="background-color: #eefaf0;">管理员</el-button>
         <el-button style="background-color: #eefaf0;">普通用户</el-button>
        </div>
       </div>
       
       <div class="top-2">
        上次登录时间：2023-09-04 22:08:42
       </div>


     </div>
     <div class="top-right">
      <ul>
        <li style="background-color: #2c8cf0; color: white;"><el-icon size="70px"><User /></el-icon> <br> <span>20</span> <p>用户数量</p></li> 
        <li style="background-color: #65d573; color: white;"><el-icon size="70px"><UserFilled /></el-icon>  <br> <span>19</span> <p>讲师数</p></li>
        <li style="background-color: #2c8cf0; color: white;"><el-icon size="70px"><Reading /></el-icon><br> <span>20</span>  <p>文章总数</p></li>
        <li style="background-color: #65d573; color: white;"><el-icon size="70px"><Sell /></el-icon> <br> <span>18</span> <p>上架课程数</p></li>
        <li style="background-color: #2c8cf0; color: white;"><el-icon size="70px"><SoldOut /></el-icon> <br> <span style="margin-left: 52px">2</span> <p>已售的课程数</p></li>
        <li style="background-color: red; color: white;"><el-icon size="70px"><Wallet /></el-icon> <br> <span style="margin-left: 38px">0.02</span> <p>成交金额</p></li>
      </ul>
      <ul>

      </ul>


    </div>
  </div>



  <div class="bottom">
    <div class="bottom-left">
      <h3>上架课程讲师的课程情况（仅展示前8）</h3>
      <div class="demo-progress">
        <p>李刚</p>
    <el-progress :percentage="52" :color="customColors" />
       <p>王五</p>
    <el-progress :percentage="14"  :color="customColors"/>
    <p>李四</p>
    <el-progress :percentage="14"  :color="customColors"/>
    <p>王二</p>
    <el-progress :percentage="14" :color="customColors"/>
    <p>test</p>
    <el-progress :percentage="4" :color="customColors" />

  </div>

    </div>



    <div class="bottom-right">
      <h3>最近上架课程（仅展示前5）</h3>
      <el-table :data="tableData" style="width: 95%" :row-style="{height:'60px'}" > 
    <el-table-column prop="date" label="课程名" width="300px" />
    <el-table-column prop="time" label="上架时间" />
  </el-table>
    </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
const tableData = [
  {
    date: '353',
    time: '2023-06-07 15:36:32',
  },
  {
    date: '23',
    time: '2023-06-07 13:43:32',
  },
  {
    date: '33',
    time: '2023-06-23 12:22:19',
  },
  {
    date: '测试删除多个视频',
    time: '2023-05-23 15:36:32',
  },
  {
    date: '222222',
    time: '2023-06-07 15:36:32',
  },
]

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#db8713', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

</script>

<style lang="less" scoped>
.home{
  .top{
    margin: 20px auto;
    width: 1400px;
    height: 300px;
    display: flex;
    .top-left{
    width: 500px;
    height: 300px;
    border: 1px solid #f5f5f5;
    box-shadow: 0 0 5px #CCC;
    .top-1{
      height: 180px;
      width:400px ;
      border-bottom: 1px solid #ccc;
      margin-left: 20px;
      .el-icon{
        margin-top: 50px;
        margin-left: 40px;
      }
    }
    .top-2{
      margin-left: 20px;
      margin-top: 10px;
      height: 70px;
      width:400px ;
    }
    }
    .top-right{
      margin-left: 30px;
    width: 850px;
    height: 300px;
    ul{
      display: flex;
      li{
        height: 270px;
        width: 130px;
        margin-right: 15px;
        background-color: aquamarine;
        list-style: none;
        .el-icon{
          margin-top: 70px ;
          margin-left:27px ;
        }
        span{
          margin-left: 44px;
          font-size: 30px;
        }
        p{
          color: black;
          width: 130px;
          height: 50px;
          border: 1px solid #f5f5f5;
          background-color: white;
          margin-top: 27px;
          text-align: center;
          line-height: 50px;
        }
      }
    }
    }
  }
  .bottom{
    margin: 20px auto;
    width: 1400px;
    height: 420px;
    display: flex;
    .bottom-left{
      height: 420px;
      width: 500px;
      border: 1px solid #CCC;
      h3{
      margin-left: 15px;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 15px;
      
    }
    .demo-progress{
      margin-top: 10px;
      margin-left: 20px;
    }
    }
    .bottom-right{
      height: 420px;
      margin-left: 30px;
    width: 850px;
    border: 1px solid #f5f5f5;
    box-shadow: 0 0 5px #CCC;
    h3{
      margin-left: 15px;
      border-bottom: 1px solid #f5f5f5;
      padding-bottom: 15px;
    }
    .el-table{
      margin-top: 25px;
      margin-left: 15px;
      
    }

    }
  }
}

</style>
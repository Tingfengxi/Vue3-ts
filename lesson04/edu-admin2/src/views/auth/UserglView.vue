<template>

<div class="gl">
    <el-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
    >全选</el-checkbox
  >
  <el-checkbox-group
    v-model="checkedCities"
    @change="handleCheckedCitiesChange"
  >
    <el-checkbox
      v-for="city in cities"
      :key="city"
      :label="city"
      :value="city"
      >{{ city }}</el-checkbox
    >
  </el-checkbox-group>
  <el-button type="primary">保存</el-button>
</div>

</template>

<script setup lang='ts'>
import { ref , reactive } from 'vue'


const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCities = ref([''])
const cities = ['管理员', '普通用户']

const handleCheckAllChange = (val: boolean) => {
  checkedCities.value = val ? cities : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cities.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length
}

</script>
<style lang='less' scoped>
.gl{
    .el-button{
        margin-top: 30px;
    }
}
</style>
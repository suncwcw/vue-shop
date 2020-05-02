<template>
  <div>
  <div class="show-right">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">HomePage</el-breadcrumb-item>
      <el-breadcrumb-item>Manage</el-breadcrumb-item>
      <el-breadcrumb-item>rightsList</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
     <el-table
    :data="rightsList"
    style="width: 100%">
    <el-table-column type="index">
    </el-table-column>
    
      <el-table-column
        prop="authName"
        label="authName"
        width="120">
      </el-table-column>
  
        <el-table-column
          prop="id"
          label="id"
          width="120">
        </el-table-column>
        <el-table-column
          prop="level"
          label="level"
          width="120">
        </el-table-column>
        <el-table-column
          prop="path"
          label="path"
          width="300">
        </el-table-column>
        <el-table-column
          prop="pid"
          label="pid"
          width="120">
        </el-table-column>
  </el-table>
  
  </div>
</template>

<script>
export default {

  data(){
    return {
      rightsList: []
    }
  },
  created() {
    this.showRightsList()
  },
  methods: {
    showRightsList() {
      this.$http.get('/rights/list').then(res => {
        // console.log(res.data.data)
        this.rightsList = res.data.data
        // console.log(res.data.data)
      })
    },
  }
  
}
</script>

<style lang="less" scoped>
</style>
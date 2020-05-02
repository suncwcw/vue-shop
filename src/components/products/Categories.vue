<template>
  <div>
    <!--1 miao boaxie -->
    <div class="show-roles">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">
          CategoryPage
        </el-breadcrumb-item>
        <el-breadcrumb-item>Manage</el-breadcrumb-item>
        <el-breadcrumb-item>Categories</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2list -->
    <el-card class="box-card">
      <!-- 2-1 button-->
      <el-row>
        <el-col> <el-button type="primary">add category</el-button></el-col>
      </el-row>
      <!-- 2-2 button-->

      <el-table :data="userList" stripe style="width: 98% ">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="username"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
        <el-table-column prop="role_name" label="role_name"></el-table-column>
        <el-table-column prop="mg_state" label="mg_state"></el-table-column>
      </el-table>
    </el-card>
    <!--3 page -->
  </div></template
>

<script>
export default {
  data() {
    return {
      querInfo2: {
        pageNum: '1',
        pageSize: '2',
        type: '3'
      },
      queryInfo: {
        query: '',
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      catelist: []
    }
  },
  created() {
    this.getCategoryList()
  },
  // methods 复数
  methods: {
    getCategoryList() {
      this.$http.get('categories', { params: this.queryInfo }).then(res => {
        console.log(res.data.data)
        const cateList = res.data.data
        return cateList
      })
    }
  }
}
</script>

<style lang="less" scoped></style>

<template>
  <div class="show-user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{path:'/home'}">HomePage</el-breadcrumb-item>
      <el-breadcrumb-item>Manage</el-breadcrumb-item>
      <el-breadcrumb-item>UserList</el-breadcrumb-item>
    </el-breadcrumb>
    <div></div>
    <el-card class="box-card">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input placeholder="please input">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button>add users</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-table :data="userList" stripe style="width: 98% ">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="username" label="username"></el-table-column>
      <el-table-column prop="email" label="email"></el-table-column>
      <el-table-column prop="role_name" label="role_name"></el-table-column>
      <el-table-column prop="mg_state" label="mg_state">
        <!-- scopez作用域插槽一行的数据 双向绑定 -->
        <template slot-scope="scope">
          <!-- {{scope.row.mg_state}} -->
          <el-switch v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="manage" label="manage" width="180">
        <template>
          <el-button type="success" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <el-tooltip content="setting" placement="top" size="mini">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-tooltip>
          <!-- {{scope.row.mg_state}} -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    getUserList() {
      this.$http.get('users', { params: this.queryInfo }).then(res => {
        console.log(res.data.data)
        this.userList = res.data.data.users
        this.total = res.data.data.total
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-table {
  background-color: wheat !important;
  //   font-family: 'Kaushan Script', cursive;
  margin: 10px;
  border-radius: 10px;
  font-size: bold;
  color: #bbb !important;
}
.show-user .el-breadcrumb-item {
  margin: 20px;
  border-radius: 10px;
  color: white !important;
}

.el-breadcrumb__item {
  font-family: 'Kaushan Script', cursive;
  color: white !important;
  margin-top: 30px;
}
.el-breadcrumb {
  margin-top: 10px;
  margin-left: 20px;
}
.box-card {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
}
.show-user {
  box-shadow: 0 0 40px 10px #c1336b !important;
  border-radius: 10px;
  height: 400px;
}
</style>
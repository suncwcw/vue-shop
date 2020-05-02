<template>
  <div>
    <div class="show-roles">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }"
          >HomePage</el-breadcrumb-item
        >
        <el-breadcrumb-item>Manage</el-breadcrumb-item>
        <el-breadcrumb-item>rolesright</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="rolesList" style="width: 100%">
      <!--expand lie---->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!--  level 1 authority-->
          <el-row v-for="item1 in scope.row.children" :key="item1.id">
            <el-col :span="5">
              <el-tag>{{ item1.authName }}</el-tag>
            </el-col>
            <!--  level 2 authority-->
            <el-col :span="19">
              <el-row v-for="item2 in item1.children" :key="item2.id">
                <el-col :span="8">
                  <el-tag>{{ item2.authName }}</el-tag>
                </el-col>
                <!--  level 3 authority-->

                <el-col :span="11">
                  <el-tag
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    >{{ item3.authName }}</el-tag
                  >
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>

        <!--  <template slot-scope="scope">{{ scope.row }}</template>---->
      </el-table-column>
      <!--index lie---->
      <el-table-column type="index"> </el-table-column>

      <el-table-column prop="roleDesc" label="roleDesc" width="120">
      </el-table-column>

      <el-table-column prop="id" label="id" width="120"> </el-table-column>
      <el-table-column prop="roleName" label="roleName" width="300">
      </el-table-column>
      <el-table-column label="manage">
        <template slot-scope="scope">
          <!-- 1 button------------------------------------------------------------ -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showEditDialog(scope.row.id)"
          ></el-button>
          <!--2 delete button------------------------------------------------------------ -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="removeUserById(scope.row.id)"
          ></el-button>

          <!-- 3setting button------------------------------------------------------------ -->
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="manageUserById(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- edit dialog---------------------:rules="editFormRules"-----id: '', rid: '', username: '', mobile: '', email: ''-----------------------ref表单引用----------------- -->
    <el-dialog
      title="提示"
      :visible.sync="editDialogVisible"
      width="70%"
      @close="firstDialogClosed"
    >
      <el-form :model="rolesList" ref="rolesListRef" width="170px">
        <el-form-item label="roleName">
          <el-input v-model="rolesList.roleName" disabled></el-input>
        </el-form-item>
        <el-form-item label="id">
          <el-input v-model="rolesList.id"></el-input>
        </el-form-item>
        <el-form-item label="roleDesc">
          <el-input v-model="rolesList.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      editDialogClosed: false,
      editDialogVisible: false
    }
  },
  created() {
    this.showrolesList()
  },
  methods: {
    showrolesList() {
      this.$http.get('/roles').then(res => {
        // console.log(res.data.data)
        this.rolesList = res.data.data
        // console.log(res.data.data)
      })
    },
    showEditDialog(id) {
      this.$http.get('roles/' + id).then(res => {
        if (res.data.meta.status !== 201) {
          this.$message.error('failed')
        }
        this.$message.success('success')
        this.rolesList = res.data.data
        // console.log(res.data.data)
      })

      this.editDialogVisible = true
    },
    // close dialog
    firstDialogClosed() {
      this.$refs.rolesListRef.resetFields()

      // this.getUserList()
    },
    editRoleInfo() {
      this.$refs.rolesListRef.validate(valid => {
        if (!valid) {
          return
        }
        this.$http
          .put('roles/' + this.rolesList.id, {
            roleName: this.rolesList.roleName,
            roleDesc: this.rolesList.roleDesc
          })
          .then(res => {
            if (res.data.meta.status != 200) {
              return this.$message.error('failed')
              this.editDialogVisible = false
            }
            // close dialog
            this.editDialogVisible = false
            // update data
            this.showrolesList()
            // tip success
            this.$message.success('success')
          })
      })
    }
  }
}
</script>

<style lang="less" scoped></style>

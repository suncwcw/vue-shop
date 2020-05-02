<template>
<div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">HomePage</el-breadcrumb-item>
        <el-breadcrumb-item>Manage</el-breadcrumb-item>
        <el-breadcrumb-item>UserList</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
<el-table :data="userList"> 
<el-table-column prop="id" label="id">
<template slot-scope="scope">
<el-button @click="clickbuttonfuction(scope.row.id)">
</el-button>
</template >
</el-table-column >
<el-table :data="userList">
<el-table-column prop="id" label="id">
<template slot-scope="scope">
<el-button type = success @click="functionname(scope.row.id)">
</el-button>
</template>
</el-table-column>
</el-table>
</el-table>
<el-table :data="userList">
<el-table-column prop="id" label="id">
<template slot-scope="scope">
<el-button  @click="functionss(scope.row.id)"></templdate>
<el-table :data="userList" >
<el-table-column prop="id" label="id"></el-table-column>
<template slot-scope="scope">
   <el-button @click="thisfuncition(scope.row.id)" ></el-button>
</template>
        <el-table :data="userList" stripe style="width: 98% ">
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="id" label="id"></el-table-column>
            <el-table-column prop="username" label="username"></el-table-column>
            <el-table-column prop="email" label="email"></el-table-column>
            <el-table-column prop="role_name" label="role_name"></el-table-column>
            <el-table-column prop="mg_state" label="mg_state">
                <!-- scopez作用域插槽一行的数据 双向绑定 -->
                 <el-switch :model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
  
            </el-table-column>

            <el-table-column prop ="shuxing" label="shuxing">
            <template slot-scope="scope">
                <el-button type="success" @click="showEditDialog(scope.row.id)"></el-button>
            </template>
            </el-table-column >
        
            

            <el-table-column prop="manage" label="manage" width="180">
                <template slot-scope="scope">
                    <!-- edit button------------------------------------------------------------ -->
                    <el-button type="success" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                    <!-- delete button------------------------------------------------------------ -->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
                    <!-- delete button------------------------------------------------------------ -->
                   
                   
                    <el-tooltip content="setting" placement="top" size="mini">
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    </el-tooltip>
                    <!-- {{scope.row.mg_state}} -->
                </template>
            </el-table-column>
        </el-table>

        <el-form :model="addForm" rules="addFormRules" ref="addFormRef">

        <el-form-item prop ="username" label="username">
        <el-input v-model ="addForm.username"></el-input>
        </el-form-item>
        </el-form>
    </el-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            userList: [],
            total: 0,
            queryInfo: {
                //    search params
                query: '',
                pagenum: 1,
                pagesize: 2,
            
            },
            userList:[],

            queryInfo:{
                query:'',
                pagenum:1,
                pagesize:2,
            }

        }
    },
    created() {
        this.getUserList()
    },
    methods: {

        getUserList(){}
        getUserList() {
            this.$http.get('sers', {
                params: this.queryInfo
            }).then(res => {
                this.userList = res.data.data.users
                this.total = res.data.data.total
            })
        },
        showEditDialog(id) {

        },
        removeUserById(id) {
            this.$http.delete('users/' + id).then(res => {
                this.getUserList()
                return this.$message.success('delete')
            })
        },
        DeleteById(id) {
            this.$http.delete('users/'+id).then(res => {
               this.getUserList()
               return this.$message.success('delete')
            })
        }

    },

}
</script>

<style lang="less" scoped></style>

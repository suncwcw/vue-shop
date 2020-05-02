<template>
<div class="show-user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">HomePage</el-breadcrumb-item>
        <el-breadcrumb-item>Manage</el-breadcrumb-item>
        <el-breadcrumb-item>UserList</el-breadcrumb-item>
    </el-breadcrumb>
    <div></div>
    <el-card class="box-card">
        <el-row :gutter="10">
            <el-col :span="8">
                <!-- search input --------------------------------------------------------->
                <el-input placeholder="please input" v-model="queryInfo.query" clearable @clear="getUserList">
                    <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-button @click="addDialogVisible = true">add users</el-button>
            </el-col>
            <el-dialog :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
                <!-- 表单添加  prop指定校验规则在 rules 里面写了 -->
                <el-form :model="addForm" status-icon :rules="addFormRules" ref="addFormRef" label-width="70px">
                    <!-- prop验证规则属性 -->
                    <el-form-item label="user" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="pass" prop="password">
                        <el-input v-model="addForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="email" prop="email">
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="mobile" prop="mobile">
                        <el-input v-model="addForm.mobile"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">cancel</el-button>
                    <el-button type="primary" @click="addUser">sure</el-button>
                </span>
            </el-dialog>
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
                <el-switch :model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
            </template>
        </el-table-column>
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    <!-- edit dialog---------------------:rules="editFormRules"-----id: '', rid: '', username: '', mobile: '', email: ''-----------------------ref表单引用----------------- -->
    <el-dialog title="提示" :visible.sync="editDialogVisible" width="70%" @close="editDialogClosed">
        <el-form :model="editForm" ref="editFormRef" :rules="editFormRules" width="170px">
            <el-form-item label="username">
                <el-input v-model="editForm.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="rid">
                <el-input v-model="editForm.rid"></el-input>
            </el-form-item>
            <el-form-item label="mobile">
                <el-input v-model="editForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="email">
                <el-input v-model="editForm.email"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
    </el-dialog>
    
</div>
</template>
<script>
export default {
    // mydata
    data() {
        //   自定义规则
        var checkEmail = (rules, value, cb) => {
                const regemail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
                if (regemail.test(value) == true) {
                    return cb()
                }
                cb(new Error('input correct email'))
            },
            checkMobile = (rules, value, cb) => {
                const regemobile = /^1(3|4|5|6|7|8|9)\d{9}$/
                if (regemobile.test(value) == true) {
                    return cb()
                }
                cb(new Error('input correct mobile'))
            }
        return {
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 2
            },
            userList: [],
            total: 0,
            addDialogVisible: false,
            editDialogVisible: false,
            deleteDialogVisible: false,
            //   添加用户的表单数据ialog
            addForm: {
                username: '',
                passwrod: '',
                email: '',
                mobile: ''
            },
            deleteForm: {
                username: '',
                passwrod: '',
                email: '',
                mobile: ''
            },
            // edit  id: 579, rid: 82, username: "田淑华", mobile: "18837688767", email: "1987644633@qq.com"}
            editForm: {
                id: '',
                rid: '',
                username: '',
                mobile: '',
                email: ''
            },
            //   添加表单验证规则
            addFormRules: {
                username: [{
                        required: true,
                        message: 'input username',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: '用户名3到10之间',
                        trigger: 'blur'
                    }
                ],
                passwrod: [{
                        required: true,
                        message: 'input password',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: 'password3到10之间',
                        trigger: 'blur'
                    }
                ],
                email: [{
                        required: true,
                        message: 'input email ',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: 'email 3到10之间',
                        trigger: 'blur'
                    },
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    }
                ],
                mobile: [{
                        required: true,
                        message: 'input mobile ',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: 'mobile 3到10之间',
                        trigger: 'blur'
                    },
                    {
                        validator: checkMobile,
                        trigger: 'blur'
                    }
                ]
            },
            editFormRules: {
                email: [{
                        required: true,
                        message: 'input email ',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 10,
                        message: 'email 3到10之间',
                        trigger: 'blur'
                    },
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    }
                ],
                mobile: [{
                        required: true,
                        message: 'input mobile ',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: 'mobile 3到10之间',
                        trigger: 'blur'
                    },
                    {
                        validator: checkMobile,
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
        getUserList() {
            this.$http.get('users', {
                params: this.queryInfo
            }).then(res => {
                // console.log(res.data.data)
                this.userList = res.data.data.users
                this.total = res.data.data.total
            })
        },
        handleSizeChange(newSize) {
            //   console.log(newSize)
            this.queryInfo.pagesize = newSize
            this.getUserList()
        },
        handleCurrentChange(newPage) {
            //   console.log(newPage)
            this.queryInfo.pagenum = newPage
            this.getUserList()
        },
        userStateChange(userinfo) {
            this.$http
                .put(`users/${userinfo.id}/state/${userinfo.mg_state} `)
                .then(res => {
                    //   console.log(res.data)
                    if (res.data.meta.status != 200) {
                        userinfo.mg_state = !userinfo.mg_state
                        return this.$message.error('failed')
                    }
                    this.$message.success('success')
                })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done()
                })
                .catch(_ => {})
        },
        // jian ting dialog closed
        addDialogClosed() {
            this.$refs.addFormRef.resetFields()
        },
        addUser() {
            // 验证成功了结果为true
            this.$refs.addFormRef.validate(valid => {
                if (!valid) {
                    return
                }
                //  发起添加的网络请求
                this.$http.post('/users', this.addForm).then(res => {
                    if (res.data.meta.status !== 201) {
                        this.$message.error('failed')
                    }
                    this.$message.success('success')
                    this.addDialogVisible = false
                    // 刷新列表

                    this.getUserList()
                })
            })
        },
        // edit function id: 579, rid: 82, username: "田淑华", mobile: "18837688767", email: "1987644633@qq.com"}
        editUserInfo() {
            // 校验
            this.$refs.editFormRef.validate(valid => {
                if (!valid) {
                    return
                }
                this.$http
                    .put('users/' + this.editForm.id, {
                        email: this.editForm.email,
                        mobile: this.editForm.mobile
                    })
                    .then(res => {
                        if (res.data.meta.status != 200) {
                            return this.$message.error('failed')
                        }
                        // close dialog
                        this.editDialogVisible = false
                        // update data
                        this.getUserList()
                        // tip success
                        this.$message.success('success')
                    })
            })
        },
        showEditDialog(id) {
            this.$http.get('users/' + id).then(res => {
                if (res.data.meta.status !== 201) {
                    this.$message.error('failed')
                }
                this.$message.success('success')
                this.editForm = res.data.data
            })

            this.editDialogVisible = true
        },
        // close dialog
        editDialogClosed() {
            this.$refs.editFormRef.resetFields()

            // this.getUserList()
        },
        /****************delete function*******************************888*****/

        removeUserById(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                })
                .then(res => {
                    // console.log(res)
                    if (res !== 'confirm') {
                        return this.$message.info('already cancel delete')
                    } else {
                        this.$http.delete('users/' + id).then(res => {
                            this.getUserList()
                            // console.log(res)
                            return this.$message.success('delete success')
                        })
                    }
                })
                .catch(err => {
                    return err
                })
        },
        deleteDialogClosed() {
            this.$refs.deleteFormRef.resetFields()

            // this.getUserList()
        },
        deleteUserInfo() {
            // 校验
            this.$refs.deleteFormRef.validate(valid => {
                if (!valid) {
                    return
                }
                this.$http
                    .delete('users/' + this.deleteForm.id, {
                        email: this.deleteForm.email,
                        mobile: this.deleteForm.mobile
                    })
                    .then(res => {
                        if (res.data.meta.status != 200) {
                            return this.$message.error('failed')
                        }
                        // close dialog
                        this.deleteDialogVisible = false
                        // update data
                        this.getUserList()
                        // tip success
                        this.$message.success('success')
                    })
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

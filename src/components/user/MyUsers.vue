<template>
<div class="user-page">
    <!--1    breadcrumb-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    </el-breadcrumb>
    <!--2  v-model="searchInfo"  search-->
    <el-input placeholder="please input" class="input-with-select" v-model="userInfo.query" @keyup.native="getUserData" clearable @clear="getUserData">
        <el-button slot="append" icon="el-icon-search" @click="getUserData">
        </el-button>
    </el-input>

    <el-input placeholder="请输入内容" class="input-with-select" v-model="userInfo.query" @keyup.native="getUserData" clearable @clear="getUserData">

        <el-button slot="append" icon="el-icon-search" @click="getUserData"></el-button>
    </el-input>

    <!--3    button-->
    <el-button type="primary" @click="addDialogVisible = true">点击添加</el-button>
    <!--3.1  add  dialog    button-->
    <el-dialog :visible.sync="addDialogVisible" width="50%" @close="addDialogCloseClear">
        <el-form :model="addFormData" :rules="addFormDataRules" ref="addFormDataRef">
            <el-form-item label="user" prop="username">
                <el-input v-model="addFormData.username">
                </el-input>
            </el-form-item>
            <el-form-item label="pass" prop="password">
                <el-input v-model="addFormData.password">
                </el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
                <el-input v-model="addFormData.email">
                </el-input>
            </el-form-item>
            <el-form-item label="mobile" prop="mobile">
                <el-input v-model="addFormData.mobile">
                </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
    </el-dialog>

    <!--4    showpage-->

    <el-table :data="userDataTable">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="id" label="id"></el-table-column>
        <el-table-column prop="username" label="username"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
        <el-table-column prop="role_name" label="role_name"></el-table-column>
        <el-table-column prop="mg_state" label="mg_state">
            <template slot-scope="scope">
                <el-switch :model="scope.row.mg_state">
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="id" label="manage" width="200px">
            <template slot-scope="scope">
                <el-button type="success" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserData(scope.row.id)"></el-button>
                <el-button type="primary" icon="el-icon-setting" size="mini"></el-button>
            </template>
        </el-table-column>
    </el-table>
    <!--4.1   editPage :rules="editFormDataRules"-->
    <el-dialog :visible.sync="editDialogVisible" width="50%" @close="editDialogCloseClear">
        <el-form :model="editFormData" ref="editFormDataRef" :rules="editFormDataRules">
            <el-form-item label="id" prop="id">
                <el-input v-model="editFormData.id" disabled>
                </el-input>
            </el-form-item>
            <el-form-item label="role_id" prop="role_id">
                <el-input v-model="editFormData.role_id" disabled>
                </el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
                <el-input v-model="editFormData.email">
                </el-input>
            </el-form-item>
            <el-form-item label="mobile" prop="mobile">
                <el-input v-model="editFormData.mobile">
                </el-input>
            </el-form-item>
            <el-form-item label="username" prop="username">
                <el-input v-model="editFormData.username" disabled>
                </el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible=false">取 消</el-button>
            <el-button type="primary" @click="submitEditUserData">确 定</el-button>
        </span>
    </el-dialog>

    <!--5    pageinfo-->

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="userInfo.pagenum" :page-sizes="[1,2,5,10]" :page-size="userInfo.pagesize" layout="total,sizes,prev,pager,next,jumper" :total="total">
    </el-pagination>

</div>
</template>

<script>
export default {
    data() {
        // 因为不使用return包裹的数据会在项目的全局可见，会造成变量污染。
        // 使用return包裹后数据中变量只在当前组件中生效，不会影响其他组件。

        var checkEmail = (rules, value, cb) => {
            const regEmail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
            if (regEmail.test(value) == true) {
                return cb()
            }
            cb(new Error('input correct emial'))
        }
        var checkMobile = (rules, value, cb) => {
            const regMobile = /^1(3|4|5|6|7|8|9)\d{9}$/
            if (regMobile.test(value) == true) {
                return cb()
            }
            cb(new Error('input correct mobile'))
        }
        return {
            userData: [],
            userDataTable: [],
            userInfo: {
                pagenum: 1,
                pagesize: 5,
                query: '',
            },
            total: 0,
            addDialogVisible: false,
            dialogVisible: false,
            editDialogVisible: false,
            addFormData: {
                username: '',
                password: '',
                email: '',
                mobile: '',
            },

            //  edit data form 
            editFormData: {
                id: '',
                username: '',
                role_id: '',
                mobile: '',
                email: '',
            },
            editFormDataRules: {
                email: [{
                        required: true, //是否必填
                        message: 'input email', //错误提示信息
                        trigger: 'blur' //blur 鼠标点击其他地方
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '3 to 20',
                        trigger: 'blur'
                    },
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    }
                ],
                mobile: [{
                        required: true, //是否必填
                        message: 'input mobile', //错误提示信息
                        trigger: 'blur' //blur 鼠标点击其他地方
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '3 to 20',
                        trigger: 'blur'
                    },
                    {
                        validator: checkMobile,
                        trigger: 'blur'
                    }
                ],

            },

            addFormDataRules: {
                username: [{
                        required: true, //是否必填
                        message: 'input username', //错误提示信息
                        trigger: 'blur' //blur 鼠标点击其他地方
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '3 to 20',
                        trigger: 'blur'
                    }
                ],
                password: [{
                        required: true, //是否必填
                        message: 'input password', //错误提示信息
                        trigger: 'blur' //blur 鼠标点击其他地方
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '3 to 20',
                        trigger: 'blur'
                    }
                ],
                email: [{
                        required: true, //是否必填
                        message: 'input email', //错误提示信息
                        trigger: 'blur' //blur 鼠标点击其他地方
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '3 to 20',
                        trigger: 'blur'
                    },
                    {
                        validator: checkEmail,
                        trigger: 'blur'
                    }
                ],
                mobile: [{
                        required: true, //是否必填
                        message: 'input mobile', //错误提示信息
                        trigger: 'blur' //blur 鼠标点击其他地方
                    },
                    {
                        min: 3,
                        max: 20,
                        message: '3 to 20',
                        trigger: 'blur'
                    },
                    {
                        validator: checkMobile,
                        trigger: 'blur'
                    }
                ],

            },

        }
    },
    created() {
        this.getUserData()
        // this.getSecondData()
    },
    methods: {
        // mytest page
        handleSizeChange(sizeinput) {
            this.userInfo.pagesize = sizeinput
            this.getUserData()
        },
        handleCurrentChange(numinput) {
            this.userInfo.pagenum = numinput
            this.getUserData()
        },
        // real
        getUserData() {
            this.$http.get('users', {
                params: this.userInfo
            }).then(res => {
                this.userDataTable = res.data.data.users
                this.total = res.data.data.total
                console.log(this.userDataTable)
                console.log(res.data.data)

            })

        },
        // 1 add user search
        addUser() {
            this.$http.post('/users', this.addFormData).then(res => {
                if (res.data.meta.status !== 201) {
                    this.$message.error('failed')
                }
                this.$message.success('success')
                this.addDialogVisible = false
                this.getUserData
            })
        },
        addDialogCloseClear() {
            this.$refs.addFormDataRef.resetFields()
        },

        // 2 delete  路径要对
        deleteUserData(id) {
            this.$http.delete('users/' + id).then(res => {

                this.getUserData()
                return this.$message.success('delete success')
            })

        },
        // // 3 update
        showEditDialog(id) {
            this.$http.get('users/' + id).then(res => {
                // console.log(res)
                this.$message.success('success')
                this.editFormData = res.data.data
                this.editDialogVisible = true
            })
            this.editDialogVisible = true
        },
        // },
        editDialogCloseClear() {
            this.$refs.editFormDataRef.resetFields()
        },

        submitEditUserData() {
            this.$http.put('users/' + this.editFormData.id, {
                email: this.editFormData.email,
                mobile: this.editFormData.mobile
            }).then(res => {
                if (res.data.meta.status !== 200) {
                    return this.$message.error('failed')
                }
                this.editDialogVisible = false
                this.getUserData()
                this.$message.success('success')
            })

        }

    }

}
</script>

<style lang="less" scoped>
.input-with-select {
    padding: 10px
}
</style>

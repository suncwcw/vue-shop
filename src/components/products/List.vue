<template>
<div>
    <!--1 miao boaxie -->
    <div class="show-roles">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">CategoryPage</el-breadcrumb-item>
            <el-breadcrumb-item>Manage</el-breadcrumb-item>
            <el-breadcrumb-item>List</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 2list -->
    <el-card class="box-card">
        <!-- 2-1 button-->
        <el-row>
            <el-col :span="12" class="input-box">
                <el-input v-model="queryInfo.query" placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search" @click="getProductList"></el-button>
                </el-input>
            </el-col>
            <el-col :span="12">
                <el-button type="primary" icon="el-icon-add" @click="goAddPage"> add 添加商品</el-button>
            </el-col>
        </el-row>
        <!-- 2-2 table-->
        <el-table :data="productList" border stripe>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="goods_id" prop="goods_id"></el-table-column>
            <el-table-column label="goods_name" prop="goods_name"></el-table-column>
            <el-table-column label="goods_number" prop="goods_number"></el-table-column>
            <!-- 2-2-1 table  switch button-->
            <el-table-column label="is_promote" prop="is_promote">
                <template slot-scope="scope">
                    <!-- {{scope.row.mg_state}} -->
                    <el-switch :model="scope.is_promote"></el-switch>
                </template>
            </el-table-column>
            <!-- 2-2-2 table  manage button   @click="removeUserById(scope.row.goods_id)"-->
            <el-table-column label="manage" width="180">
                <template slot-scope="scope">
                    <!-- {{scope.row.mg_state}} -->
                    <el-button type="success" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.goods_id)"></el-button>
                    <!-- delete button-->
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeById(scope.row.goods_id)"></el-button>

                    <el-tooltip content="setting" placement="top" size="mini">
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!--3 page -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <!--4 dialog -->
    <el-dialog title="提示" :visible.sync="editDialogVisible" width="70%" @close="editDialogClosed">
        <el-form :model="editGoodsInfo" ref="productListRef" width="170px">
            <el-form-item label="goods_id" disabled>
                <el-input v-model="editGoodsInfo.goods_id"></el-input>
            </el-form-item>
            <el-form-item label="goods_name">
                <el-input v-model="editGoodsInfo.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="goods_price">
                <el-input v-model="editGoodsInfo.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="goods_weight">
                <el-input v-model="editGoodsInfo.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="goods_number">
                <el-input v-model="editGoodsInfo.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="goods_state">
                <el-input v-model="editGoodsInfo.goods_state"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible=false">取 消</el-button>
            <!---@click="editGoodsInfo"-->
            <el-button type="primary" @click="updateGoodsInfo">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {

            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            productList: [],
            total: 0,
            editDialogVisible: false,
            editGoodsInfo: {
                goods_name: '',
                goods_price: 20,
                goods_number: 30,
                goods_weight: 40,
                goods_introduce: '',
                pics: [{
                    pic: ''
                }],
                attrs: [{
                        attr_id: 15,
                        attr_value: ''
                    },
                    {
                        attr_id: 15,
                        attr_value: ''
                    }
                ]
            }

        }
    },
    created() {
        this.getProductList()
    },
    // methods 复数
    methods: {
        // 1 page
        handleSizeChange(newSize) {
            //   console.log(newSize)
            this.queryInfo.pagesize = newSize
            this.getProductList()
        },
        handleCurrentChange(newPage) {
            //   console.log(newPage)
            this.queryInfo.pagenum = newPage
            this.getProductList()
        },

        // 1获取列表数据 ，两个一个是 传入 queryInfo 传出 1  res.data.data.goods 2  res.data.data.total
        getProductList() {
            this.$http
                .get('goods', {
                    params: this.queryInfo
                })
                .then(res => {
                    this.productList = res.data.data.goods
                    this.total = res.data.data.total
                    console.log(this.productList)
                })
        },

        // 2 点开 展示数据获取列表数据 ，两个一个是list 一个是 页数
        showEditDialog(id) {
            console.log(id)
            this.$http.get('goods/' + id).then(res => {
                console.log(res.data.data)
                this.editGoodsInfo = res.data.data
                // 
            })

            this.editDialogVisible = true

        },
        //3  update
        updateGoodsInfo() {
            this.$http.put('goods/' + this.editGoodsInfo.goods_id, {
                goods_name: this.editGoodsInfo.goods_name,
                goods_price: this.editGoodsInfo.goods_price,
                goods_number: this.editGoodsInfo.goods_number,
                goods_weight: this.editGoodsInfo.goods_weight,
                goods_introduce: '',
                pics: [{
                    pic: ''
                }],
                attrs: [{
                        attr_id: 15,
                        attr_value: ''
                    },
                    {
                        attr_id: 15,
                        attr_value: ''
                    }
                ]

            }).then(res => {
                console.log(res.data.meta)
                if (res.data.meta.status != 200) {
                    this.editDialogVisible = false;
                    return this.$message.error('failed')
                }
                // close dialog
                this.getProductList(),
                    this.$message.success('success')
            })
        },
        removeById(id) {
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
                        this.$http.delete('goods/' + id).then(res => {
                            this.getProductList()
                            console.log(res)
                            return this.$message.success('delete success')
                        })
                    }
                })
                .catch(err => {
                    return err
                })

        },
        // 重置
        editDialogClosed() {
            this.$refs.productListRef.resetFields()
        },
        goAddPage(){
            this.$router.push('/goods/add')
        }

    }
}
</script>

<style lang="less" scoped>
.input-box {
    width: 50%;
    padding-right:10px
}
</style>

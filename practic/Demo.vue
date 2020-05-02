<template>
<div>

    <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/home'}"></el-breadcrumb-item>
        <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
        <el-row>
            <el-col :span="12">
                <el-input v-model="queryInfo.query" placeholder="please input">
                    <el-button slot="append" @click="getProductList"></el-button>
                </el-input>
            </el-col>
        </el-row>

    </el-card>
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
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

</div>
</template>

<script>
export default {
    data() {
        return {
            queryInfo: {
                query: '',
                // 给个初始值第一页 10size
                pagenum: 1,
                pagesize: 10
            },

            productList: [],
            total: 0,

        }
    },
    created() {
        this.getOurList()
        this.getOurProductList()

    }
    methods: {

        getOurProductList() {

            this.$http.get('goods', {
                params: this.queryInfo
            }).then(res => {
                this.productList = res.data.data.goods
                this.total = res.data.data.total
            })

        },
        // cha
        getOurList() {

            this.$http.get('goods', {
                params: this.pageInfo
            }).then(res => {
                this.productList = res.data.data.goods
                this.total = res.data.data.total
            })
        },
        getProductList() {
            this.$http.get('goods', {
                params: this.queryInfo
            }).then(res => {
                this.productList = res.data.data.goods
                this.total = res.data.data.total
            })

        }
    }

}
</script>

<style lang="less" scoped></style>

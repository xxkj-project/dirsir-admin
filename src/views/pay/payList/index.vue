<!--
 * @Author: wangshengxian
 * @Date: 2020-11-30 15:38:46
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-17 17:19:50
 * @Desc: 支付列表 - page
-->
<template>
  <div class="pay-list-page">
    <div class="headWrap">
      <el-button type="primary" size="small" @click="onAdd">新增支付账号</el-button>
    </div>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" min-width="100"></el-table-column>
            <el-table-column label="微信二维码" min-width="100">
              <template slot-scope="scope">
                <img class="img" :src="scope.row.pic" alt="" />
              </template>
            </el-table-column>
            <el-table-column prop="account" label="支付账号" min-width="140"></el-table-column>
            <el-table-column prop="name" label="昵称" min-width="120"></el-table-column>
            <el-table-column prop="mobile" label="手机号" min-width="140"></el-table-column>

            <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
                <el-button type="danger" size="mini" @click="onDel(scope.row, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <addEdit :type="dialogType" :visible.sync="isAddEdit" :formData="formData" @success="handleSuccess" />
  </div>
</template>

<script>
import addEdit from '@/views/pay/components/payList/handleAddEdit'
import { getPayAccountList, delPayAccount } from '@/api/pay'
export default {
  name: '',
  data() {
    return {
      dialogType: 'add',
      isAddEdit: false,
      formData: {
        // account: '',
        // mobile: '',
        // name: '',
        // pic: []
      },
      tableList: []
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    onAdd() {
      this.dialogType = 'add'
      this.isAddEdit = true
      this.formData = {
        account: '',
        mobile: '',
        name: '',
        pic: []
      }
    },
    onEdit(row, index) {
      console.log('-row-', row, index)
      this.dialogType = 'edit'
      this.isAddEdit = true
      this.formData = { ...row }
      this.formData.pic = row.pic ? [row.pic] : []
    },
    onDel(row, index) {
      console.log('-row-', row, index)
      this.$confirm('是否删除该账号', '提示', {
        center: true,
        type: 'warning'
      })
        .then(() => {
          const params = { id: row.id }
          delPayAccount(params).then(res => {
            console.log('-res-', res)
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.tableList.splice(index, 1)
          })
        })
        .catch(() => {})
    },
    handleSuccess() {
      this.getData()
    },
    getData() {
      getPayAccountList().then(res => {
        // console.log('-res-', res)
        const data = res.data
        this.tableList = data
        console.log('-list-', this.tableList)
      })
    }
  },
  components: { addEdit }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
.listBox {
  .img {
    display: block;
    width: 80px;
    height: 80px;
  }
}
</style>

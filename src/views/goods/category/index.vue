<!--
 * @Author: wangshengxian
 * @Date: 2020-10-29 17:36:34
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-15 15:57:41
 * @Desc: 类别列表 - page
-->
<template>
  <div class="category-page">
    <!-- <el-button slot="button" type="primary" size="mini" @click="onAdd">添加类别</el-button> -->

    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="商品ID" min-width="100"></el-table-column>

            <el-table-column prop="name" label="分类名称" min-width="120"></el-table-column>
            <!-- <el-table-column prop="rankNo" label="序号" min-width="120"></el-table-column> -->

            <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="primary" size="mini" @click="onCheck(scope.row)">查看二级分类</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <addEdit :type="dialogType" :visible.sync="isVisble" :formData="formData" @success="handleSuccess" />
  </div>
</template>

<script>
import addEdit from '@/views/goods/components/category/handleFirstMenuEdit'
import { getCategoryList } from '@/api/goods'
export default {
  name: '',
  data() {
    return {
      dialogType: 'add',
      isVisble: false,
      formData: {},
      tableList: []
    }
  },
  computed: {},
  filters: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    onAdd() {
      this.isVisble = true
      this.dialogType = 'add'
      this.formData = { name: '' }
    },
    // 编辑
    onEdit(row) {
      // console.log('-edit-row-', row)
      this.isVisble = true
      this.dialogType = 'edit'
      this.formData = { ...row }
    },
    // 查看二级分类
    onCheck(row) {
      console.log('-check-row-', row)
      this.$router.push({ name: 'SecondCategory', query: { id: row.id } })
    },
    handleSuccess() {
      this.getData()
    },
    getData() {
      getCategoryList({ parentId: 0 }).then(res => {
        // console.log('-category-res-', res)
        const data = res.data
        this.tableList = data
        console.log('-category-list-', this.tableList)
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

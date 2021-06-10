<!--
 * @Author: wangshengxian
 * @Date: 2020-10-29 17:36:34
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-01 11:39:47
 * @Desc: 类别列表 - page
-->
<template>
  <div class="category-page">
    <el-button slot="button" type="primary" size="mini" @click="onAdd">添加二级类别</el-button>

    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="商品ID" min-width="100"></el-table-column>

            <el-table-column label="背景图片" min-width="120">
              <template slot-scope="scope">
                <img class="img backgroundImg" :src="scope.row.backgroundImage" alt="" />
              </template>
            </el-table-column>

            <el-table-column label="icon图片" min-width="120">
              <template slot-scope="scope">
                <img class="img iconImg" :src="scope.row.icon" alt="" />
              </template>
            </el-table-column>

            <el-table-column prop="name" label="分类名称" min-width="120"></el-table-column>
            <!-- <el-table-column prop="rankNo" label="序号" min-width="120"></el-table-column> -->

            <el-table-column label="操作" min-width="160">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="onDelete(scope.row, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <addEdit :type="dialogType" :visible.sync="isVisible" :formData="formData" @success="handleSuccess" />
  </div>
</template>

<script>
import addEdit from '@/views/goods/components/category/handleAddEdit'
import { getCategoryList, delCategory } from '@/api/goods'
export default {
  name: '',
  data() {
    return {
      parentId: 0,
      dialogType: 'add',
      isVisible: false,
      formData: {},
      tableList: []
    }
  },
  computed: {},
  filters: {},
  created() {
    this.parentId = +this.$route.query.id
    this.getData()
  },
  mounted() {},
  methods: {
    // 添加
    onAdd() {
      this.isVisible = true
      this.dialogType = 'add'
      this.formData = { name: '', backgroundImage: [], icon: [], pId: this.parentId }
    },
    // 编辑
    onEdit(row) {
      console.log('-edit-row-', row)
      this.isVisible = true
      this.dialogType = 'edit'
      this.formData = { ...row }
      this.formData.icon = [row.icon]
      this.formData.backgroundImage = [row.backgroundImage]
      // console.log(this.formData)
    },
    // 删除
    onDelete(row, index) {
      console.log('-del-row-', row)
      this.$confirm('是否删除该类别', '提示', {
        center: true,
        type: 'warning'
      })
        .then(() => {
          const params = { id: row.id }
          delCategory(params).then(res => {
            console.log('-res-', res)
            this.tableList.splice(index, 1)
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          })
        })
        .catch(() => {})
    },
    handleSuccess() {
      this.getData()
    },
    getData() {
      const params = { parentId: this.parentId }
      getCategoryList(params).then(res => {
        console.log('-category-res-', res)
        this.tableList = res.data
        // console.log('-list-', this.tableList)
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

    &.backgroundImg {
      width: 192px;
      height: 73px;
      border-radius: 6px;
    }

    &.iconImg {
      width: 61px;
      height: 39px;
    }
  }
}
</style>

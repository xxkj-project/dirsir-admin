<!--
 * @Author: wangshengxian
 * @Date: 2020-08-19 09:57:01
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-25 11:42:03
 * @Desc: 代理管理 - 二级代理人列表
-->
<template>
  <div class="agentList-page">
    <!-- <el-button slot="button" type="primary" size="mini" @click="onAddAgent">添加二级代理</el-button> -->

    <div class="listBox">
      <div class="tableBox">
        <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="agentName" label="代理名称" min-width="120"></el-table-column>
          <el-table-column prop="agentCode" label="渠道号" min-width="120"></el-table-column>
          <el-table-column prop="total" label="代理总销售额" min-width="120"></el-table-column>
          <!-- <el-table-column label="操作" min-width="120">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="onEditAgent(scope.row, scope.$index)">编辑</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <pagination
        :currentPage.sync="pagination.currentPage"
        :pageSize.sync="pagination.pageSize"
        :total="pagination.total"
        @currentChange="currentChange"
        @sizeChange="sizeChange"
      />
    </div>
    <addAgent
      :type="addAgentType"
      :parentId="parentId"
      :formData="agentFormData"
      @success="handleAddAgent"
      :visible.sync="isAddAgent"
    />
  </div>
</template>

<script>
import pagination from '@/components/pagination'
import addAgent from '@/views/agent/components/agenList/addAgent'
import { getAgentList } from '@/api/agent'
export default {
  name: '',
  data() {
    return {
      isAddAgent: false,
      addAgentType: 'add',
      parentId: 0, // 父级代理id
      agentFormData: {
        agentName: '',
        agentCode: ''
      },
      tableList: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },

  computed: {},
  created() {
    this.parentId = +this.$route.query.id
    this.getData()
  },
  mounted() {},
  methods: {
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },

    onAddAgent() {
      console.log('添加代理人-')
      this.isAddAgent = true
      this.addAgentType = 'add'
      this.agentFormData = { agentName: '', agentCode: '' }
    },
    onEditAgent(row, index) {
      console.log('-edit-', row, index)
      const { agentName, agentCode, id } = row
      this.isAddAgent = true
      this.addAgentType = 'edit'
      this.agentFormData = { agentName, agentCode, agentId: id }
    },

    handleAddAgent() {
      console.log('添加/编辑代理人成功回调')
      if (this.addAgentType === 'add') {
        // 添加成功后初始化第一页
        this.getInitData()
      } else {
        // 编辑成功后刷新当前页
        this.getInitData(this.pagination.currentPage, this.pagination.pageSize)
      }
    },
    currentChange(pageNo) {
      this.getInitData(pageNo, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },

    // 数据请求
    getData() {
      const params = {
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.currentPage,
        parentId: this.parentId
      }
      console.log('-params-', params)
      getAgentList(params).then(res => {
        console.log('-res-', res)
        const data = res.data
        this.tableList = data.list
        this.pagination.total = data.count
      })
    }
  },
  components: { pagination, addAgent }
}
</script>

<style lang="less" scoped></style>

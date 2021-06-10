<!--
 * @Author: wangshengxian
 * @Date: 2020-08-19 09:57:01
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-12-30 16:25:21
 * @Desc: 代理管理 - 代理人列表
-->
<template>
  <div class="agentList-page">
    <el-button slot="button" type="primary" size="mini" @click="onAddAgent">添加一级代理</el-button>

    <div class="listBox">
      <div class="tableBox">
        <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="agentName" label="代理名称" min-width="120"></el-table-column>
          <el-table-column prop="agentCode" label="渠道号" min-width="120"></el-table-column>
          <el-table-column prop="total" label="代理总销售额" min-width="120"></el-table-column>
          <el-table-column prop="settleFee" label="结算金额" min-width="120"></el-table-column>
          <el-table-column
            prop="settleFee"
            label="未结算金额"
            min-width="120"
            :formatter="feeFormatter"
          ></el-table-column>
          <el-table-column label="操作" min-width="220">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="onEditAgent(scope.row, scope.$index)">编辑</el-button>
              <el-button
                type="primary"
                size="mini"
                :disabled="scope.row.total == scope.row.settleFee"
                @click="onSettle(scope.row, scope.$index)"
                >结算</el-button
              >
              <el-button type="primary" size="mini" @click="onCheckNextAgent(scope.row, scope.$index)"
                >查看二级代理</el-button
              >
            </template>
          </el-table-column>
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
      :paremtId="parentId"
      :formData="agentFormData"
      @success="handleAddAgent"
      :visible.sync="isAddAgent"
    />

    <settleMoney :formData="settleFormData" :visible.sync="isSettle" @success="handleSettleMoney" />
  </div>
</template>

<script>
import pagination from '@/components/pagination'
import addAgent from '@/views/agent/components/agenList/addAgent'
import settleMoney from '@/views/agent/components/agenList/settleMoney'
import { getAgentList } from '@/api/agent'
import jsPrecision from '@/utils/jsPrecision'
export default {
  name: '',
  data() {
    return {
      isSettle: false,
      settleFormData: {},
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
    this.getData()
  },
  mounted() {},
  methods: {
    feeFormatter(row) {
      // jsPrecision ==> js运算精度的处理对象
      return jsPrecision.sub(row.total, row.settleFee)
    },
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
    onSettle(row, index) {
      console.log('-结算-', row, index)

      if (row.total === row.settleFee) {
        this.$message({
          message: '当前没有可结算的金额！',
          type: 'warning'
        })
        return
      }
      this.isSettle = true
      this.settleFormData = { ...row }
      this.settleFormData.settleFee = 0
      this.settleFormData.total = jsPrecision.sub(row.total, row.settleFee)
    },
    onCheckNextAgent(row, index) {
      console.log('-查看下一级代理-', row, index)
      this.$router.push({ name: 'NextAgentList', query: { id: row.id } })
    },
    handleAddAgent() {
      console.log('添加/编辑代理人成功回调')
      if (this.addAgentType === 'add') {
        // 添加成功后初始化第一页
        this.getInitData()
      } else {
        this.getInitData(this.pagination.currentPage, this.pagination.pageSize)
      }
    },
    handleSettleMoney() {
      this.getInitData(this.pagination.currentPage, this.pagination.pageSize)
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
        this.pagination.total = data.count
        this.tableList = data.list
        console.log('-table-list-', this.tableList)
      })
    }
  },
  components: { pagination, addAgent, settleMoney }
}
</script>

<style lang="less" scoped></style>

<!--
 * @Author: wangshengxian
 * @Date: 2020-10-29 17:36:34
 * @LastEditors: wangshengxian
 * @LastEditTime: 2020-11-02 10:24:30
 * @Desc: 反馈列表
-->
<template>
  <div class="feedback-page">
    <searchForm :formOptions="formOptions" @onSearch="onSearch"> </searchForm>
    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="userId" label="ID" min-width="80"></el-table-column>
            <el-table-column prop="orderNo" label="订单编号" min-width="90"></el-table-column>
            <el-table-column prop="question" label="反馈问题" min-width="90"></el-table-column>
            <el-table-column prop="createTime" label="反馈时间" min-width="120"></el-table-column>
            <el-table-column prop="answer" label="客服回复" min-width="140"></el-table-column>
            <el-table-column label="操作" min-width="60">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onReply(scope.row, scope.$index)">客服回复</el-button>
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
    </div>
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import pagination from '@/components/pagination'
import { getFeedBackList, kefuAnswer } from '@/api/feedBack'
export default {
  name: '',
  data() {
    return {
      searchData: {
        orderNo: '',
        userId: '',
        startDate: '',
        endDate: ''
      },
      tableList: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      formOptions: [
        {
          label: '订单编号',
          prop: 'orderNo',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入订单编号'
        },
        {
          label: '下单用户',
          prop: 'userId',
          element: 'el-input',
          initValue: '',
          placeholder: '请输入下单用户ID'
        },

        {
          label: '日期',
          prop: 'times',
          element: 'el-date-picker',
          initValue: '',
          placeholder: ''
        }
      ]
    }
  },
  computed: {},
  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onSearch(data) {
      console.log('-search-', data)
      this.searchData.orderNo = data.orderNo
      this.searchData.userId = data.userId
      this.searchData.startDate = data.times ? data.times[0] : ''
      this.searchData.endDate = data.times ? data.times[1] : ''
      this.getInitData()
    },
    onReply(row, index) {
      console.log(row, index)
      // TODO: 需要问产品是否需要修改客服回复功能，若不需要则在已经有客服回复消息的时候隐藏掉客服回复按钮
      this.$prompt('客服回复', '', {
        // center: 'true',
        inputType: 'textarea',
        inputPlaceholder: '请输入回复内容',
        inputErrorMessage: '回复内容不能为空',
        inputValidator(value) {
          if (!value) return false
        }
      })
        .then(({ value }) => {
          const params = {
            id: row.id,
            content: value
          }
          kefuAnswer(params).then(res => {
            this.$message({
              message: '成功回复！'
            })
            this.getInitData(this.pagination.currentPage, this.pagination.pageSize)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
    },
    currentChange(pageNum) {
      this.getInitData(pageNum, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      console.log('-params-', params)
      getFeedBackList(params).then(res => {
        console.log('-res-', res)
        const { count, list } = res.data
        this.tableList = list
        this.pagination.total = count
      })
    }
  },
  components: { searchForm, pagination }
}
</script>
<style lang="less" scoped>
//@import url(); 引入公共css类
</style>

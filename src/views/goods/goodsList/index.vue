<!--
 * @Author: wangshengxian
 * @Date: 2020-10-29 17:36:34
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-15 15:55:36
 * @Desc: 商品管理列表
-->
<template>
  <div class="goodsList">
    <searchForm :formOptions="formOptions" :btnItems="btnItems" @onSearch="onSearch" @onExport="onExport">
      <el-button slot="button" type="primary" size="mini" @click="onAdd">添加商品</el-button>
    </searchForm>

    <div class="main">
      <div class="listBox">
        <div class="tableBox">
          <el-table :data="tableList" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="商品ID" min-width="80"></el-table-column>
            <el-table-column label="图片">
              <template slot-scope="scope">
                <img class="img" :src="scope.row.image" alt="" />
              </template>
            </el-table-column>

            <el-table-column prop="title" label="商品名称" min-width="140"></el-table-column>
            <el-table-column prop="categoryName" label="类别" min-width="120"></el-table-column>
            <el-table-column prop="showPrice" label="原价" min-width="80"></el-table-column>
            <el-table-column prop="price" label="售价" min-width="80"></el-table-column>

            <el-table-column
              prop="dataStatus"
              label="是否上架"
              min-width="80"
              :formatter="statusFormatter"
            ></el-table-column>
            <el-table-column
              prop="sort"
              label="是否推荐"
              min-width="80"
              :formatter="recommendFormatter"
            ></el-table-column>

            <!-- <el-table-column prop="sort" label="排序号" min-width="80"></el-table-column> -->

            <el-table-column label="操作" min-width="260">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onEdit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="onSoldOut(scope.row, scope.$index)">{{
                  scope.row.dataStatus | filterSoldOutBtn
                }}</el-button>
                <el-button type="primary" size="mini" @click="onRecommend(scope.row, scope.$index)">{{
                  scope.row.sort | filterRecommendBtn
                }}</el-button>
                <template v-if="!scope.row.dataStatus">
                  <el-button type="danger" size="mini" @click="onDel(scope.row)">删除</el-button>
                </template>
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

    <addEdit
      :type="dialogType"
      :visible.sync="isVisible"
      :formData="goodsFormData"
      :categoryList="categoryList"
      :currSkuType.sync="currSkuType"
      :skuData="skuData"
      @success="handleaddEditSuccess"
    />
  </div>
</template>

<script>
import searchForm from '@/components/searchForm'
import addEdit from '@/views/goods/components/goodsList/handleAddEdit'
import pagination from '@/components/pagination'
import {
  getGoodsList,
  operateGoods,
  getTotalCategoryList,
  getGoodsDetails,
  updateGoodsRecommend,
  delGoods
} from '@/api/goods'
import { exportExcel } from '@/api/common'
import { getIsShow } from '@/filters/global'
import tools from '@/utils/tools'
export default {
  name: '',
  data() {
    return {
      btnItems: 'search,export',
      isVisible: false,
      dialogType: 'add',
      goodsFormData: {},
      currSkuType: '', // 当前sku类型，默认为空
      categoryList: [],
      skuData: {},
      searchData: {
        productName: '',
        categoryId: '',
        status: '',
        sort: '',
        sortPrice: ''
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableList: []
    }
  },
  computed: {
    formOptions() {
      let result = [
        {
          element: 'el-input',
          label: '名称',
          prop: 'productName',
          initValue: '',
          placeholder: '请输入名称'
        },
        {
          element: 'el-cascader',
          label: '类别',
          prop: 'categoryId',
          options: this.categoryList,
          checkStrictly: true,
          initValue: '',
          placeholder: '全部'
        },
        {
          element: 'el-select',
          label: '售价排序',
          prop: 'sortPrice',
          initValue: '',
          placeholder: '全部',
          options: [
            { value: '', label: '全部' },
            { value: 0, label: '由高到低' },
            { value: 1, label: '由低到高' }
          ]
        },
        {
          element: 'el-select',
          label: '是否上架',
          prop: 'status',
          initValue: '',
          placeholder: '全部',
          options: getIsShow()
        },
        {
          element: 'el-select',
          label: '是否推荐',
          prop: 'sort',
          initValue: '',
          placeholder: '全部',
          options: getIsShow()
        }
      ]
      return result
    }
  },
  filters: {
    filterSoldOutBtn(val) {
      return val ? '下架' : '上架'
    },
    filterRecommendBtn(val) {
      return val < 99 ? '取消推荐' : '推荐'
    }
  },
  created() {
    this.getData()
    this.getCategoryData()
  },
  mounted() {
    // TODO: 缺少一个一级分类选择选项
  },
  methods: {
    statusFormatter(row) {
      return row.dataStatus ? '是' : '否'
    },
    recommendFormatter(row) {
      return row.sort < 99 ? '是' : '否'
    },
    getInitData(pageNum = 1, pageSize = 10) {
      this.pagination.currentPage = pageNum
      this.pagination.pageSize = pageSize
      this.getData()
    },
    onSearch(data) {
      console.log('-search-', data)
      this.searchData = { ...data }
      if (data.categoryId) {
        this.searchData.categoryId = data.categoryId[data.categoryId.length - 1]
      }
      this.getInitData()
    },
    onExport(data) {
      console.log('-export-', data)
      this.searchData = { ...data }
      this.searchData.categoryId = data.categoryId[data.categoryId.length - 1] || ''
      console.log('-export-params-', this.searchData)
      exportExcel('goods', this.searchData)
    },
    setSearchData(data) {
      let result = { ...data }
      // result.categoryId = data.cate
      return result
    },
    currentChange(pageNum) {
      this.getInitData(pageNum, this.pagination.pageSize)
    },
    sizeChange(pageSize) {
      this.getInitData(1, pageSize)
    },
    handleaddEditSuccess() {
      console.log('添加/编辑商品成功', this.dialogType)
      this.dialogType === 'add'
        ? this.getInitData()
        : this.getInitData(this.pagination.currentPage, this.pagination.pageSize)
    },
    // 添加
    onAdd() {
      this.isVisible = true
      this.dialogType = 'add'
      this.currSkuType = 'first'
      this.goodsFormData = { productName: '', categoryId: '', description: '', pics: [], detailPics: [] }
    },
    // 编辑
    onEdit(row) {
      console.log('-edit-row-', row)
      this.dialogType = 'edit'
      const params = { id: row.id }
      getGoodsDetails(params).then(res => {
        console.log('-details-res-', res)
        const { specOne, specTwo, specOneList, specTwoList, detailList, ...other } = res.data
        this.goodsFormData = { ...other }
        // console.log('-form-data-', this.goodsFormData)
        console.log(specOne, specOneList, specTwo, specTwoList, detailList)
        let skuData = {}
        if (specTwoList && specTwoList.length > 0) {
          // 俩个规格
          skuData = {
            skuOneName: specOne,
            skuTwoName: specTwo,
            ...this.setTwoSkuData(specOneList, specTwoList, detailList)
          }
        } else {
          // 只有一个规格
          skuData = { skuOneName: specOne, ...this.setOneSkuData(specOneList, detailList) }
        }
        this.skuData = { ...skuData }
        if (specTwo) {
          this.currSkuType = 'second'
        } else {
          this.currSkuType = 'first'
        }
        console.log('-curr-sku-type-', this.currSkuType)
        this.isVisible = true
        console.log('-sku-data-', skuData)
      })
    },
    // 设置规格一
    setOneSkuData(specList, detailList) {
      console.log('-规格一-', specList, '-规格详情-', detailList)
      let skuDetailList = []
      let skuOneList = this.setSpecList(specList)
      if (!detailList || detailList.length === 0) {
        skuDetailList.push({ label: '', stock: '', price: '', showPrice: '' })
      } else {
        specList.map((val, index) => {
          skuDetailList.push({ label: `${val}-`, ...detailList[index] })
        })
      }
      // console.log({ skuOneList, skuDetailList })
      return { skuOneList, skuDetailList }
    },
    // 设置规格二
    setTwoSkuData(specOneList, specTwoList, detailList) {
      let skuDetailList = []
      let skuOneList = this.setSpecList(specOneList)
      let skuTwoList = this.setSpecList(specTwoList)
      if (!detailList || detailList.length === 0) {
        skuDetailList.push({ label: '', stock: '', price: '', showPrice: '' })
      } else {
        specOneList.map((oneVal, oneIdx) => {
          specTwoList.map((twoVal, twoIdx, arr) => {
            let index = arr.length * oneIdx + twoIdx
            skuDetailList.push({ label: `${oneVal}-${twoVal}-`, ...detailList[index] })
          })
        })
      }
      return { skuOneList, skuTwoList, skuDetailList }
    },
    // 设置规格类型
    setSpecList(list) {
      let result = []
      list.map((val, index) => {
        result.push({ value: val, key: tools.createUniqueString() })
      })
      return result
    },
    // 上架/下架
    onSoldOut(row, index) {
      console.log('-上下架商品-', row, '-index-', index)
      let status = row.dataStatus ? 0 : 1
      const msg = row.dataStatus ? '商品下架' : '商品上架'
      this.confirmMsg(msg, () => {
        const params = { status, id: row.id }
        console.log('-params-', params)
        operateGoods(params).then(res => {
          console.log('-res-', res)
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
          this.tableList[index].dataStatus = !this.tableList[index].dataStatus
          // this.getData()
        })
      })
    },
    // 推荐/取消推荐
    onRecommend(row, index) {
      console.log('-推荐/取消推荐-', row, index)
      // sort = 11 推荐 99 未推荐
      const status = row.sort < 99 ? 0 : 1
      const msg = row.sort < 99 ? '取消推荐该商品' : '推荐该商品'
      this.confirmMsg(msg, () => {
        const params = { status, id: row.id }
        console.log('-params-', params)
        updateGoodsRecommend(params).then(res => {
          console.log('-res-', res)
          this.$message({
            message: '操作成功！',
            type: 'success'
          })
          this.tableList[index].sort = row.sort === 99 ? 11 : 99
          // this.getData()
        })
      })
    },
    onDel(row) {
      console.log('-del-row-', row)
      this.confirmMsg('是否删除该商品?', () => {
        const params = { id: row.id }
        console.log('-params-', params)
        delGoods(params).then(res => {
          console.log('-res-', res)
          this.$message({
            message: '删除成功!',
            type: 'success'
          })
          this.getData()
        })
      })
    },
    confirmMsg(msg, callback) {
      this.$confirm(msg, '提示', {
        center: true,
        type: 'warning'
      })
        .then(() => {
          callback()
        })
        .catch(() => {})
    },
    getData() {
      const params = { pageNum: this.pagination.currentPage, pageSize: this.pagination.pageSize, ...this.searchData }
      console.log('-params-', params)
      getGoodsList(params).then(res => {
        // console.log('-res-', res)
        const data = res.data
        this.tableList = data.list
        this.pagination.total = data.count
        console.log('-table-list-', this.tableList)
      })
    },

    getCategoryData() {
      getTotalCategoryList().then(res => {
        // console.log('-category-res-', res)
        const data = res.data
        let firstClassify = []
        let secondClassify = []
        data.map(val => {
          if (val.parentId === 0) {
            firstClassify.push({ label: val.name, value: val.id, parentId: val.parentId, children: [] })
          } else {
            secondClassify.push({ label: val.name, value: val.id, parentId: val.parentId, children: [] })
          }
        })
        // console.log(firstClassify, secondClassify)
        for (let i = 0; i < firstClassify.length; i++) {
          // console.log(i, firstClassify[i])
          for (let j = 0; j < secondClassify.length; j++) {
            // console.log(j, secondClassify[j])
            if (secondClassify[j].parentId === firstClassify[i].value) {
              firstClassify[i].children.push(secondClassify[j])
            }
          }
        }
        // console.log(firstClassify)
        this.categoryList = this.setTreeData(firstClassify)
        console.log('-category-list-', this.categoryList)
      })
    },
    // 递归方法(当children为空数组时将其值设置为 undefined)
    setTreeData(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          data[i].children = undefined
        } else {
          this.setTreeData(data[i].children)
        }
      }
      return data
    }
  },
  components: { searchForm, pagination, addEdit }
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
